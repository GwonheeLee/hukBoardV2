import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Huk Board V2",
  description: "허리업코리아 HR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.className}>
      <body className="w-full bg-neutral-50 overflow-auto">
        <header className="sticky top-0 bg-white z-10 border-b">
          <div className="max-w-screen-xl mx-auto">
            <Navbar />
          </div>
        </header>
        <main className="w-full flex justify-center max-w-screen-xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
