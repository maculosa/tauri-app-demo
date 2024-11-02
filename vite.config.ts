import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  // const env = parseEnv(viteEnv)
  return {
    // define: {
    //   'process.env': env, // 将 .env 环境变量挂载到 process.env 上
    // },
    plugins: [vue()],
    resolve: {
      // 设置路径缩写
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    // Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0
    // 修复提示 legacy JS API Deprecation Warning, 可以配置以下代码在 vite.config.ts 中
    css: {
      preprocessorOptions: {
        scss: { api: "modern-compiler" },
      },
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: "ws",
            host,
            port: 1421,
          }
        : undefined,
      watch: {
        // 3. tell vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
    },
    envPrefix: ["VITE_", "TAURI_ENV_*"],
    // build: {
    //   target:
    //     process.env.TAURI_ENV_PLATFORM == "windows" ? "chrome105" : "safari13",
    //   minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
    //   sourcemap: !!process.env.TAURI_ENV_DEBUG,
    // },
  };
});
