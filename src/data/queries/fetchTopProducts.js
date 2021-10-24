const fetchTopProducts = /* GraphQL */`
  query topProducts(
    $lang: String!
    $filterTag1: filterTagInput
    $page1: Int
    $filterTag2: filterTagInput
    $page2: Int
    $filterTag3: filterTagInput
    $page3: Int
    $filterImages: filterImagesInput
    $pageSize: Int
  ) {
    top1: listProducts(
      lang: $lang
      filterTag: $filterTag1
      filterImages: $filterImages
      page: $page1
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
    top2: listProducts(
      lang: $lang
      filterTag: $filterTag2
      filterImages: $filterImages
      page: $page2
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
    top3: listProducts(
      lang: $lang
      filterTag: $filterTag3
      filterImages: $filterImages
      page: $page3
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

export default fetchTopProducts;