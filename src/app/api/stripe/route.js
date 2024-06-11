import Stripe from "stripe";
import Mailjet from 'node-mailjet';
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default async function POST(req, res) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEB_HOOK_SECRET
    );
  } catch (err) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    res.status(500).end()
  }

  switch (event.type) {
    case "checkout.session.completed":
      const eventData = event.data;
      const completedEvent = eventData.object

      try {
        const mailjet = new Mailjet({
          apiKey: process.env.REACT_APP_MJ_APIKEY_PUBLIC || 'your-api-key',
          apiSecret: process.env.REACT_APP_MJ_APIKEY_PRIVATE || 'your-api-secret',
          config: {
            host: 'api.mailjet.com',
            version: 'v3.1',
            output: 'text',
          }
        });

        let product = completedEvent.metadata.nickname;
        let buyerName = completedEvent.customer_details.name;
        let buyerEmail = completedEvent.customer_details.email;
        let specialRequest = completedEvent.custom_fields[0].text.value;
        let saleID = completedEvent.id;
        let eventID = event.id;
        
        const request = mailjet
              .post('send', { version: 'v3.1' })
              .request({
                Messages: [
                  {
                    From: {
                      Email: process.env.REACT_APP_SENDER_EMAIL,
                      Name: process.env.REACT_APP_SENDER_NAME
                    },
                    To: [
                      {
                        Email: process.env.REACT_APP_RECEIVING_EMAIL,
                        Name: process.env.REACT_APP_RECEIVING_NAME
                      }
                    ],
                    Subject: `New Comission of ${product} from ${buyerName}!`,
                    HTMLPart: `<h1>Commission sale of ${product} from <em>${buyerName}</em>!</h1><br/>
                    <b>Special request:</b> ${specialRequest} <br/><br/>

                    <b>Further details:</b> <br/>
                    Buyer Email: ${buyerEmail} <br/>
                    Event ID: ${eventID} <br/>
                    Sale ID: ${saleID} <br/>
                    `
                  }
                ]
              })
  
        request
              .then((result) => {
                console.log('Email sent successfully')
                res.status(200).end() 
              })
              .catch((err) => {
                console.log('Email sending failed1', err)
                res.status(500).end()
              })
      } catch (err) {
        console.log('Email sending failed', err)
        res.status(500).end()
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      res.status(201).end()
  }

  res.status(200).end()
};