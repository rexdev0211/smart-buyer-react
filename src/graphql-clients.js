import { Client } from "micro-graphql-react";

export const mainClient = (isPrivate) => new Client({
      endpoint: 
      isPrivate ? 
      process.env.REACT_APP_PRODUCTS_API_URL_PRIVATE 
      :
      process.env.REACT_APP_PRODUCTS_API_URL_OPEN
})

export const refClient = (isPrivate) => new Client({
  endpoint: 
  isPrivate ? 
  process.env.REACT_APP_PRODUCTS_REF_API_URL_PRIVATE
  : 
  process.env.REACT_APP_PRODUCTS_REF_API_URL_OPEN
})
