const fetchProducts = /* GraphQL */`
  query ListProducts(
    $lang: String!
    $filterTag: filterTagInput
    $filterBrand: filterBrandInput
    $filterImages: filterImagesInput
    $filterPrice: filterPriceInput
    $filterText: String
    $page: Int
    $pageSize: Int
  ) {
    products: listProducts(
      lang: $lang
      filterTag: $filterTag
      filterBrand: $filterBrand
      filterImages: $filterImages
      filterPrice: $filterPrice
      filterText: $filterText
      page: $page
      pageSize: $pageSize
    ) {
      id
      title
      fullName
      fullUrl
      brandId
      url
      price {
        low: priceLow
        high: priceHigh
      }
      images {
        url
        size
      }
    }
  }
`;

export default fetchProducts;