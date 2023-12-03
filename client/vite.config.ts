import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "build",
        assetsDir: "assets",
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    // server: {
    //     proxy: {
    //         "/api": {
    //             target: process.env.API_BASE_URL,
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace("/api", ""),
    //         },
    //     },
    // },
});
