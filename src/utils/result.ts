export type Result<T, E = string> = 
  | { success: true; value: T } 
  | { success: false; error: E, errorType: string };

export const ok = <T>(value: T): Result<T, never> => ({ success: true, value });
export const fail = (error: string, errorType: string): Result<never, string> => ({ success: false, error, errorType });