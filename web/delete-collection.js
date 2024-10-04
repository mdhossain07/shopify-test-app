import shopify from "./shopify.js";

const DELETE_COLLECTION_MUTATION = `
    mutation collectionDelete($input: CollectionDeleteInput!) {
        collectionDelete(input: $input) {
            deletedCollectionId
                shop {
                    id
                    name
                }
            userErrors {
                field
                message
            }
        }
    }`;

export default function deleteCollection(session, collectionId) {
  const client = new shopify.api.clients.Graphql({ session });
  return client.request(DELETE_COLLECTION_MUTATION, {
    variables: {
      input: {
        id: `gid://shopify/Collection/${collectionId}`,
      },
    },
  });
}
