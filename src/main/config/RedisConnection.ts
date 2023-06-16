import redis, { Redis }from 'ioredis';
import { appEnv } from '../../app/env/appEnv';

export class RedisConnection {
	private static _connection: Redis;

	static initConnection() {
		if (!this._connection) {
			this._connection = new redis(
				{
					port: appEnv.redisPort,
					host: appEnv.redisHost,
					username: appEnv.redisUsername,
					password: appEnv.redisPassword
				}
			);
		}
	}
  
	static getConnection() {
		if (!this._connection) {
			throw new Error('Redisnot connection!');
		}
  
		return this._connection;
	}
  
	static async closeConnection() {
		if (this._connection) {
			await this._connection.quit();
		}
	}
}