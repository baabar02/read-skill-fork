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
  option: String
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

  type Query {
    getUsers: [User!]!
    getQuestionsForBook(bookId: ID!, chapterId: ID): [Question!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    addBook(title: String!, chapters: Int, author: String, categories: [String], content: String, image: [String], audio_url: [String]): Book!
    addContent(bookId:ID!, title:String, content:[String], audio_url:String): Chapter!
    generateQuestionsForBook(
      bookId: ID!
      chapterId: ID
      difficulty: String
      questionType: String
      numberOfQuestions: Int
      language: String
    ): [Question!]!
  }
`;
