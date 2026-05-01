export enum ErrorType {
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL',
  FORBIDDEN = 'FORBIDDEN',
}

export const errorToHttp: Record<ErrorType, number> = {
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.BAD_REQUEST]: 400,
  [ErrorType.CONFLICT]: 409,
  [ErrorType.INTERNAL_ERROR]: 500,
  [ErrorType.FORBIDDEN]: 403,
};

export const getErrorStatusCode = (errorType: string): number => {
  
  if(!Object.values(ErrorType).includes(errorType as ErrorType)) {
    return 500; 
  }

  return errorToHttp[errorType as ErrorType] || 500;
}