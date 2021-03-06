import { createClient, RedisClient } from 'redis';
import ConnectionException from '../error/ConnectionException';

export default class Redis {
    private static client: RedisClient;

    private constructor() {
    }

    public static getInstance(): RedisClient {
        if (typeof Redis.client === 'undefined') {
            Redis.client = this.getClient();
        }
        return Redis.client;
    }

    private static getClient(): RedisClient {
        try {
            const host = process.env.REDIS_HOST;
            const port = process.env.REDIS_PORT;
            const password = process.env.REDIS_PASSWORD;
            if (typeof host === 'undefined' || typeof port === 'undefined' || typeof password === 'undefined') {
                throw new ConnectionException('Please defined host and port for redis in .env file');
            }
            return createClient(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`, {
                password: password
            });
        } catch ( exception ) {
            throw new ConnectionException('Error while connecting redis', exception);
        }
    }
}