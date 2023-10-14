/// <reference types="vite/client" />

import { defineConfig } from "vite";

export default defineConfig({
    optimizeDeps: {
        exclude: ['@mui/icons-material/','react-leaflet']
    }
});
