export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SECRET: string
      ENV: 'production' | 'development';
    }
  }

}