import { defineConfig } from 'vite';

// 自定义插件：把入口脚本从 ES module 改为经典脚本。
// 原因：Android WebView 用 file:// 加载 type="module" 会因 CORS（origin=null）被拦截，
// 改成经典 <script src> 才能在离线 asset 里正常跑。
function fileSchemeClassic() {
  return {
    name: 'file-scheme-classic',
    transformIndexHtml(html) {
      return html
        .replace(/<script type="module" crossorigin src="([^"]+)">/g, '<script src="$1">')
        .replace(/<script type="module" src="([^"]+)">/g, '<script src="$1">')
        .replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, '<link rel="stylesheet" href="$1">')
        .replace(/ type="module"/g, '')
        .replace(/ crossorigin/g, '');
    }
  };
}

export default defineConfig({
  // 相对路径，确保打包进 Android asset 后离线可加载（无 CDN 依赖）
  base: './',
  plugins: [fileSchemeClassic()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
    modulePreload: false,
    rollupOptions: {
      output: {
        // 单文件 IIFE，避免 WebView file:// 下的 ESM/CORS 限制
        format: 'iife',
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    host: true,
    port: 5173
  }
});
