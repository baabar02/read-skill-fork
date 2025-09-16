import * as Mutation from "./mutations";
import * as Query from "./queries";

export const resolvers = {
  Mutation: {
    createUser: Mutation.createUser,
    addBook: Mutation.addBook,
    addContent: Mutation.addContent,
    generateQuestions: Mutation.generateQuestions,
    generateQuestionsWithContent: Mutation.generateQuestionsWithContent,
    generateMCQQuestions: Mutation.generateMCQQuestions,
    submitAnswer: Mutation.submitAnswer,
  },
  Query: {
    getUsers: Query.getUsers,
    getQuestionsForBook: Query.getQuestionsForBook,
    getUserAnswers: Query.getUserAnswers,
    getUserScore: Query.getUserScore,
    getBooks: Query.getBooks,
  },
};
