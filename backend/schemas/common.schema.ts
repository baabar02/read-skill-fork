export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Book {
    id: ID!
    title: String!
    chapters: Int!
    author: String!
    categories: [String!]!
    content:[String!]!
    image: [String!]!
    audio_url: [String!]!
  }

type Chapter {
bookId:ID!
title:String
content:[String]
audio_url:String
}

type Content {
  id: ID!
  chapterId: ID!
  chapter: Chapter!
}

type Question {
  id: ID!
  bookId: ID!
  chapterId: ID
  question: String!
  answer: String!
  option: QuestionOptions
  createdAt: String!
  updatedAt: String!
}

type Answer {
  id: ID!
  bookId: ID!
  chapterId: ID!
  questionId: ID!
  userId: ID!
  answer: String!
  isCorrect: Boolean!
  createdAt: String!
  updatedAt: String!
}

type GeneratedQuestions {
  questions: [String!]!
  bookId: ID
  chapterId: ID
  content: String!
  difficulty: String!
  numberOfQuestions: Int!
}

type QuestionOptions {
  options: [String!]!
  explanation: String!
}

type AnswerResult {
  id: ID!
  questionId: ID!
  userAnswer: String!
  correctAnswer: String!
  isCorrect: Boolean!
  options: QuestionOptions
  explanation: String
}

type UserScore {
  userId: ID!
  bookId: ID
  chapterId: ID
  totalQuestions: Int!
  correctAnswers: Int!
  score: Int!
  percentage: Int!
}

  type Query {
    getUsers: [User!]!
    getQuestionsForBook(bookId: ID, chapterId: ID): [Question!]!
    getUserAnswers(userId: ID!, bookId: ID, chapterId: ID): [Answer!]!
    getUserScore(userId: ID!, bookId: ID, chapterId: ID): UserScore!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    addBook(title: String!, chapters: Int, author: String, categories: [String], content: String, image: [String], audio_url: [String]): Book!
    addContent(bookId:ID!, title:String, content:[String], audio_url:String): Chapter!
    generateQuestions(chapter: String!): [String!]!
    generateQuestionsWithContent(
      content: String!
      bookId: ID
      chapterId: ID
      difficulty: String
      numberOfQuestions: Int
    ): GeneratedQuestions!
    generateMCQQuestions(
      content: String!
      bookId: ID
      chapterId: ID
      difficulty: String
      numberOfQuestions: Int
      language: String
    ): [Question!]!
    submitAnswer(
      questionId: ID!
      userId: ID!
      userAnswer: String!
      bookId: ID
      chapterId: ID
    ): AnswerResult!
  }
`;
