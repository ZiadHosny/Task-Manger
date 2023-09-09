export class AppError extends Error {
    statusCode = 500;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
