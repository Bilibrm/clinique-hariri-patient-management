/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'hariri.local',
                port: '',
                pathname: '/storage/uploads/patients/avatars/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'erp-api.cliniquehariri.com',
                port: '',
                pathname: '/storage/uploads/patients/avatars/**',
            }
        ],
    },
};

export default nextConfig;