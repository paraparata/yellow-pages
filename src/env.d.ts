/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GQL_SERVER_URL: string;
  readonly VITE_GET_CONTACT_LIMIT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
