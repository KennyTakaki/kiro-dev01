import { LambdaEvent, LambdaResponse } from '@stock-rec/types';

export const createLambdaResponse = <T>(
    statusCode: number,
    data: T,
    headers?: Record<string, string>
): LambdaResponse<T> => ({
    statusCode,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        ...headers,
    },
    body: JSON.stringify(data),
});

export const parseEventBody = <T>(event: LambdaEvent): T => {
    try {
        return typeof event.body === 'string'
            ? JSON.parse(event.body)
            : event.body as T;
    } catch (error) {
        throw new Error('Invalid JSON in request body');
    }
};

export const extractPathParameter = (
    event: LambdaEvent,
    paramName: string
): string => {
    const param = event.pathParameters?.[paramName];
    if (!param) {
        throw new Error(`Missing required path parameter: ${paramName}`);
    }
    return param;
};

export const extractQueryParameter = (
    event: LambdaEvent,
    paramName: string,
    defaultValue?: string
): string | undefined => {
    return event.queryStringParameters?.[paramName] || defaultValue;
};