const fetchFilterData = /* GraphQL */`
  query FilterData(
    $lang: String!
    $filterText: String
    $filterBrand: filterBrandInput
    $filterTag: filterTagInput
    $filterPrice: filterPriceInput
  ) {
    filterData(
      lang: $lang
      filterText: $filterText
      filterBrand: $filterBrand
      filterTag: $filterTag
      filterPrice: $filterPrice
    ) {
      price {priceLow priceHigh}
      tags {id name qty url selected level}
      brands {id nicename qty url selected}
    }
  }
`;

export default fetchFilterData;