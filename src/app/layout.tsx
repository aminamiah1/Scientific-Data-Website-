import Script from "next/script";
import React from "react";
import "../app/globals.css";
import Footer from "./components/footer";
import WrappedNavbar from "./components/navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Script
                src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossOrigin=""
            />
            <body>
                <div>
                    <WrappedNavbar />
                    <main className="dark:bg-slate-900">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
