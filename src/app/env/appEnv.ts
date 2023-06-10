import 'dotenv/config';

export const appEnv = {
	port: process.env.PORT,
	dbUrl: process.env.DB_URL,
	paginationLimit: process.env.PAGINATION_LIMIT,
	jwtSecret: process.env.JWT_SECRET,
	redisPort: Number(process.env.REDIS_PORT),
	redisHost: process.env.REDIS_HOST,
	redisUsername: process.env.REDIS_USERNAME,
	redisPassword: process.env.REDIS_PASSWORD,
};