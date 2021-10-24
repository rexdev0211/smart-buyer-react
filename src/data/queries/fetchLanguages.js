const fetchLanguages = /* GraphQL */`
  query {
    languages {
      label
      lang
    }
  }
`;

export default fetchLanguages;