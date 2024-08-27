export interface ITelemetryService {
  trackPageView(url: string, previousUrl: string, properties?: Properties): Promise<void>;
}
