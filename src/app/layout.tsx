import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
            </div>
    );
}
