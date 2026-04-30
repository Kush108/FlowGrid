/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/fieldtrack-demo', destination: '/fieldtrack-demo/index.html' },
      { source: '/fieldtrack-demo/', destination: '/fieldtrack-demo/index.html' },
      { source: '/sphinx-proposal', destination: '/sphinx-proposal/index.html' },
      { source: '/sphinx-proposal/', destination: '/sphinx-proposal/index.html' },
    ];
  },
};

export default nextConfig;
