/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7231}
 */
export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }
  
  export enum ErrorTypes {
    INTERNAL_ERROR = 'An unexpected error occurred while processing the request. Please try again later or contact support for assistance.', 
    UNAUTHORIZED = 'unauthorized',
    FORBIDDEN = 'Access to the requested resource is forbidden. You do not have the necessary permissions to access this resource. Please contact your administrator to request additional permissions or assistance.',
    BAD_REQUEST = 'badRequest',
    INVALID_EVENT = 'invalidEvent'
  }
  
  /**
   * Base interface used to represent an error.
   * @interface ErrorBase
   */
  export interface ErrorBase {
    status: string;
    code: HttpStatusCode;
    message: string;
  }