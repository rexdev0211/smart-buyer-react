const fetchTopTags = /* GraphQL */`
  query TopTags(
    $lang: String!
    $page: Int
    $pageSize: Int
  ) {
    topTags(
      topTagsBy: Level
      lang: $lang
      page: $page
      pageSize: $pageSize
    ) {
      id
      name
      lang
      qty
      url
    }
  }
`;

export default fetchTopTags;