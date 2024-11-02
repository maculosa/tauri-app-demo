import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export function unplugin(viteEnv: ViteEnv) {
    const plugins: (PluginOption | PluginOption[])[] = [
        vue(),
        AutoImport({
            imports: [
                'vue',
            ],
            dts:'types/auto-imports.d.ts',
        }),
        Components({
            dts:'types/components.d.ts',
            types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView']}],
            resolvers: [
                NaiveUiResolver(),
            ]
        }),
    ]

    return plugins
}
