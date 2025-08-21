export function logErrorResponse(errorObj: unknown): void {
  console.dir(errorObj, { depth: null, colors: true });
}
