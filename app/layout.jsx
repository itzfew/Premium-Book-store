import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Eduhub-KMR Store',
  description: 'Premium educational books and resources at Eduhub-KMR Store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="font-inter bg-gray-50">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
