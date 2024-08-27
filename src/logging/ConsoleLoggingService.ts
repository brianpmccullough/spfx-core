import { ILoggingService } from './ILoggingService';

export default class ConsoleLoggingService implements ILoggingService {
  constructor(public readonly source: string) {}

  // https://developer.mozilla.org/en-US/docs/Web/API/console#o
  verbose(message: string, properties?: Properties): void {
    console.debug('%s: %s %O', this.source, message, properties || null);
  }

  info(message: string, properties: Properties): void {
    console.info('%s: %s %O', this.source, message, properties || null);
  }

  warning(message: string, properties?: Properties): void {
    console.warn('%s: %s %O', this.source, message, properties || null);
  }

  error(error: unknown, properties?: Properties): void {
    let message: string = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }
    if (typeof error === 'string') {
      message = error;
    }
    if (typeof error === 'object' && error !== null) {
      message = error.toString();
    }

    console.error('%s: %s %O', this.source, message, properties || null);
  }
}
