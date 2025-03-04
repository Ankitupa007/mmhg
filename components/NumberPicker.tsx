"use client";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type NumberPickerProps = {
    min: number;
    max: number;
    value: number;
    onChangeAction: (value: number) => void;
    label: string;
    unit?: string;
};

export default function NumberPicker({ min, max, value, onChangeAction, label, unit }: NumberPickerProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const itemHeight = 40;

    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    useEffect(() => {
        if (scrollRef.current) {
            const index = numbers.indexOf(value);
            scrollRef.current.scrollTo({
                top: index * itemHeight,
                behavior: "smooth", // Smooth scrolling when value changes
            });
        }
    }, [value, numbers]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollPosition = scrollRef.current.scrollTop;
            const selectedIndex = Math.round(scrollPosition / itemHeight);
            const newValue = numbers[selectedIndex];
            if (newValue !== value) {
                onChangeAction(newValue);
            }
        }
    };

    return (
        <div className="space-y-2">
            <label className="block uppercase font-medium text-center text-gray-500 text-xs">
                {label}{" "} BP
            </label>
            <div className="relative h-32 w-24 mx-auto">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide border rounded-md bg-gray-50 dark:bg-black scroll-smooth"
                    style={{ scrollSnapType: "y mandatory" }}
                >
                    <div
                        className="flex flex-col items-center justify-center"
                        style={{ height: `${numbers.length * itemHeight}px` }}
                    >
                        {numbers.map((num) => (
                            <div
                                key={num}
                                className={cn(
                                    "flex items-center justify-center h-10 text-lg transition-all duration-200 ease-in-out",
                                    num === value+1 ? "font-bold text-blue-600" : "text-gray-400 dark:text-gray-600"
                                )}
                                style={{ height: `${itemHeight}px` }}
                            >
                                {num-1}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-10 bg-blue-600/30 transform -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
    );
}