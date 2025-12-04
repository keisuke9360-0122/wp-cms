import { GraphQLClient } from "graphql-request";

const endpoint = "https://xs400651.xsrv.jp/graphql";

export const client = new GraphQLClient(endpoint, {
  method: "POST",
});
