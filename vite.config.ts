import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";


const pwaManifest: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "Jeu de la vie",
    short_name: "Jeu de la vie",
    description: "Conway's Game of Life in react.",
    icons: [
      {
        "src": "/icon-1024x1024.png",
        "sizes": "1024x1024",
        "type": "image/png"
      }
    ],
    theme_color: "blue",
    background_color: "red",
    display: "standalone",
    scope: "/",
    start_url: "/",
    "orientation": "portrait"
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaManifest)],
  base:"/jeu-de-la-vie/"
})
