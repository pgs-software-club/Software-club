/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
}

export default [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
]