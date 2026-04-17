import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bookworm — Номын сан',
  description: 'Монгол номын сошиал платформ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className="h-full">
      <body className="h-full antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
