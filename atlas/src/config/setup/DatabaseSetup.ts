import Redis from "../../database/Redis";
import Mongo from "../../database/Mongo";
import mongoose from 'mongoose';

export default class DatabaseSetup {
    
    public init() {
        this.coreDatabaseInit();
        this.cacheDatabaseInit();
    }

    public coreDatabaseInit() {
        mongoose.Promise = global.Promise;
        const mongoClient = Mongo.getInstance();
        mongoClient
            .then(database => {
                return database;
            })
            .catch(err => {
                console.log(err)
            });
        return mongoClient;
    }

    public cacheDatabaseInit() {
        return Redis.getInstance()
    }
}