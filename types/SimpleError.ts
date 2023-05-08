export class SimpleError extends Error {
  public displayMessage: string;

  constructor(displayMessage: string, error?: Error) {
    super();

    if (error) {
      this.message = error.message;
      this.name = error.name;
      this.stack = error.stack;
      this.cause = error.cause;
    }

    this.displayMessage = displayMessage;
  }
}
