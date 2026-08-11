import type { Metadata } from 'next';
import './FrostyPage.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frosty — The AI That Converts Visitors Into Customers',
  description:
    'Frosty deploys intelligent chatbots on your website and WhatsApp — capturing leads, booking meetings, and closing deals 24/7.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ background: '#000', color: '#fff', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
