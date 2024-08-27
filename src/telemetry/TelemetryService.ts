import { ITelemetryService } from './ITelemetryService';

export default class TelemetryService implements ITelemetryService {
  constructor() {}

  trackPageView(url: string, previousUrl: string, properties?: Properties): Promise<void> {
    console.log(url);
    console.log(previousUrl);
    console.log(properties);
    return Promise.resolve();
  }
}
