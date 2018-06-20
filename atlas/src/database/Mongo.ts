//@TODO: Refactoring with Factory Pattern 
import { connect, Mongoose } from 'mongoose'
import ConnectionException from '../error/ConnectionException';

export default class Mongo {
    private static client: Promise<Mongoose>;

    private constructor() {
    }

    public static getInstance(): Promise<Mongoose> {
        if (typeof Mongo.client === 'undefined') {
            Mongo.client = this.getClient();
        }
        return Mongo.client;
    }

    private static getClient(): Promise<Mongoose> {
        try {
            const host = process.env.REDIS_HOST;
            const port = process.env.REDIS_PORT;
            if(typeof host === 'undefined' || typeof port === 'undefined') {
                throw new ConnectionException('Please defined host and port for redis in .env file')
            }
            return connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`) 
        } catch ( exception ) {
            throw new ConnectionException('Error while connecting mongo', exception);
        }
    }
}