import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SOLEON - Cross-Border Legal & Corporate Advisory',
    short_name: 'SOLEON',
    icons: [
      { src: '/favicon_io/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon_io/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#0D0D0D',
    background_color: '#0D0D0D',
    display: 'standalone',
  };
}
