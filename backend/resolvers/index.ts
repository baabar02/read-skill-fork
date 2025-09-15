import * as Mutation from "./mutations";
import * as Query from "./queries";

export const resolvers = {
  Mutation: {
    createUser: Mutation.createUser,
    addBook: Mutation.addBook,
    addContent: Mutation.addContent,
    generateQuestionsForBook: Mutation.generateQuestionsForBook,
  },
  Query: {
    getUsers: Query.getUsers,
    getQuestionsForBook: Mutation.getQuestionsForBook,
  },
};
