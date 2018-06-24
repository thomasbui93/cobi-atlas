import { injectable, inject } from 'inversify';
import { connection } from 'mongoose';
import Redis from '../database/redis';
import { RedisClient } from 'redis';

@injectable()
export default class HealthCheck {

    private redisClient: RedisClient;

    constructor() {
        this.redisClient = Redis.getInstance();
    }

    redisStatus() {
        return this.redisClient.ping();
    }

    mongoStatus() {
        return connection.readyState;
    }

    async databaseStatus() {
        try {
            const redisStatus = await this.redisStatus();
            return {
                redis: redisStatus,
                mongo: this.mongoStatus()
            };
        } catch (error) {
            return {
                error: 'Error while fetching system status. Please see logs.'
            };
        }
    }
}