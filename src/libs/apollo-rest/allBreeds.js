const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const { RestLink } = require("apollo-link-rest");

const restLink = new RestLink({ uri: "https://api.thecatapi.com/v1/" });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
  });

  const query = gql`
  query Cats {
    data @rest(type: "Cat", path: "breeds") {
      name
      id
      weight
      temperament
      life_span
      origin
      reference_image_id
    }
  }
`;

export default client.query({ query }).then(response => {
  return response.data;
});