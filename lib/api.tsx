import {createClient} from "@/utils/supabase/client";
import { BPReading, GlucoseReading, Preferences } from "./types";
const supabase = createClient()
export const fetchBPReadings = async (): Promise<BPReading[]> => {
    const { data, error } = await supabase
        .from("bp_readings")
        .select("*")
        .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data as BPReading[];
};

export const addBPReading = async (
    reading: Omit<BPReading, "id" | "created_at" | "user_id">
): Promise<BPReading> => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error("User not authenticated");

    const userId = userData.user.id;

    // Check if user exists in public.users
    const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

    if (checkError && checkError.code !== "PGRST116") { // PGRST116 = no rows found
        throw new Error("Error checking user: " + checkError.message);
    }

    // If user doesn't exist, insert them
    if (!existingUser) {
        const { error: insertError } = await supabase
            .from("users")
            .insert({ id: userId, email: userData.user.email });
        if (insertError) throw new Error("Error inserting user: " + insertError.message);
    }

    const { data, error } = await supabase
        .from("bp_readings")
        .insert({ ...reading, user_id: userId })
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data as BPReading;
};

export const fetchGlucoseReadings = async (): Promise<GlucoseReading[]> => {
    const { data, error } = await supabase
        .from("glucose_readings")
        .select("*")
        .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data as GlucoseReading[];
};

export const addGlucoseReading = async (
    reading: Omit<GlucoseReading, "id" | "created_at" | "user_id">
): Promise<GlucoseReading> => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error("User not authenticated");

    const userId = userData.user.id;

    // Check if user exists in public.users
    const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

    if (checkError && checkError.code !== "PGRST116") {
        throw new Error("Error checking user: " + checkError.message);
    }

    // If user doesn't exist, insert them
    if (!existingUser) {
        const { error: insertError } = await supabase
            .from("users")
            .insert({ id: userId, email: userData.user.email });
        if (insertError) throw new Error("Error inserting user: " + insertError.message);
    }

    const { data, error } = await supabase
        .from("glucose_readings")
        .insert({ ...reading, user_id: userId })
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data as GlucoseReading;
};