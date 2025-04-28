"use client";
import Car from '@/components/Car';
import Carro from "@/../public/car.png";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { FaPlay } from 'react-icons/fa';
import TextInput from '@/components/ui/TextInput';
import Plate from '@/components/Plate';
import { fetchTodayGame, submitGuess } from '@/services/api';

type GameResult = {
    correct?: boolean;
    is_close?: boolean;
    message?: string;
}

const GamePage = () => {
    const [distancia, setDistancia] = useState<number | null>(null);
    const [tempo, setTempo] = useState<number | null>(null);
    const [position, setPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [guess, setGuess] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const [duration, setDuration] = useState(5);
    const plateLabel = distancia ? distancia.toString() : "200"; // valor da placa (m)
    const [attempts, setAttempts] = useState(0);
    const [gameResult, setGameResult] = useState<GameResult | null>(null);
    const [guessHistory, setGuessHistory] = useState<{
        guess: number;
        direction: '↑' | '↓';
        feedback: 'Very far' | 'ur close' | 'very close!!' | 'correct!!';
    }[]>([]);
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

    // Carrega os dados do jogo ao iniciar
    useEffect(() => {
        const loadGameData = async () => {
            try {
                const gameData = await fetchTodayGame();
                setDistancia(gameData.distancia);
                setTempo(gameData.tempo);

                // Calcula a duração da animação baseada no tempo do backend
                if (gameData.tempo) {
                    setDuration(gameData.tempo);
                }
            } catch (error) {
                console.error("Error loading game data:", error);
            }
        };
        loadGameData();
    }, []);

    const handleGuess = async () => {
        if (attempts >= 4) {
            setGameResult({ message: "No more attempts left!" });
            return;
        }

        try {
            const result = await submitGuess(guess);
            setAttempts(prev => prev + 1);

            // Determina a direção e feedback
            let direction: '↑' | '↓' = guess > result.actualSpeed ? '↓' : '↑';
            let feedback: typeof guessHistory[0]['feedback'];

            const difference = Math.abs(guess - result.actualSpeed);
            const percentageDiff = (difference / result.actualSpeed) * 100;

            if (result.correct) {
                feedback = 'correct!!';
            } else if (percentageDiff < 5) {
                feedback = 'very close!!';
            } else if (percentageDiff < 20) {
                feedback = 'ur close';
            } else {
                feedback = 'Very far';
            }

            // Adiciona ao histórico
            setGuessHistory(prev => [
                ...prev,
                { guess, direction, feedback }
            ]);

        } catch (error) {
            setGameResult({ message: "Error submitting guess" });
        }
    };
    const finalPosition = containerWidth * placaOffset;

    const animate = useCallback((timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsed = (timestamp - startTimeRef.current) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        setPosition(finalPosition * progress);

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            // Animação completa
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            startTimeRef.current = null;
        }
    }, [finalPosition, duration]);

    const startRunning = () => {
        if (attempts >= 3) {
            setGameResult({ message: "No more attempts left!" });
            return;
        }
        if (animationRef.current !== null) return;
        setPosition(0);
        startTimeRef.current = null;
        animationRef.current = requestAnimationFrame(animate);
    };

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
            <div className="flex flex-1 flex-col w-full h-full items-center">
                <TextInput onChange={(val) => { setGuess(val.currentTarget.valueAsNumber) }} type='number' label="Guess the speed:" placeholder="Enter your guess (Km/h)" className="w-1/2 sm:w-1/3 lg:w-1/4" />
                <div className="flex flex-row w-full gap-4 items-center justify-center p-4">
                    <Button label='Guess!!' onClick={handleGuess} />
                    <Button label='Run' icon={FaPlay} onClick={startRunning} />
                </div>
                <div className="mt-3 w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-2">Your attempts ({attempts}/4):</h3>
                    <div className="space-y-2">
                        {guessHistory.map((attempt, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-md border ${attempt.feedback === 'correct!!'
                                        ? 'bg-green-100 dark:bg-green-900 border-green-200'
                                        : 'bg-gray-100 dark:bg-gray-900 border-gray-200'
                                    }`}
                            >
                                <div className="flex justify-between">
                                    <span className="font-medium">{attempt.guess} km/h</span>
                                    <span className="text-xl">{attempt.direction}</span>
                                    <span className={`
                                ${attempt.feedback === 'correct!!' ? 'text-green-600 font-bold' : ''}
                                ${attempt.feedback === 'very close!!' ? 'text-blue-600' : ''}
                                ${attempt.feedback === 'ur close' ? 'text-yellow-600' : ''}
                                ${attempt.feedback === 'Very far' ? 'text-red-600' : ''}
                            `}>
                                        {attempt.feedback}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
