const fetchSearchResults = /* GraphQL */`
  query SearchResults(
    $lang: String!
    $filterText: String
  ) {
    products: listProducts(
      lang: $lang
      filterText: $filterText
    ) {
      id
      title
      fullName
      fullUrl
      brandId
      url
      tagNames
      images {
        url
        size
      }
    }
  }
`;

export default fetchSearchResults;