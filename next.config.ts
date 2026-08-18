// Fix preview tool environment: it injects --enable-source-maps and uses system
// Node v10 for child processes. Clear NODE_OPTIONS and prepend nvm Node v20 to
// PATH so Turbopack's PostCSS worker spawns with a compatible node binary.
process.env.NODE_OPTIONS = '';
process.env.PATH = `/Users/phucvi/.nvm/versions/node/v20.20.1/bin:${process.env.PATH}`;

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
};

export default withNextIntl(nextConfig);
