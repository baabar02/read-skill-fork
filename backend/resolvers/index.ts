import * as Mutation from "./mutations";
import * as Query from "./queries";

export const resolvers = {
  Mutation: {
    createUser: Mutation.createUser,
  },
  Query: {
    getUsers: Query.getUsers,
  },
};
