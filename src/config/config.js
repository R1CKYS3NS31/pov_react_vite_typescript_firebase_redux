export const config = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    apiHost: process.env.API_HOST || '0.0.0.0',
    apiPort: process.env.API_PORT || 9000,
    apiUrl: process.env.API_URL || 'http://0.0.0.0:9000',
}
