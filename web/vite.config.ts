import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    createSvgSpritePlugin({
      symbolId: "icon-[name]-[hash]",
    }),
    tsconfigPaths(),
  ],
});
