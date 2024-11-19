/** @type {import('next').NextConfig} */
const nextConfig = {

    async redirects() {
        return [
            {
                source: "/",
                destination: "/obras",
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
