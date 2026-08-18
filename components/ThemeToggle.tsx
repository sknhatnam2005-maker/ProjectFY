'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border border-[rgba(195,136,24,0.2)]" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-10 h-10 rounded-lg border border-[rgba(195,136,24,0.2)] bg-[rgba(195,136,24,0.05)] hover:bg-[rgba(195,136,24,0.1)] transition-all duration-300 flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-[#C38818] group-hover:rotate-180 transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 text-[#C38818] group-hover:-rotate-180 transition-transform duration-500" />
      )}
    </button>
  );
}
