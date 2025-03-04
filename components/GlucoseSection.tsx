"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlucoseChart from "@/components/GlucoseChart";
import { addGlucoseReading, fetchGlucoseReadings } from "@/lib/api";
import { GlucoseReading } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import NumberPicker from "@/components/NumberPicker";

export default function GlucoseSection() {
    const [glucose, setGlucose] = useState(100);
    const [frequency, setFrequency] = useState<number>(1);

    const { data: glucoseReadings, refetch, isLoading } = useQuery({
        queryKey: ["glucoseReadings"],
        queryFn: fetchGlucoseReadings,
        enabled: typeof window !== "undefined",
    });

    const mutation = useMutation({
        mutationFn: addGlucoseReading,
        onSuccess: () => {
            setGlucose(100);
            refetch();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ glucose });
    };

    return (
        <section className="w-full max-w-md mx-auto">
            <div className="p-4 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <NumberPicker
                        min={20}
                        max={600}
                        value={glucose}
                        onChangeAction={setGlucose} // Renamed prop
                        label="Glucose"
                        unit="mg/dL"
                    />
                    <Select
                        onValueChange={(val) => setFrequency(parseInt(val))}
                        defaultValue={frequency.toString()}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1x Daily</SelectItem>
                            <SelectItem value="2">2x Daily</SelectItem>
                            <SelectItem value="3">3x Daily</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit" disabled={mutation.isPending} className="w-full">
                        {mutation.isPending ? "Adding..." : "Add Reading"}
                    </Button>
                </form>
                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <GlucoseChart readings={glucoseReadings || []} />
                )}
            </div>
        </section>
    );
}