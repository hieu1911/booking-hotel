export class SystemError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;

        Object.setPrototypeOf(this, SystemError.prototype);
    }
}

export const createError = (status: number, message: string) => {
    const err = new SystemError(message, status);
    return err;
}