import './globals.css';

export const metadata = {
  title: 'Premium Book Store',
  description: 'Shop the best books online!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
