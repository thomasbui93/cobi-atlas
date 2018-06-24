import { connect, Mongoose } from 'mongoose';
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
        const connectionURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
        console.log(connectionURL);
        try {
            return connect(connectionURL, { server: { auto_reconnect: true } });
        } catch (exception) {
            console.log(exception);
            throw new ConnectionException('Error while connecting mongo', exception);
        }
    }

    public static initConnection() {
        try {
            const mongoClient = Mongo.getInstance();
            mongoClient
                .then(database => {
                    return database;
                })
                .catch(err => {
                    console.log(err);
                });
            return mongoClient;
        } catch (exception) {
            console.log(exception);
        }
    }
}