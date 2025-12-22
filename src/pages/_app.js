import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Outfit, Inter, JetBrains_Mono, Source_Sans_3 } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-source-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`
        ${sourceSans.variable}
        ${outfit.variable}
        ${inter.variable}
        ${jetbrains.variable}
      `}
    >
      <Nav />
      <main style={{ padding: "20px" }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
