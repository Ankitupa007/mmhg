import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {JSX} from "react";
import Dashboard from "@/app/dashboard/components/dashboard";

export default async function Page(): Promise<JSX.Element>{
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
      <main className={""}>
        <Dashboard/>
      </main>
  );
}
