class AppError extends Error{
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
    }
}

class NotFoundError extends AppError{
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 400;
    }
}

class NotFoundWithData extends AppError{
    constructor(message, data, status){
        super(message);
        this.name = this.constructor.name;
        this.data = data || [];
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 403;
    }
}

module.exports = {
    NotFoundError,
    NotFoundWithData,
}