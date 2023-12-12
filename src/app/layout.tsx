import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../app/globals.css';
import Script from 'next/script';
import AuthContext from './utils/authContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin="" />
            <body>
                <div>
                    <Navbar />
                    <main className="dark:bg-slate-900">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
