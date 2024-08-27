import SharePointPage from './SharePointPage';

const HOSTNAME = 'tenant.sharepoint.com';

describe('SharePointPage', () => {
  test('should return the correct managed path', () => {
    const spPage = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx`);
    expect(spPage.managedPath).toBe('sites');

    const siteUrlOnly = new SharePointPage(`https://${HOSTNAME}/teams/someteam`);
    expect(siteUrlOnly.managedPath).toBe('teams');
  });

  test('should identify tenant root site correctly', () => {
    const noTrailingSlashPage = new SharePointPage(`https://${HOSTNAME}`);
    expect(noTrailingSlashPage.isTenantRootSite).toBe(true);

    const withTrailingSlashPage = new SharePointPage(`https://${HOSTNAME}/`);
    expect(withTrailingSlashPage.isTenantRootSite).toBe(true);

    const spPageNonRoot = new SharePointPage(`https://${HOSTNAME}/sites/YourSite`);
    expect(spPageNonRoot.isTenantRootSite).toBe(false);
  });

  test('should detect if the page is embedded', () => {
    const spPageEmbedded = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx?env=embedded`);
    expect(spPageEmbedded.isEmbedded).toBe(true);

    const spPageEmbeddedUpperCaseKey = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx?ENV=embedded`);
    expect(spPageEmbeddedUpperCaseKey.isEmbedded).toBe(true);

    const spPageEmbeddedUpperCaseKeyAndValue = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx?ENV=EMBEDDED`);
    expect(spPageEmbeddedUpperCaseKeyAndValue.isEmbedded).toBe(true);

    const spPageNonEmbedded = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx`);
    expect(spPageNonEmbedded.isEmbedded).toBe(false);
  });

  test('should return null if the query string does not exist', () => {
    const pageUrl = `https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx`;
    const spPage = new SharePointPage(pageUrl);
    expect(spPage.getQueryParam('nonexistent')).toBeNull();
  });

  test('should correctly identify layouts pages', () => {
    const spPageLayouts = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/_layouts/15/viewlsts.aspx`);
    expect(spPageLayouts.isLayoutsPage).toBe(true);

    const spPageLayoutsUpperCase = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/_LAYOUTS/15/viewlsts.aspx`);
    expect(spPageLayoutsUpperCase.isLayoutsPage).toBe(true);

    const spPageNonLayouts = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx`);
    expect(spPageNonLayouts.isLayoutsPage).toBe(false);
  });

  test('should correctly identify search results pages', () => {
    const spPageSearch = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/_layouts/15/search.aspx?k=testing`);
    expect(spPageSearch.isSearchResultsPage).toBe(true);

    const spPageSearchUpperCase = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/_layouts/15/SEARCH.aspx?k=testing`);
    expect(spPageSearchUpperCase.isSearchResultsPage).toBe(true);

    const spPageNonSearchResults = new SharePointPage(`https://${HOSTNAME}/sites/YourSite/SitePages/home.aspx`);
    expect(spPageNonSearchResults.isSearchResultsPage).toBe(false);
  });
});
