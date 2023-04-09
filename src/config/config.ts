export interface EnvironmentVariables {
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  JWT_KEY: string;
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4200,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwtKey: process.env.JWT_KEY,
});
