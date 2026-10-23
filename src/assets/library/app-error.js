// Error that the controller raises on purpose and the route turns into an HTTP response.
export default class AppError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
