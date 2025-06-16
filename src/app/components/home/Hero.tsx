"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { dynalight } from "@/app/resources/font";
import { frangipani } from "@/app/resources/colors";
import S from "@/app/resources/strings/constantStrings";
import ContentBox from "../common/ContentBox";

const Hero = () => {
  const images = [
    "/hero-1.jpg",
    "/hero-2.jpeg",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="relative w-full h-[60vh] flex flex-col items-center">
        <div className="overflow-hidden border border-transparent rounded-[85px] relative w-full h-full bg-gray-100">
          <div className="w-full h-full relative">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image}
                  alt={`Myanmar community slide ${index + 1}`}
                  width={5000}
                  height={550}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute top-1/3 lg:top-1/2 w-5/6">
          <div className="text-center">
            <p
              className={`${dynalight.className} text-[32px] sm:text-[42px] md:text-[64px] lg:text-[80px] xl:text-[96px] leading-tight mb-2`}
              style={{ color: frangipani }}
            >
              {S.motto}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-5 mt-7">
        <ContentBox title={S.whoWeAre} content={S.whoWeAreDescription} />
      </div>
    </div>
  );
};

export default Hero;
