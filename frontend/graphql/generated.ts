import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String']['output'];
  bookId: Scalars['ID']['output'];
  chapterId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  questionId: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type AnswerResult = {
  __typename?: 'AnswerResult';
  correctAnswer: Scalars['String']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  options?: Maybe<QuestionOptions>;
  questionId: Scalars['ID']['output'];
  userAnswer: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  audio_url: Array<Scalars['String']['output']>;
  author: Scalars['String']['output'];
  categories: Array<Scalars['String']['output']>;
  chapters: Scalars['Int']['output'];
  content: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  audio_url?: Maybe<Scalars['String']['output']>;
  bookId: Scalars['ID']['output'];
  content?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Content = {
  __typename?: 'Content';
  chapter: Chapter;
  chapterId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type GeneratedQuestions = {
  __typename?: 'GeneratedQuestions';
  bookId?: Maybe<Scalars['ID']['output']>;
  chapterId?: Maybe<Scalars['ID']['output']>;
  content: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  numberOfQuestions: Scalars['Int']['output'];
  questions: Array<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  addContent: Chapter;
  createUser: User;
  generateMCQQuestions: Array<Question>;
  generateQuestions: Array<Scalars['String']['output']>;
  generateQuestionsWithContent: GeneratedQuestions;
  submitAnswer: AnswerResult;
  userProgress?: Maybe<UserProgressResult>;
};


export type MutationAddBookArgs = {
  audio_url?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  author?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chapters?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};


export type MutationAddContentArgs = {
  audio_url?: InputMaybe<Scalars['String']['input']>;
  bookId: Scalars['ID']['input'];
  content?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationGenerateMcqQuestionsArgs = {
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
  difficulty?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  numberOfQuestions?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationGenerateQuestionsArgs = {
  chapter: Scalars['String']['input'];
};


export type MutationGenerateQuestionsWithContentArgs = {
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
  difficulty?: InputMaybe<Scalars['String']['input']>;
  numberOfQuestions?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSubmitAnswerArgs = {
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  questionId: Scalars['ID']['input'];
  userAnswer: Scalars['String']['input'];
};


export type MutationUserProgressArgs = {
  answer: Scalars['String']['input'];
  questionId: Scalars['ID']['input'];
  timeDuration: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getBookById: Book;
  getBooks: Array<Book>;
  getQuestionsForBook: Array<Question>;
  getUserAnswers: Array<Answer>;
  getUserProgress: Array<UserProgress>;
  getUserScore: UserScore;
  getUsers: Array<User>;
};


export type QueryGetBookByIdArgs = {
  bookId: Scalars['ID']['input'];
};


export type QueryGetQuestionsForBookArgs = {
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetUserAnswersArgs = {
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetUserProgressArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserScoreArgs = {
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  answer: Scalars['String']['output'];
  bookId: Scalars['ID']['output'];
  chapterId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  option?: Maybe<QuestionOptions>;
  question: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type QuestionOptions = {
  __typename?: 'QuestionOptions';
  explanation: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserProgress = {
  __typename?: 'UserProgress';
  answer: Scalars['String']['output'];
  completed?: Maybe<Scalars['Boolean']['output']>;
  explanation?: Maybe<Scalars['String']['output']>;
  isCorrect: Scalars['Boolean']['output'];
  question: Scalars['String']['output'];
  questionId: Scalars['ID']['output'];
  score?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  timeDuration?: Maybe<Scalars['Int']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserProgressResult = {
  __typename?: 'UserProgressResult';
  explanation?: Maybe<Scalars['String']['output']>;
  isCorrect?: Maybe<Scalars['Boolean']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserScore = {
  __typename?: 'UserScore';
  bookId?: Maybe<Scalars['ID']['output']>;
  chapterId?: Maybe<Scalars['ID']['output']>;
  correctAnswers: Scalars['Int']['output'];
  percentage: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  totalQuestions: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
};

export type AddBookMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  author?: InputMaybe<Scalars['String']['input']>;
  chapters?: InputMaybe<Scalars['Int']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  image?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  audio_url?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', id: string, title: string, author: string, chapters: number, categories: Array<string>, content: Array<string>, image: Array<string>, audio_url: Array<string> } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', name: string } };

export type GenerateMcqQuestionsMutationVariables = Exact<{
  content: Scalars['String']['input'];
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  numberOfQuestions?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
}>;


export type GenerateMcqQuestionsMutation = { __typename?: 'Mutation', generateMCQQuestions: Array<{ __typename?: 'Question', id: string, bookId: string, chapterId?: string | null, question: string, answer: string, createdAt: string, updatedAt: string, option?: { __typename?: 'QuestionOptions', options: Array<string>, explanation: string } | null }> };

export type GenerateQuestionsMutationVariables = Exact<{
  chapter: Scalars['String']['input'];
}>;


export type GenerateQuestionsMutation = { __typename?: 'Mutation', generateQuestions: Array<string> };

export type GetBookByIdQueryVariables = Exact<{
  bookId: Scalars['ID']['input'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBookById: { __typename?: 'Book', id: string, title: string, chapters: number, author: string, categories: Array<string>, content: Array<string>, image: Array<string>, audio_url: Array<string> } };

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: Array<{ __typename?: 'Book', id: string, title: string, chapters: number, author: string, categories: Array<string>, content: Array<string>, image: Array<string>, audio_url: Array<string> }> };

export type GetQuestionsQueryVariables = Exact<{
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetQuestionsQuery = { __typename?: 'Query', getQuestionsForBook: Array<{ __typename?: 'Question', id: string, bookId: string, chapterId?: string | null, question: string, answer: string, createdAt: string, updatedAt: string, option?: { __typename?: 'QuestionOptions', options: Array<string>, explanation: string } | null }> };

export type GetUserProgressQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserProgressQuery = { __typename?: 'Query', getUserProgress: Array<{ __typename?: 'UserProgress', questionId: string, answer: string, isCorrect: boolean, timeDuration?: number | null, userName?: string | null, completed?: boolean | null, explanation?: string | null, score?: number | null, success?: boolean | null }> };

export type GetUserScoreQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetUserScoreQuery = { __typename?: 'Query', getUserScore: { __typename?: 'UserScore', userId: string, bookId?: string | null, chapterId?: string | null, totalQuestions: number, correctAnswers: number, score: number, percentage: number } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string }> };

export type SubmitAnswerMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  userAnswer: Scalars['String']['input'];
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer: { __typename?: 'AnswerResult', id: string, questionId: string, userAnswer: string, correctAnswer: string, isCorrect: boolean, explanation?: string | null, options?: { __typename?: 'QuestionOptions', options: Array<string>, explanation: string } | null } };

export type UserProgressMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  answer: Scalars['String']['input'];
  timeDuration: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UserProgressMutation = { __typename?: 'Mutation', userProgress?: { __typename?: 'UserProgressResult', success?: boolean | null, isCorrect?: boolean | null, score?: number | null, explanation?: string | null } | null };


export const AddBookDocument = gql`
    mutation AddBook($title: String!, $content: String!, $author: String, $chapters: Int, $categories: [String], $image: [String], $audio_url: [String]) {
  addBook(
    title: $title
    content: $content
    author: $author
    chapters: $chapters
    categories: $categories
    image: $image
    audio_url: $audio_url
  ) {
    id
    title
    author
    chapters
    categories
    content
    image
    audio_url
  }
}
    `;
export type AddBookMutationFn = Apollo.MutationFunction<AddBookMutation, AddBookMutationVariables>;

/**
 * __useAddBookMutation__
 *
 * To run a mutation, you first call `useAddBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookMutation, { data, loading, error }] = useAddBookMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      author: // value for 'author'
 *      chapters: // value for 'chapters'
 *      categories: // value for 'categories'
 *      image: // value for 'image'
 *      audio_url: // value for 'audio_url'
 *   },
 * });
 */
export function useAddBookMutation(baseOptions?: Apollo.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, options);
      }
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = Apollo.MutationResult<AddBookMutation>;
export type AddBookMutationOptions = Apollo.BaseMutationOptions<AddBookMutation, AddBookMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name) {
    name
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GenerateMcqQuestionsDocument = gql`
    mutation GenerateMCQQuestions($content: String!, $bookId: ID, $chapterId: ID, $difficulty: String, $numberOfQuestions: Int, $language: String) {
  generateMCQQuestions(
    content: $content
    bookId: $bookId
    chapterId: $chapterId
    difficulty: $difficulty
    numberOfQuestions: $numberOfQuestions
    language: $language
  ) {
    id
    bookId
    chapterId
    question
    answer
    option {
      options
      explanation
    }
    createdAt
    updatedAt
  }
}
    `;
export type GenerateMcqQuestionsMutationFn = Apollo.MutationFunction<GenerateMcqQuestionsMutation, GenerateMcqQuestionsMutationVariables>;

/**
 * __useGenerateMcqQuestionsMutation__
 *
 * To run a mutation, you first call `useGenerateMcqQuestionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateMcqQuestionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateMcqQuestionsMutation, { data, loading, error }] = useGenerateMcqQuestionsMutation({
 *   variables: {
 *      content: // value for 'content'
 *      bookId: // value for 'bookId'
 *      chapterId: // value for 'chapterId'
 *      difficulty: // value for 'difficulty'
 *      numberOfQuestions: // value for 'numberOfQuestions'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGenerateMcqQuestionsMutation(baseOptions?: Apollo.MutationHookOptions<GenerateMcqQuestionsMutation, GenerateMcqQuestionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateMcqQuestionsMutation, GenerateMcqQuestionsMutationVariables>(GenerateMcqQuestionsDocument, options);
      }
export type GenerateMcqQuestionsMutationHookResult = ReturnType<typeof useGenerateMcqQuestionsMutation>;
export type GenerateMcqQuestionsMutationResult = Apollo.MutationResult<GenerateMcqQuestionsMutation>;
export type GenerateMcqQuestionsMutationOptions = Apollo.BaseMutationOptions<GenerateMcqQuestionsMutation, GenerateMcqQuestionsMutationVariables>;
export const GenerateQuestionsDocument = gql`
    mutation GenerateQuestions($chapter: String!) {
  generateQuestions(chapter: $chapter)
}
    `;
export type GenerateQuestionsMutationFn = Apollo.MutationFunction<GenerateQuestionsMutation, GenerateQuestionsMutationVariables>;

/**
 * __useGenerateQuestionsMutation__
 *
 * To run a mutation, you first call `useGenerateQuestionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateQuestionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateQuestionsMutation, { data, loading, error }] = useGenerateQuestionsMutation({
 *   variables: {
 *      chapter: // value for 'chapter'
 *   },
 * });
 */
export function useGenerateQuestionsMutation(baseOptions?: Apollo.MutationHookOptions<GenerateQuestionsMutation, GenerateQuestionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateQuestionsMutation, GenerateQuestionsMutationVariables>(GenerateQuestionsDocument, options);
      }
export type GenerateQuestionsMutationHookResult = ReturnType<typeof useGenerateQuestionsMutation>;
export type GenerateQuestionsMutationResult = Apollo.MutationResult<GenerateQuestionsMutation>;
export type GenerateQuestionsMutationOptions = Apollo.BaseMutationOptions<GenerateQuestionsMutation, GenerateQuestionsMutationVariables>;
export const GetBookByIdDocument = gql`
    query GetBookById($bookId: ID!) {
  getBookById(bookId: $bookId) {
    id
    title
    chapters
    author
    categories
    content
    image
    audio_url
  }
}
    `;

/**
 * __useGetBookByIdQuery__
 *
 * To run a query within a React component, call `useGetBookByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookByIdQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useGetBookByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables> & ({ variables: GetBookByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
      }
export function useGetBookByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export function useGetBookByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBookByIdQuery, GetBookByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookByIdQuery, GetBookByIdQueryVariables>(GetBookByIdDocument, options);
        }
export type GetBookByIdQueryHookResult = ReturnType<typeof useGetBookByIdQuery>;
export type GetBookByIdLazyQueryHookResult = ReturnType<typeof useGetBookByIdLazyQuery>;
export type GetBookByIdSuspenseQueryHookResult = ReturnType<typeof useGetBookByIdSuspenseQuery>;
export type GetBookByIdQueryResult = Apollo.QueryResult<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetBooksDocument = gql`
    query GetBooks {
  getBooks {
    id
    title
    chapters
    author
    categories
    content
    image
    audio_url
  }
}
    `;

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
      }
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export function useGetBooksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksSuspenseQueryHookResult = ReturnType<typeof useGetBooksSuspenseQuery>;
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const GetQuestionsDocument = gql`
    query GetQuestions($bookId: ID, $chapterId: ID) {
  getQuestionsForBook(bookId: $bookId, chapterId: $chapterId) {
    id
    bookId
    chapterId
    question
    answer
    option {
      options
      explanation
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetQuestionsQuery__
 *
 * To run a query within a React component, call `useGetQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useGetQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
      }
export function useGetQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
        }
export function useGetQuestionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
        }
export type GetQuestionsQueryHookResult = ReturnType<typeof useGetQuestionsQuery>;
export type GetQuestionsLazyQueryHookResult = ReturnType<typeof useGetQuestionsLazyQuery>;
export type GetQuestionsSuspenseQueryHookResult = ReturnType<typeof useGetQuestionsSuspenseQuery>;
export type GetQuestionsQueryResult = Apollo.QueryResult<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const GetUserProgressDocument = gql`
    query GetUserProgress($userId: ID!) {
  getUserProgress(userId: $userId) {
    questionId
    answer
    isCorrect
    timeDuration
    userName
    completed
    explanation
    score
    success
  }
}
    `;

/**
 * __useGetUserProgressQuery__
 *
 * To run a query within a React component, call `useGetUserProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProgressQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserProgressQuery(baseOptions: Apollo.QueryHookOptions<GetUserProgressQuery, GetUserProgressQueryVariables> & ({ variables: GetUserProgressQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProgressQuery, GetUserProgressQueryVariables>(GetUserProgressDocument, options);
      }
export function useGetUserProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProgressQuery, GetUserProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProgressQuery, GetUserProgressQueryVariables>(GetUserProgressDocument, options);
        }
export function useGetUserProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserProgressQuery, GetUserProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserProgressQuery, GetUserProgressQueryVariables>(GetUserProgressDocument, options);
        }
export type GetUserProgressQueryHookResult = ReturnType<typeof useGetUserProgressQuery>;
export type GetUserProgressLazyQueryHookResult = ReturnType<typeof useGetUserProgressLazyQuery>;
export type GetUserProgressSuspenseQueryHookResult = ReturnType<typeof useGetUserProgressSuspenseQuery>;
export type GetUserProgressQueryResult = Apollo.QueryResult<GetUserProgressQuery, GetUserProgressQueryVariables>;
export const GetUserScoreDocument = gql`
    query GetUserScore($userId: ID!, $bookId: ID, $chapterId: ID) {
  getUserScore(userId: $userId, bookId: $bookId, chapterId: $chapterId) {
    userId
    bookId
    chapterId
    totalQuestions
    correctAnswers
    score
    percentage
  }
}
    `;

/**
 * __useGetUserScoreQuery__
 *
 * To run a query within a React component, call `useGetUserScoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserScoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserScoreQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      bookId: // value for 'bookId'
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useGetUserScoreQuery(baseOptions: Apollo.QueryHookOptions<GetUserScoreQuery, GetUserScoreQueryVariables> & ({ variables: GetUserScoreQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserScoreQuery, GetUserScoreQueryVariables>(GetUserScoreDocument, options);
      }
export function useGetUserScoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserScoreQuery, GetUserScoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserScoreQuery, GetUserScoreQueryVariables>(GetUserScoreDocument, options);
        }
export function useGetUserScoreSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserScoreQuery, GetUserScoreQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserScoreQuery, GetUserScoreQueryVariables>(GetUserScoreDocument, options);
        }
export type GetUserScoreQueryHookResult = ReturnType<typeof useGetUserScoreQuery>;
export type GetUserScoreLazyQueryHookResult = ReturnType<typeof useGetUserScoreLazyQuery>;
export type GetUserScoreSuspenseQueryHookResult = ReturnType<typeof useGetUserScoreSuspenseQuery>;
export type GetUserScoreQueryResult = Apollo.QueryResult<GetUserScoreQuery, GetUserScoreQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const SubmitAnswerDocument = gql`
    mutation SubmitAnswer($questionId: ID!, $userAnswer: String!) {
  submitAnswer(questionId: $questionId, userAnswer: $userAnswer) {
    id
    questionId
    userAnswer
    correctAnswer
    isCorrect
    options {
      options
      explanation
    }
    explanation
  }
}
    `;
export type SubmitAnswerMutationFn = Apollo.MutationFunction<SubmitAnswerMutation, SubmitAnswerMutationVariables>;

/**
 * __useSubmitAnswerMutation__
 *
 * To run a mutation, you first call `useSubmitAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAnswerMutation, { data, loading, error }] = useSubmitAnswerMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      userAnswer: // value for 'userAnswer'
 *   },
 * });
 */
export function useSubmitAnswerMutation(baseOptions?: Apollo.MutationHookOptions<SubmitAnswerMutation, SubmitAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitAnswerMutation, SubmitAnswerMutationVariables>(SubmitAnswerDocument, options);
      }
export type SubmitAnswerMutationHookResult = ReturnType<typeof useSubmitAnswerMutation>;
export type SubmitAnswerMutationResult = Apollo.MutationResult<SubmitAnswerMutation>;
export type SubmitAnswerMutationOptions = Apollo.BaseMutationOptions<SubmitAnswerMutation, SubmitAnswerMutationVariables>;
export const UserProgressDocument = gql`
    mutation UserProgress($questionId: ID!, $answer: String!, $timeDuration: Int!, $userId: ID) {
  userProgress(
    questionId: $questionId
    answer: $answer
    timeDuration: $timeDuration
    userId: $userId
  ) {
    success
    isCorrect
    score
    explanation
  }
}
    `;
export type UserProgressMutationFn = Apollo.MutationFunction<UserProgressMutation, UserProgressMutationVariables>;

/**
 * __useUserProgressMutation__
 *
 * To run a mutation, you first call `useUserProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userProgressMutation, { data, loading, error }] = useUserProgressMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      answer: // value for 'answer'
 *      timeDuration: // value for 'timeDuration'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProgressMutation(baseOptions?: Apollo.MutationHookOptions<UserProgressMutation, UserProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserProgressMutation, UserProgressMutationVariables>(UserProgressDocument, options);
      }
export type UserProgressMutationHookResult = ReturnType<typeof useUserProgressMutation>;
export type UserProgressMutationResult = Apollo.MutationResult<UserProgressMutation>;
export type UserProgressMutationOptions = Apollo.BaseMutationOptions<UserProgressMutation, UserProgressMutationVariables>;