import localFont from "next/font/local";
import "../globals.css"; 
import NavBarBafo from "./Sidebar";
import SideBarBafo from "./Sidebar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff", 
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff", 
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function AdmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex">
        <SideBarBafo />
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
