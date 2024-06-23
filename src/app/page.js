"use client"
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

import React, { useRef, useState, useEffect } from 'react';



export default function Home() {
  const videoRef = useRef();
  const [showVideo, setShowVideo] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: '0%', height: '0%' });
  const handlePlayVideo = () => {
    setShowVideo(true);
    setTimeout(() => setVideoSize({ width: '90%', height: '90%' }), 10);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setVideoSize({ width: '0%', height: '0%' });
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
      videoRef.current.addEventListener('ended', handleVideoEnd);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    }
  }, [showVideo]);
  return (
  <main className="overflow-auto min-h-screen justify-center">
    <div className={`fixed top-0 left-0 min-w-full min-h-full object-cover flex items-center justify-center ${showVideo ? 'z-10' : 'z-0 pointer-events-none'}`}>
      {showVideo && (
        <video 
          ref={videoRef}
          className="rounded transition-all duration-700 ease-in-out"
          style={{ width: videoSize.width, height: videoSize.height }}
          controls // Assuming you want controls, remove if not needed
        >
          <source src="car.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
    <div className="flex flex-col items-center justify-center h-[50vh] w-full mt-auto z-10">
      <button onClick={handlePlayVideo}>Play Video</button>
    </div>
      <div className="flex flex-col mx-auto min-h-screen mt-[30vh] w-[50vw]">
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
        <div className="flex flex-col items-center justify-center h-[50vh] w-full mt-auto">
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
