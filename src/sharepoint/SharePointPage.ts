export default class SharePointPage {
  private url: URL;

  constructor(url: string | URL) {
    this.url = new URL(url);
  }

  get isLayoutsPage(): boolean {
    return this.url.pathname.toLowerCase().includes('/_layouts/');
  }

  get isSearchResultsPage(): boolean {
    return this.isLayoutsPage && this.url.pathname.toLowerCase().includes('/search.aspx');
  }

  // Get the managed path (e.g., "/sites" or "/teams")
  get managedPath(): string {
    const pathParts = this.url.pathname.split('/');
    return pathParts.length > 1 ? `${pathParts[1]}` : '';
  }

  // Check if the current site is the tenant root site (e.g., https://tenant.sharepoint.com/)
  get isTenantRootSite(): boolean {
    const pathParts = this.url.pathname.split('/');
    // Tenant root site typically has no managed path (or is "/")
    return pathParts.length <= 2 && !pathParts[1];
  }

  // Check if the page is embedded by checking for a specific query string parameter, e.g., "env=embedded"
  get isEmbedded(): boolean {
    return (this.getQueryParam('env') || '').toLowerCase() === 'embedded';
  }

  get isWebView(): boolean {
    return (this.getQueryParam('env') || '').toLowerCase() === 'webview';
  }

  // Retrieve query string parameter values by key (case insensitive)
  getQueryParam(key: string): string | null {
    key = key.toLowerCase();
    for (const [paramKey, paramValue] of this.url.searchParams.entries()) {
      if (paramKey.toLowerCase() === key) {
        return paramValue;
      }
    }
    return null;
  }
}
