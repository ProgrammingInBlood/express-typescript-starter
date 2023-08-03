export class HttpException extends Error {
  public status: number;
  public message: string;
  public errors: any;

  constructor(status: number, message?: string, errors?: any) {
    // Call super with the message argument
    super(message);

    // Assign the errors property directly, no need to call super(errors)
    this.errors = errors;

    // Initialize the other properties
    this.status = status;
    this.message = message;
  }
}
