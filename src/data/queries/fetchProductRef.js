const fetchProductRef = /* GraphQL */`
  query RefProducts(
    $sbProductId: UUID
    $partnerId: UUID
    $page: Int
    $pageSize: Int
  ) {
    products(
      sbProductId: $sbProductId
      partnerId: $partnerId
      page: $page
      pageSize: $pageSize
    ) {
      id
      partner {
        name
      }
      title {
        en
      }
      image {
        thumb
        bigImage
      }
      currentPrice {
        priceLow
        priceHigh
      }
      prices {
        priceLow
        priceHigh
      }
      url {
        en
      }
      data
    }
  }
`;

export default fetchProductRef;