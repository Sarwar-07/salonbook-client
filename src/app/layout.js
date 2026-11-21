import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "SalonBook | Luxury Salon & Spa Appointment Booking",
  description: "Haute beauty & wellness reservation sanctuary. Reserve signature salon appointments with master artisans.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#181512] font-sans selection:bg-[#EEDCC8] selection:text-[#181512]">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              className: '!bg-[#181512] !text-[#FAF7F2] !border !border-stone-800 !rounded-2xl !text-xs !shadow-xl',
              duration: 3500,
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
