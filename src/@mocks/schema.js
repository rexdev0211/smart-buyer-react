import gql from "graphql-tag.macro"
import { makeExecutableSchema } from "graphql-tools";
import MockData from "./sample-data";

export const typeDefs = gql`
  type Product {
    id: String
    enabled: Boolean
    brandId: String
    brand: Brand
    serieId: String
    title: String
    model: String
    url: String
    fullName: String
    fullUrl: String
    tags: String
    images: [ImageUrl]
  }
  type ImageUrl {
    size: ImageSize!
    url: String!
  }
  enum ImageSize {
    thumb
    small
    medium
    large
  }
  type Brand {
    id: String
    name: String
    nicename: String
    logoUrl: String
    url: String
  }
  type Tag {
    id: String
    lang: String
    name: String
    url: String
  }
  type TagFilterData {
    id: UUID
    name: String
    url: String
    qty: Int
    selected: Boolean
    level: Int
    lang: String
  }
  type BrandFilterData {
    id: UUID
    nicename: String
    url: String
    qty: Int
    selected: Boolean
    lang: String
  }
  enum TopTagTypes {
    SiblingTagsAndProductsQty
    SiblingTagsQty
    Level
  }
  type filterTagInput {
    tagNames: [String]
    tagIds: [String]
    tagUrls: [String]
  }
  type filterBrandInput {
    brandUrls: [String]
  }
  type Query {
    product(
      id: String
      lang: String
      title: String
      brandId: String
      fullUrl: String
    ): Product
    products(
      enabled: Boolean
      lang: String
      filterTag: filterTagInput
      filterBrand: filterBrandInput
      page: Int
      pageSize: Int
    ): [Product]
    topBrands(lang: String!, page: Int, pageSize: Int): [BrandFilterData]
    topTags(
      topTagsBy: TopTagTypes!
      lang: String!
      page: Int
      pageSize: Int
    ): [TagFilterData]
  }
`;

export const resolvers = {
  Query: {
    products: () => MockData.products,
    topBrands: () => MockData.topBrands,
    topTags: () => MockData.topTags,
  },
};

export const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
