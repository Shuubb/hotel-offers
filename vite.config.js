import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern",
            },
        },
    },
    server: {
        host: "0.0.0.0",
        port: "5173",
        proxy: {
            "/api": {
                target: "https://cloudinaryapi.shubitidzed9.workers.dev/",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
                configure: (proxy, _options) => {
                    proxy.on("error", (err, _req, _res) => {
                        console.log("proxy error", err);
                    });

                    proxy.on("proxyReq", (proxyReq, req, _res) => {
                        const targetUrl = proxyReq.getHeader("host");
                        const finalUrl = `${targetUrl}${req.url}`;
                        console.log("Final URL being requested:", finalUrl);
                    });

                    proxy.on("proxyRes", (proxyRes, req, _res) => {
                        console.log("Received Response from the Target:", proxyRes.statusCode, req.url);
                    });
                },
            },
        },
    },
});
