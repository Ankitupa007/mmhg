"use client";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from "recharts";
import { GlucoseReading } from "@/lib/types";

type GlucoseChartProps = {
    readings: GlucoseReading[];
};

export default function GlucoseChart({ readings }: GlucoseChartProps) {
    const data = readings.map((r) => ({
        time: new Date(r.created_at).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }),
        glucose: r.glucose,
    }));

    // Calculate average for trend analysis
    const avgGlucose =
        readings.length > 0
            ? readings.reduce((sum, r) => sum + r.glucose, 0) / readings.length
            : 0;

    return (
        <div className="w-full">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 20, bottom: 60, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        interval="preserveStartEnd"
                    />
                    <YAxis domain={[0, 300]} />
                    <Tooltip
                        formatter={(value) => [`${value} mg/dL`, "Glucose"]}
                        labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Legend verticalAlign="top" />
                    <Line
                        type="monotone"
                        dataKey="glucose"
                        stroke="#ff7300"
                        name="Glucose"
                        dot={{ r: 4 }}
                    />
                    {/* Thresholds for high/low glucose */}
                    <ReferenceLine y={70} stroke="red" strokeDasharray="3 3" label="Low" />
                    <ReferenceLine y={140} stroke="orange" strokeDasharray="3 3" label="High" />
                    {/*/!* Average line *!/*/}
                    {/*<ReferenceLine*/}
                    {/*    y={avgGlucose}*/}
                    {/*    stroke="#ff7300"*/}
                    {/*    strokeDasharray="5 5"*/}
                    {/*    label={`Avg: ${avgGlucose.toFixed(1)}`}*/}
                    {/*/>*/}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}