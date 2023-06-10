/* eslint-disable @typescript-eslint/ban-types */
import { Redis } from 'ioredis';

export class CacheRedisRepository {
	constructor(private redisConn: Redis){}

	async set(key: string, value: Object | string) {
		const valueToStore = typeof value === 'object' 
			? JSON.stringify(value)
			: value;

		await this.redisConn.set(key, valueToStore);
	}

	async get(key: string) {
		const value = await this.redisConn.get(key);
		if(value !== null && ['{', '['].includes(value[0])){
			return JSON.parse(value);
		}

		return value;
	}

	async invalidate(key: string) {
		this.redisConn.del(key);
	}
}