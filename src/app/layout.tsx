import './globals.css';
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header /> {/* Add the Header here */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}