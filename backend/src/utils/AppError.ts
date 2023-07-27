export class AppError extends Error {
    statusCode = 500
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}