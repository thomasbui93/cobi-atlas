export default class GenericException {
    public errorCode: String;
    public message: String;
    public errorStack: Error;

    constructor(errorCode: String, message: String, errorStack?: Error) {
        this.errorCode = errorCode;
        this.message = message;
        this.errorStack = errorStack;
    }
}