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

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  addContent: Chapter;
  createUser: User;
  generateQuestions: Array<Scalars['String']['output']>;
  generateQuestionsForBook: Array<Question>;
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
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationGenerateQuestionsArgs = {
  chapter: Scalars['String']['input'];
};


export type MutationGenerateQuestionsForBookArgs = {
  bookId: Scalars['ID']['input'];
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  numberOfQuestions?: InputMaybe<Scalars['Int']['input']>;
  questionType?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getQuestionsForBook: Array<Question>;
  getUsers: Array<User>;
};


export type QueryGetQuestionsForBookArgs = {
  bookId: Scalars['ID']['input'];
  chapterId?: InputMaybe<Scalars['ID']['input']>;
};

export type Question = {
  __typename?: 'Question';
  answer: Scalars['String']['output'];
  bookId: Scalars['ID']['output'];
  chapterId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  option?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string, email: string }> };

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

export type GenerateQuestionsForBookMutationVariables = Exact<{
  bookId: Scalars['ID']['input'];
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  questionType?: InputMaybe<Scalars['String']['input']>;
  numberOfQuestions?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
}>;


export type GenerateQuestionsForBookMutation = { __typename?: 'Mutation', generateQuestionsForBook: Array<{ __typename?: 'Question', id: string, bookId: string, chapterId?: string | null, question: string, answer: string, option?: string | null, createdAt: string, updatedAt: string }> };

export type GetQuestionsForBookQueryVariables = Exact<{
  bookId: Scalars['ID']['input'];
  chapterId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetQuestionsForBookQuery = { __typename?: 'Query', getQuestionsForBook: Array<{ __typename?: 'Question', id: string, bookId: string, chapterId?: string | null, question: string, answer: string, option?: string | null, createdAt: string, updatedAt: string }> };


export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    email
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
export const GenerateQuestionsForBookDocument = gql`
    mutation GenerateQuestionsForBook($bookId: ID!, $chapterId: ID, $difficulty: String, $questionType: String, $numberOfQuestions: Int, $language: String) {
  generateQuestionsForBook(
    bookId: $bookId
    chapterId: $chapterId
    difficulty: $difficulty
    questionType: $questionType
    numberOfQuestions: $numberOfQuestions
    language: $language
  ) {
    id
    bookId
    chapterId
    question
    answer
    option
    createdAt
    updatedAt
  }
}
    `;
export type GenerateQuestionsForBookMutationFn = Apollo.MutationFunction<GenerateQuestionsForBookMutation, GenerateQuestionsForBookMutationVariables>;

/**
 * __useGenerateQuestionsForBookMutation__
 *
 * To run a mutation, you first call `useGenerateQuestionsForBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateQuestionsForBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateQuestionsForBookMutation, { data, loading, error }] = useGenerateQuestionsForBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      chapterId: // value for 'chapterId'
 *      difficulty: // value for 'difficulty'
 *      questionType: // value for 'questionType'
 *      numberOfQuestions: // value for 'numberOfQuestions'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useGenerateQuestionsForBookMutation(baseOptions?: Apollo.MutationHookOptions<GenerateQuestionsForBookMutation, GenerateQuestionsForBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateQuestionsForBookMutation, GenerateQuestionsForBookMutationVariables>(GenerateQuestionsForBookDocument, options);
      }
export type GenerateQuestionsForBookMutationHookResult = ReturnType<typeof useGenerateQuestionsForBookMutation>;
export type GenerateQuestionsForBookMutationResult = Apollo.MutationResult<GenerateQuestionsForBookMutation>;
export type GenerateQuestionsForBookMutationOptions = Apollo.BaseMutationOptions<GenerateQuestionsForBookMutation, GenerateQuestionsForBookMutationVariables>;
export const GetQuestionsForBookDocument = gql`
    query GetQuestionsForBook($bookId: ID!, $chapterId: ID) {
  getQuestionsForBook(bookId: $bookId, chapterId: $chapterId) {
    id
    bookId
    chapterId
    question
    answer
    option
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetQuestionsForBookQuery__
 *
 * To run a query within a React component, call `useGetQuestionsForBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsForBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsForBookQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useGetQuestionsForBookQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionsForBookQuery, GetQuestionsForBookQueryVariables> & ({ variables: GetQuestionsForBookQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsForBookQuery, GetQuestionsForBookQueryVariables>(GetQuestionsForBookDocument, options);
      }
export function useGetQuestionsForBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsForBookQuery, GetQuestionsForBookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsForBookQuery, GetQuestionsForBookQueryVariables>(GetQuestionsForBookDocument, options);
        }
export function useGetQuestionsForBookSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuestionsForBookQuery, GetQuestionsForBookQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuestionsForBookQuery, GetQuestionsForBookQueryVariables>(GetQuestionsForBookDocument, options);
        }
export type GetQuestionsForBookQueryHookResult = ReturnType<typeof useGetQuestionsForBookQuery>;
export type GetQuestionsForBookLazyQueryHookResult = ReturnType<typeof useGetQuestionsForBookLazyQuery>;
export type GetQuestionsForBookSuspenseQueryHookResult = ReturnType<typeof useGetQuestionsForBookSuspenseQuery>;
export type GetQuestionsForBookQueryResult = Apollo.QueryResult<GetQuestionsForBookQuery, GetQuestionsForBookQueryVariables>;