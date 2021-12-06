type EnvVars = {
    isDev: boolean;
    environment: 'test' | 'dev' | 'prod';
    appName: string;
    token: string;

    api_secret?: string;
};
type EnvironmentVariable = keyof EnvVars;

export const ENV =
                 {
                     isDev:       process.env.REACT_APP_ENVIRONMENT === 'dev',
                     environment: process.env.REACT_APP_ENVIRONMENT,
                     appName:     'hello-product',
                     api_secret:  process.env.REACT_APP_API_SECRET ?? '',
                     token:       process.env.REACT_APP_TOKEN ?? '',
                 } as EnvVars;

export function useEnvironmentVariable(which: EnvironmentVariable) {
    return ENV[which];
}
