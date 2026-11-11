/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Optimised images are re-checked after 30 days instead of the default 4 hours.
        // Replaced photos still update right away because their URLs carry a version (?v=...).
        minimumCacheTTL: 60 * 60 * 24 * 30,
        // Allow local images to carry a ?v=<version> query string (required since Next 16).
        localPatterns: [{ pathname: '/**' }],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },
        ],
    },
    allowedDevOrigins: ['192.168.1.7'],
};

export default nextConfig;
