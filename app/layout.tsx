import {ThemeProvider} from "next-themes";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import AuthButton from "@/components/header-auth";
import {Providers} from "@/app/providers";
import {ThemeSwitcher} from "@/components/theme-switcher";
import {Toaster} from "@/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Practice & Suck Less",
  description: "A consistent way to practice any skill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>BP & Glucose Charting</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="">
            <header className="flex justify-between items-center w-full px-4 py-6">
              <div className="flex gap-4 items-center">
                <Image src="/logo.svg" alt="logo" width={40} height={40} />
                {/*<Link href={"/"} className="text-xs uppercase">Practice &&nbsp;<br />Suck Less</Link>*/}
              </div>
              <div className="">
                <AuthButton />
              </div>
            </header>
            <div className="w-full">
              <Providers>{children}</Providers>

            </div>
            <footer className="w-full flex items-center justify-center  mx-auto text-center text-xs gap-8 py-16">
            </footer>
            <Toaster/>
          </main>
        </ThemeProvider>
      </body>
    </html >
  );
}
