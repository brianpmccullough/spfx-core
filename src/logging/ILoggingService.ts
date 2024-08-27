export interface ILoggingService {
  get source(): string;
  verbose(message: string, properties?: Properties): void;
  info(message: string, properties?: Properties): void;
  warning(message: string, properties?: Properties): void;
  error(error: unknown, properties?: Properties): void;
}
