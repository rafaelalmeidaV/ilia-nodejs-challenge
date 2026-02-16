interface ImportMetaEnv {
  readonly VITE_WALLET_API_URL: string;
  readonly VITE_USERS_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}