import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Suspense } from 'react';

export const metadata = {
  title: 'Ad Agency Website',
  description: 'A professional ad agency website built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}