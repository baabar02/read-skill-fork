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
    userProgress: Mutation.userProgress,
    loginUser: Mutation.loginUser,
    updateBook: Mutation.updateBook,
    deleteBook: Mutation.deleteBook,
    createQuestion: Mutation.createQuestion
    transcribeAudio: Mutation.transcribeAudio,
  },
  Query: {
    getUsers: Query.getUsers,
    getQuestionsForBook: Query.getQuestionsForBook,
    getUserAnswers: Query.getUserAnswers,
    getUserScore: Query.getUserScore,

    // getBookById: Query.getBookById,
    getBooks: Query.getBooks,
    getUserProgress: Query.getUserProgress,
    getUserById: Query.getUserById,
    getTranscriptions: Query.getTranscriptions,
    getTranscription: Query.getTranscription,
  },

  
  Question: {
    option: (parent: any) => {
      if (parent.option && typeof parent.option === "string") {
        try {
          return JSON.parse(parent.option);
        } catch (e) {
          console.error("Error parsing question options:", e);
          return null;
        }
      }
      return parent.option;
    },
  },
};
