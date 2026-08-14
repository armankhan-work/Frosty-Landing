import type { Metadata } from 'next';
import './FrostyPage.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frosty — AI Conversion Engine for Web & WhatsApp',
  description:
    'Frosty deploys AI agents across your website and WhatsApp that remember context, qualify leads, schedule meetings, and answer queries 24/7 with answers grounded strictly in your own content.',
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
      <body className="antialiased bg-[#FCFBF9] text-[#18181B]" style={{ background: '#FCFBF9', color: '#18181B', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
