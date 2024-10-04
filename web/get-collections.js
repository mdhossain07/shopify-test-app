import shopify from "./shopify.js";

const collectionsQuery = `
        query {
            collections(first: 10) {
                edges {
                    node {
                        id
                        title
                        handle
                        updatedAt
                        sortOrder
                    }
                }
            }
        }`;

export default async function collections(session) {
  const client = new shopify.api.clients.Graphql({ session });
  return client.request(collectionsQuery);
}
