export class AppError extends Error {
  constructor(
    public statusCode: number,
    public override message: string,
    public code: string,
    public isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
