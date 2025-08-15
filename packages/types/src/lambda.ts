export interface LambdaEvent<T = unknown> {
    body: T;
    headers: Record<string, string>;
    requestContext: {
        requestId: string;
        stage: string;
        accountId: string;
        identity: {
            sourceIp: string;
            userAgent: string;
        };
    };
    pathParameters?: Record<string, string>;
    queryStringParameters?: Record<string, string>;
}

export interface LambdaResponse<T = unknown> {
    statusCode: number;
    headers?: Record<string, string>;
    body: string; // JSON stringified T
}

export interface LambdaContext {
    requestId: string;
    functionName: string;
    functionVersion: string;
    memoryLimitInMB: string;
    getRemainingTimeInMillis(): number;
}