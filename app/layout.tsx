import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parent Agent',
  description: 'A parent-first learning & safety companion'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Parent Agent</h1>
            <nav className="text-sm space-x-4">
              <a href="/">Home</a>
              <a href="/wiki">Wiki</a>
              <a href="/reading/minecraft">Reading</a>
              <a href="/math/minecraft">Math</a>
              <a href="/agent">Agent</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-white/10 mt-16">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-white/60">
            Built with Next.js • Tailwind • MDX • Vitest
          </div>
        </footer>
      </body>
    </html>
  );
}
