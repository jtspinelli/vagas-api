import Redis from 'ioredis';
import { appEnv } from '../../app/env/appEnv';

const redisConn = new Redis({		
	port: appEnv.redisPort,
	host: appEnv.redisHost,
	username: appEnv.redisUsername,
	password: appEnv.redisPassword
});	

export default redisConn;