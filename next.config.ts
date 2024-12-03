import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/(.*)', /** berlaju untuk semua halaman diweb ini */
        headers: [
          {
            /* *xss injection atau mencegah menyisipkan kode lewat celah input */
            key: 'Content-Security-Policy',
            value: `script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; frame-ancestors 'none';`
          },

          // untuk mencegah click jacking biasanya melalui iframe
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ]
  },
  images: {
    domains: ['fakestoreapi.com', 'cdn.pixabay.com']
  }
};

export default nextConfig;
