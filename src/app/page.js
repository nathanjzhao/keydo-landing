import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AccordionHeader } from "@radix-ui/react-accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



export default function Home() {
  return (
    <main className="overflow-auto min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen mt-[30vh] w-[30vw]">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="p-4 rounded text-center">
                <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                <p className="text-gray-700">"This is the best product I've ever used! Highly recommended."</p>
              </div>
            </CarouselItem>
            <CarouselItem>
                <div className="p-4 rounded text-center">
                  <h2 className="text-2xl font-bold mb-2">Jane Smith</h2>
                  <p className="text-gray-700">"Amazing service and great quality. Will definitely buy again."</p>
                </div>
            </CarouselItem>
          <CarouselItem>
            <div className="p-4 rounded text-center">
              <h2 className="text-2xl font-bold mb-2">Bob Johnson</h2>
              <p className="text-gray-700">"Fast delivery and excellent customer service. 5 stars!"</p>
            </div>
          </CarouselItem>
        </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
        <div className="flex flex-col items-center justify-center h-[50vh] w-[70vw] mt-auto">
          <div className="text-left mb-4">
            <strong>FAQ</strong>
          </div>
          <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>FAQ question #1 blah blah blah blah blah blah?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        </div>
      </div>
    </main>
  );
}
