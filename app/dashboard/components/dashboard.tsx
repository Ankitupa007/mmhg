"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Dynamically import client components with SSR disabled
const BPSection = dynamic(() => import("@/components/BPSection"), { ssr: false });
const GlucoseSection = dynamic(() => import("@/components/GlucoseSection"), { ssr: false });

export default function Home() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className={"px-4 py-4"}>
            <h1 className="text-xl uppercase py-4 bg-white dark:bg-black rounded-2xl container">Health Tracker</h1>
            </div>
            <div className="w-full max-w-7xl mx-auto space-y-8">
                <section className={"bg-white dark:bg-black p-4 mx-4 rounded-2xl"}>
                        <h2 className={"pb-8 px-4 uppercase"}>Blood Pressure (mmHg)</h2>
                    <div>
                        <BPSection />
                    </div>
                </section>
                <section className={"bg-white dark:bg-black p-4 mx-4 rounded-2xl"}>
                        <h2 className={""}>Glucose (mg/dL)</h2>
                    <div>
                        <GlucoseSection />
                    </div>
                </section>
            </div>
        </div>
    );
}