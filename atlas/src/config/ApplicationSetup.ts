import DatabaseSetup from "./setup/DatabaseSetup";
import ConnectionException from "../error/ConnectionException";

export default class ApplicationSetup {
    
    public databaseSetup() {
        try {
            new DatabaseSetup().init();
        } catch (err) {
            throw new ConnectionException('Error while running database setup', err);
        }
    }
}