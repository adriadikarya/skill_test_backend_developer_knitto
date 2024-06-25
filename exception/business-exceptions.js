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
        this.status = status || 404;
    }
}

class UniqueError extends AppError{
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 409;
    }
}

class ForbiddenError extends AppError{
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 403;
    }
}

class CodeError extends AppError{
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
    }
}

class customError extends AppError{
    constructor(message){
        super(message || `Error Not Exist!`, 411);
    }
}

module.exports = {
    customError,
    NotFoundError,
    ForbiddenError,
    UniqueError,
    CodeError
};
