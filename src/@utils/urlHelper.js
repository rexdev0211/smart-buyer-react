// TODO: we can use this array also to automatically populate data for SearchContext.getUrl method
/**
 * URL parts defined in documentation
 * https://smartbuyer.atlassian.net/wiki/spaces/SMAR/pages/1414660101/URLs
 */
export const urlParts = [
  'brand/:brand',
  'tag/:tags',
  'price/:priceLow-:priceHigh',
  'page/:page',
  'pageSize/:pageSize',
  'search/:searchTerm',
]