import 'dotenv/config'

export const envs = {
    APP_PORT: process.env.APP_PORT || 3000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    DB_USERNAME: process.env.DB_USERNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
}