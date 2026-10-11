import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/utils/header";
import Footer from "@/components/utils/footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast"
import { CartProvider } from "@/context/CartContext";
import { RetailCartProvider } from "@/context/RetailCartContext";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
// export const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// })

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zinicxa",
  description: "Zinicxa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <RetailCartProvider >
                <Toaster />
                <main className="flex-1">
                  {children}
                </main>
            </RetailCartProvider>
          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
