import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import catImg from "../../assets/cat.svg";
import dogImg from "../../assets/dog.svg";
import horseImg from "../../assets/horse.svg";
import cowImg from "../../assets/cow.svg";
import pigImg from "../../assets/pig.svg";
import sheepImg from "../../assets/sheep.svg";

interface LoadingPetProps {
    message: string;
}

export default function LoadingPet({ message }: LoadingPetProps) {

    const images = [catImg, dogImg, cowImg, horseImg, pigImg, sheepImg];
    const [index, setIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % images.length);
    }, 700);

    return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-4">
            
            <div className="relative flex items-center justify-center">

                <div className="absolute w-20 h-20 bg-[#4ADE80] rounded-full opacity-20 animate-ping" />

                <div className="relative bg-green-50 p-6 rounded-full shadow-sm border border-green-100">

                    <Image 
                        src={images[index]}
                        alt="pet"
                        className="w-20 h-20 animate-pulse" 
                    />
                </div>

            </div>

            <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg font-bold">
                    Carregando informações
                </h3>
                <p className="text-sm text-gray-400">
                    {message}
                </p>
            </div>

        </div>
    );
}

