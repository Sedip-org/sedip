import "./global.css";
import Navbar from "./compoents/navbar/navbar";
import { Manrope } from "next/font/google";
import LayoutClient from "../app/LayoutClient";
import Footer from "./compoents/footer/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`container ${manrope.className}`}>
        <LayoutClient>
          <Navbar />
          <div className="wrapper">{children}</div>
          <Footer />
        </LayoutClient>
      </body>
    </html>
  );
}
