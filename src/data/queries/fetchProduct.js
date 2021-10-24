const fetchProduct = /* GraphQL */`
  query Product(
    $id: UUID
    $lang: String!
    $title: String
    $brandId: String
    $fullUrl: String
  ) {
    product(
      id: $id
      lang: $lang
      title: $title
      brandId: $brandId
      fullUrl: $fullUrl
    ) {
      id
      enabled
      brandId
      title
      model
      fullName
      fullUrl
      brandId
      url
      price {
        low: priceLow
        high: priceHigh
      }
      brand {
        nicename
        url
      }
      tags {
        id
        name
        url
      }
      weight
      size
      images {
        pos
        url
        size
      }
      description {
        description
      }
      data
      createdAt
    }
  }
`;

export default fetchProduct;