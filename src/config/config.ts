export interface EnvironmentVariables {
  PORT: number;
  MONGO_URI: string;
  JWT_KEY: string;
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4200,
  database: {
    host: process.env.MONGO_URI,
  },
  jwtKey: process.env.JWT_KEY,
});
