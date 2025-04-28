"use client";
import Car from '@/components/Car';
import Carro from "@/../public/car.png";
import React, { useState, useRef, useCallback, useEffect, InputHTMLAttributes } from 'react';
import Button from '@/components/ui/Button';
import { FaPlay } from 'react-icons/fa';
import TextInput from '@/components/ui/TextInput';
import Plate from '@/components/Plate';

const GamePage = () => {
    const [position, setPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [guess, setGuess] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
  
    const duration = 5; // segundos para o carro chegar até a placa
    const plateLabel = '200'; // valor da placa (m)

    const placaOffset = 0.8; // porcentagem da largura onde a placa fica (80%)
    
    // Atualiza a largura do container
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
            }
        };
    
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);
  
    const finalPosition = containerWidth * placaOffset;
  
    const animate = useCallback((timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
  
      const elapsed = (timestamp - startTimeRef.current) / 1000;
  
      if (elapsed >= duration) {
        setPosition(finalPosition);
        cancelAnimationFrame(animationRef.current!);
        animationRef.current = null;
        startTimeRef.current = null;
        setPosition(0); // Reset position after animation
        return;
      }
  
      const progress = elapsed / duration;
      const currentPosition = finalPosition * progress;
      setPosition(currentPosition);
  
      animationRef.current = requestAnimationFrame(animate);
    }, [finalPosition, duration]);
  
    const startRunning = () => {
      if (animationRef.current !== null) return;
      setPosition(0);
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleGuess = ()=>{
        
    }
  
    return (
        <div className='flex flex-1 flex-col items-center'>
            <div className="flex flex-col h-40 sm:h-52 lg:h-80 p-8 min-w-sm sm:min-w-xl lg:min-w-4xl">
                <div className="flex-1 bg-green-800"></div>
                <div className="flex-2 bg-gray-600 flex justify-center items-center relative overflow-hidden">
                    <Car position={position} imageUrl={Carro} />
                </div>
                <div 
                    className="flex-1 bg-green-800 relative w-full"
                    ref={containerRef}
                >
                    <Plate label={plateLabel} distance={finalPosition} />
                </div>
            </div>
            <div className="flex flex-1 flex-col w-full h-full items-center justify-center">
                <TextInput onChange={(val)=>{setGuess(val.currentTarget.valueAsNumber)}} type='number' label="Guess the speed:" placeholder="Enter your guess (Km/h)" className="w-1/2 sm:w-1/3 lg:w-1/4" />
                <div className="flex flex-1 flex-row w-full gap-4 items-center justify-center p-4">
                    <Button label='Guess!!' onClick={handleGuess}/>
                    <Button label='Run' icon={FaPlay} onClick={startRunning} />
                </div>
            </div>
        </div>
    );
};

export default GamePage;
