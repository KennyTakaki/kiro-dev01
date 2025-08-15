import { LambdaResponse } from '@stock-rec/types';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errorCode: string;

    constructor(
        message: string,
        statusCode: number = 500,
        errorCode: string = 'INTERNAL_ERROR',
        isOperational: boolean = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

export class RateLimitError extends AppError {
    constructor(message: string = 'Rate limit exceeded') {
        super(message, 429, 'RATE_LIMIT_EXCEEDED');
    }
}

export class ExternalApiError extends AppError {
    constructor(apiName: string, message: string) {
        super(`External API error (${apiName}): ${message}`, 502, 'EXTERNAL_API_ERROR');
    }
}

export const handleError = (error: unknown): LambdaResponse => {
    console.error('Error occurred:', error);

    if (error instanceof AppError) {
        return {
            statusCode: error.statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                success: false,
                error: error.message,
                errorCode: error.errorCode,
                timestamp: new Date().toISOString(),
            }),
        };
    }

    // Unknown error
    return {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            success: false,
            error: 'Internal server error',
            errorCode: 'INTERNAL_ERROR',
            timestamp: new Date().toISOString(),
        }),
    };
};

export const asyncHandler = (
    fn: (event: any, context: any) => Promise<LambdaResponse>
) => {
    return async (event: any, context: any): Promise<LambdaResponse> => {
        try {
            return await fn(event, context);
        } catch (error) {
            return handleError(error);
        }
    };
};