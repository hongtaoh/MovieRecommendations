import { FavoriteProvider } from '@/context/FavoriteContext';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Movie App',
  description: 'A simple movie browsing application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <FavoriteProvider>
          <header className="bg-white shadow-sm">
            <nav className="container mx-auto p-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Movie App
              </Link>
              <Link href="/recommend">AI Recommendations</Link>
              <Link 
                href="/favorites" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Favorites
              </Link>
            </nav>
          </header>
          <main className="container mx-auto p-4 min-h-screen">
            {children}
          </main>
        </FavoriteProvider>
      </body>
    </html>
  );
}