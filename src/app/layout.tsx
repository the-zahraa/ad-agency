import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProvider from '../components/ScrollProvider';

export const metadata = {
  title: 'Ad Agency Website',
  description: 'A professional ad agency website built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}