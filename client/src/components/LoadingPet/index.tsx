import React from 'react';
import { PawPrint } from 'lucide-react';

interface LoadingPetProps {
    message: string;
}

export default function LoadingPet({ message }: LoadingPetProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-4">
        <div className="relative flex items-center justify-center">

            <div className="absolute w-20 h-20 bg-[#4ADE80] rounded-full opacity-20 animate-ping" />
            
            <div className="relative bg-green-50 p-6 rounded-full shadow-sm border border-green-100">
                
                <PawPrint 
                size={40} 
                className="text-[#4ADE80] animate-pulse" 
                fill="currentColor" 
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