import { GraphQLClient } from "graphql-request";

const endpoint = "http://wp-cms.local/graphql";

export const client = new GraphQLClient(endpoint);
