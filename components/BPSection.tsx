"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BPChart from "@/components/BPChart";
import { addBPReading, fetchBPReadings } from "@/lib/api";
import NumberPicker from "@/components/NumberPicker";

export default function BPSection() {
    const [systolic, setSystolic] = useState(120);
    const [diastolic, setDiastolic] = useState(80);
    const [device, setDevice] = useState<"manual" | "digital" | "smart">("manual");
    const [frequency, setFrequency] = useState<number>(1);

    const { data: bpReadings, refetch, isLoading } = useQuery({
        queryKey: ["bpReadings"],
        queryFn: fetchBPReadings,
        enabled: typeof window !== "undefined",
    });

    const mutation = useMutation({
        mutationFn: addBPReading,
        onSuccess: () => {
            setSystolic(120);
            setDiastolic(80);
            refetch();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            systolic,
            diastolic,
            device_type: device,
        });
    };

    const handleDeviceChange = (value: string) => {
        if (["manual", "digital", "smart"].includes(value)) {
            setDevice(value as "manual" | "digital" | "smart");
        }
    };

    return (
        <section className="w-full mx-auto">
            <div className="p-4 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className={"flex justify-center items-center w-full space-x-4"}>
                    <NumberPicker
                        min={50}
                        max={300}
                        value={systolic}
                        onChangeAction={setSystolic} // Renamed prop
                        label="Systolic"
                        unit="mmHg"
                    />
                        <span className={"text-blue-600 mt-6"}>/</span>
                    <NumberPicker
                        min={30}
                        max={200}
                        value={diastolic}
                        onChangeAction={setDiastolic} // Renamed prop
                        label="Diastolic"
                        unit="mmHg"
                    />
                    </div>
                    <div className={"flex items-center justify-center space-x-4"}>
                    <Select onValueChange={handleDeviceChange} defaultValue={device}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Device Type" />
                        </SelectTrigger>
                        <SelectContent defaultValue="digital">
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="digital">Digital</SelectItem>
                            <SelectItem value="smart">Smart</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(val) => setFrequency(parseInt(val))}
                        defaultValue={frequency.toString()}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent defaultValue={"1"}>
                            <SelectItem value="1">1x Daily</SelectItem>
                            <SelectItem value="2">2x Daily</SelectItem>
                            <SelectItem value="3">3x Daily</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <Button type="submit" disabled={mutation.isPending} className="w-full">
                        {mutation.isPending ? "Adding..." : "Add Reading"}
                    </Button>
                </form>
                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <BPChart readings={bpReadings || []} />
                )}
            </div>
        </section>
    );
}