import GenericException from './GenericException';

export default class ConnectionException extends GenericException {
    constructor(message: String, errorStack?: Error) {
        super('K101', message, errorStack);
    }
}