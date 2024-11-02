interface ViteEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_DESC: string;
    readonly VITE_HASH_ROUTE: boolean;
    readonly VITE_AUTH_ROUTE_MODE?: 'static' | 'dynamic';
}

interface ImportMeta {
    readonly env: ViteEnv;
}
