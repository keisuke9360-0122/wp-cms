import { GraphQLClient } from "graphql-request";

const endpoint = "https://urabiyou.jp/graphql";

export const client = new GraphQLClient(endpoint, {
  method: "POST",
});
