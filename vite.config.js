import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern",
                additionalData: `@use "sass:color"; @use "sass:math";`,
            },
        },
    },
    server: {
        host: "0.0.0.0",
        port: "5178",
        proxy: {
            "/api": {
                target: "https://hoteloffers.ge",
                changeOrigin: true,
            },
        },
    },
});
