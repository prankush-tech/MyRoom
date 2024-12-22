/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(glsl|vs|fs)$/,
            loader: 'raw-loader',
            include: [
                path.resolve(process.cwd(), 'src/shaders'), // Add your shaders folder
            ],
        });
        config.module.rules.push({
            test: /\.(glsl|vs|fs)$/,
            loader: 'glslify-loader',
            include: [
                path.resolve(process.cwd(), 'src/shaders'), // Add your shaders folder
            ],
        });
        return config;
    },
};

export default nextConfig;
