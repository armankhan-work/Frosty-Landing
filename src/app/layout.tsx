import type { Metadata } from 'next';
import './FrostyPage.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frosty Agent — AI Conversion Engine for Web & WhatsApp',
  description:
    'Frosty Agent deploys AI agents across your website and WhatsApp that remember context, qualify leads, schedule meetings, and answer queries 24/7 with answers grounded strictly in your own content.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#FFFFFF] text-[#18181B]" style={{ fontFamily: "'Outfit', sans-serif", background: '#FFFFFF', color: '#18181B', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
