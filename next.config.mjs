/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
