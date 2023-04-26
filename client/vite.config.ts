import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [
            react(), viteTsconfigPaths(),
            VitePWA({
                registerType: 'autoUpdate',
                workbox: {
                    runtimeCaching: [
                        // https://developer.chrome.com/docs/workbox/modules/workbox-strategies/#stale-while-revalidate
                        {
                            urlPattern: `${process.env.VITE_API_BASE}/data`,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'api-data-cache',
                                expiration: {
                                    maxEntries: 1,
                                    maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days
                                },
                            }
                        },
                    ],
                },
                includeAssets: [
                    '**/*.png', '**/*.ico', '**/*.svg', '**/*.gif', '**/*.jpg', '**/*.jpeg',
                ],
                devOptions: {
                    enabled: true,
                },
            }),
        ],
        build: {
            outDir: 'build',
        },
    });
}
