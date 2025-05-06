import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProvider from '../components/ScrollProvider';

// Define metadata with Open Graph and Twitter Card tags
export const metadata = {
  title: 'm44 - Performance Marketing',
  description: 'Scale your brand with M44’s paid media strategies.',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'M44 - Performance Marketing Experts',
    description: 'Scale your brand with M44’s paid media strategies.',
    url: 'https://www.m44.io',
    siteName: 'M44',
    images: [
      {
        url: 'https://www.m44.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'M44 Cover Image',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M44 - Performance Marketing Experts',
    description: 'Scale your brand with M44’s paid media strategies.',
    images: ['https://www.m44.io/og-image.jpg'],
  },
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