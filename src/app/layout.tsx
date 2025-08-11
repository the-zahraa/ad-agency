import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProvider from '../components/ScrollProvider';
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script';


// Define metadata with Open Graph, Twitter Card tags, and structured data
export const metadata = {
  title: 'm44 - Same ad budget, better results.',
  description: 'Ads performing so well, you’ll have to mute your phone to rest.',
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
  other: {
    'application/ld+json': {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'm44',
      'url': 'https://www.m44.io',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://www.m44.io/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      'description': 'Ads performing so well, you’ll have to mute your phone to rest.',
      'hasPart': [
        {
          '@type': 'WebPage',
          'name': 'About',
          'url': 'https://www.m44.io/#why-m44',
          'description': 'Learn more about m44 and our mission.',
        },
        {
          '@type': 'WebPage',
          'name': 'Services',
          'url': 'https://www.m44.io/#services',
          'description': 'Explore our range of services.',
        },
        {
          '@type': 'WebPage',
          'name': 'Contact Us',
          'url': 'https://www.m44.io/#book-call',
          'description': 'Get in touch with our team.',
        },
      ],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-2GBKK2RGWC`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2GBKK2RGWC');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1538557934185142');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1538557934185142&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
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