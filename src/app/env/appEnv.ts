import 'dotenv/config';

export const appEnv = {
	port: process.env.PORT,
	dbUrl: process.env.DB_URL,
	paginationLimit: process.env.PAGINATION_LIMIT
};