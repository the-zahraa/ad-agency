import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProvider from '../components/ScrollProvider';
import { Analytics } from "@vercel/analytics/react";

// Define metadata with Open Graph and Twitter Card tags
export const metadata = {
  title: 'm44 - Performance Marketing',
  description: 'Scale your brand with M44’s paid media strategies.',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'm44 - Quality With Speed',
    description: 'Your trusted partner in performance marketing.',
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
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'm44 - Quality With Speed',
    description: 'Your trusted partner in performance marketing.',
    images: ['https://www.m44.io/og-image.jpg'],
    site: '@m44_io',
    creator: '@m44_io',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2GBKK2RGWC"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2GBKK2RGWC');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}