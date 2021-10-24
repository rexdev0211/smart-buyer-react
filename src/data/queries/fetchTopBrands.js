const fetchTopBrands = /* GraphQL */`
  query TopBrands(
    $lang: String!
    $page: Int
    $pageSize: Int
  ) {
    topBrands(lang: $lang, page: $page, pageSize: $pageSize) {
      id
      nicename
      logoUrl
      qty
      url
    }
  }
`;

export default fetchTopBrands;