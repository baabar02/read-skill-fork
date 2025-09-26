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

export type AiAnalysis = {
  __typename?: 'AIAnalysis';
  analysisDate: Scalars['String']['output'];
  confidence: Scalars['Float']['output'];
  improvements: Array<Scalars['String']['output']>;
  overallScore: Scalars['Float']['output'];
  recommendations: Array<Scalars['String']['output']>;
  skillAssessments: Array<SkillAssessment>;
  strengths: Array<Scalars['String']['output']>;
};

export type AnalysisResponse = {
  __typename?: 'AnalysisResponse';
  analysis?: Maybe<AiAnalysis>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Answer = {
  __typename?: 'Answer';
  _id: Scalars['ID']['output'];
  aiAnalysis?: Maybe<AiAnalysis>;
  answer: Scalars['String']['output'];
  answerMetadata?: Maybe<AnswerMetadata>;
  createdAt: Scalars['String']['output'];
  isCorrect: Scalars['Boolean']['output'];
  option?: Maybe<QuestionOption>;
  questionId: Scalars['ID']['output'];
  selectedOption?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AnswerMetadata = {
  __typename?: 'AnswerMetadata';
  attemptCount?: Maybe<Scalars['Int']['output']>;
  difficulty?: Maybe<Scalars['String']['output']>;
  questionType?: Maybe<Scalars['String']['output']>;
  timeSpent?: Maybe<Scalars['Int']['output']>;
};

export type AnswerMetadataInput = {
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  questionType?: InputMaybe<Scalars['String']['input']>;
  timeSpent?: InputMaybe<Scalars['Int']['input']>;
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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
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

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type GeneratedQuestion = {
  __typename?: 'GeneratedQuestion';
  _id: Scalars['ID']['output'];
  option: QuestionOption;
  question: Scalars['String']['output'];
  skill: Scalars['String']['output'];
  subSkill: Scalars['String']['output'];
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
  createQuestion: Question;
  createUser: AuthPayload;
  deleteBook: DeleteResponse;
  generateMCQQuestions: Array<Question>;
  generateQuestions: Array<Scalars['String']['output']>;
  generateQuestionsFromText: Question;
  generateQuestionsWithContent: GeneratedQuestions;
  generateUserAnalysis: AnalysisResponse;
  loginUser: AuthPayload;
  requestSkillAssessment: AnalysisResponse;
  submitAnswer: Answer;
  transcribeAudio: Transcription;
  updateBook: Book;
  updateLearningGoals: Scalars['Boolean']['output'];
  userProgress?: Maybe<UserProgressResponse>;
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


export type MutationCreateQuestionArgs = {
  assignedTo?: InputMaybe<Scalars['ID']['input']>;
  createdBy: Scalars['ID']['input'];
  option?: InputMaybe<QuestionOptionsInput>;
  question: Scalars['String']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteBookArgs = {
  bookId: Scalars['ID']['input'];
};


export type MutationGenerateMcqQuestionsArgs = {
  answer: Scalars['String']['input'];
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


export type MutationGenerateQuestionsFromTextArgs = {
  maxQuestions?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationGenerateQuestionsWithContentArgs = {
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
  difficulty?: InputMaybe<Scalars['String']['input']>;
  numberOfQuestions?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationGenerateUserAnalysisArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  name: Scalars['String']['input'];
};


export type MutationRequestSkillAssessmentArgs = {
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  userId: Scalars['ID']['input'];
};


export type MutationSubmitAnswerArgs = {
  metadata?: InputMaybe<AnswerMetadataInput>;
  questionId: Scalars['ID']['input'];
  selectedOption?: InputMaybe<Scalars['String']['input']>;
  userAnswer: Scalars['String']['input'];
};


export type MutationTranscribeAudioArgs = {
  audioBase64: Scalars['String']['input'];
  bookId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateBookArgs = {
  audio_url?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  author?: InputMaybe<Scalars['String']['input']>;
  bookId: Scalars['ID']['input'];
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chapters?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateLearningGoalsArgs = {
  goals: Array<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationUserProgressArgs = {
  answer: Scalars['String']['input'];
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  questionId: Scalars['ID']['input'];
  timeAnswer: Scalars['Int']['input'];
  timeDuration: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _dummy?: Maybe<Scalars['String']['output']>;
  getBookById: Book;
  getBooks: Array<Book>;
  getSkillAnalysis: Array<SkillAssessment>;
  getTranscription?: Maybe<Transcription>;
  getTranscriptions: Array<Maybe<Transcription>>;
  getUserAIAnalysis?: Maybe<AiAnalysis>;
  getUserAnswers: Array<Answer>;
  getUserById: User;
  getUserLearningStats: UserLearningStats;
  getUserProgress?: Maybe<Array<Maybe<UserProgressResponse>>>;
  getUsers: Array<User>;
  latestQuestion?: Maybe<Question>;
  question?: Maybe<Question>;
  questions: Array<Question>;
};


export type QueryGetBookByIdArgs = {
  bookId: Scalars['ID']['input'];
};


export type QueryGetSkillAnalysisArgs = {
  skill?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetTranscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTranscriptionsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserAiAnalysisArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserAnswersArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserLearningStatsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserProgressArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryQuestionArgs = {
  id: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  option?: Maybe<QuestionOption>;
  questions: Array<GeneratedQuestion>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type QuestionOption = {
  __typename?: 'QuestionOption';
  _id: Scalars['ID']['output'];
  correctAnswer: Scalars['String']['output'];
  explanation: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
};

export type QuestionOptions = {
  __typename?: 'QuestionOptions';
  explanation: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
};

export type QuestionOptionsInput = {
  answer: Scalars['String']['input'];
  explanation?: InputMaybe<Scalars['String']['input']>;
  options: Array<Scalars['String']['input']>;
};

export type SkillAssessment = {
  __typename?: 'SkillAssessment';
  feedback: Scalars['String']['output'];
  level: Scalars['String']['output'];
  score: Scalars['Float']['output'];
  skill: Scalars['String']['output'];
  subSkill: Scalars['String']['output'];
};

export type SkillStats = {
  __typename?: 'SkillStats';
  accuracy: Scalars['Float']['output'];
  averageScore: Scalars['Float']['output'];
  correctAnswers: Scalars['Int']['output'];
  skill: Scalars['String']['output'];
  subSkill: Scalars['String']['output'];
  totalQuestions: Scalars['Int']['output'];
  trend: Scalars['String']['output'];
};

export type Transcription = {
  __typename?: 'Transcription';
  bookId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  score: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  wordCount: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type UserLearningStats = {
  __typename?: 'UserLearningStats';
  averageTime: Scalars['Float']['output'];
  correctAnswers: Scalars['Int']['output'];
  lastAnalysis?: Maybe<AiAnalysis>;
  overallAccuracy: Scalars['Float']['output'];
  skillBreakdown: Array<SkillStats>;
  totalAnswered: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
  weeklyProgress: Array<WeeklyProgress>;
};

export type UserProgressResponse = {
  __typename?: 'UserProgressResponse';
  answer?: Maybe<Scalars['String']['output']>;
  completed?: Maybe<Scalars['Boolean']['output']>;
  explanation?: Maybe<Scalars['String']['output']>;
  isCorrect?: Maybe<Scalars['Boolean']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  questionId?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  timeAnswer?: Maybe<Scalars['Float']['output']>;
  timeDuration?: Maybe<Scalars['Float']['output']>;
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

export type WeeklyProgress = {
  __typename?: 'WeeklyProgress';
  accuracy: Scalars['Float']['output'];
  averageScore: Scalars['Float']['output'];
  questionsAnswered: Scalars['Int']['output'];
  topSkills: Array<Scalars['String']['output']>;
  week: Scalars['String']['output'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string }> };

export type GetBooksFromAddBookQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksFromAddBookQuery = { __typename?: 'Query', getBooks: Array<{ __typename?: 'Book', id: string, title: string, author: string, chapters: number, categories: Array<string>, content: Array<string>, image: Array<string>, audio_url: Array<string> }> };

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
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string } } };

export type DeleteBookMutationVariables = Exact<{
  bookId: Scalars['ID']['input'];
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook: { __typename?: 'DeleteResponse', success: boolean, message?: string | null } };

export type GenerateMcqQuestionsMutationVariables = Exact<{
  content: Scalars['String']['input'];
  bookId?: InputMaybe<Scalars['ID']['input']>;
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  numberOfQuestions?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  answer: Scalars['String']['input'];
}>;


export type GenerateMcqQuestionsMutation = { __typename?: 'Mutation', generateMCQQuestions: Array<{ __typename?: 'Question', id: string, title: string, text: string, questions: Array<{ __typename?: 'GeneratedQuestion', question: string, skill: string, subSkill: string, option: { __typename?: 'QuestionOption', options: Array<string>, correctAnswer: string, explanation: string } }> }> };

export type GenerateQuestionsFromTextMutationVariables = Exact<{
  title: Scalars['String']['input'];
  text: Scalars['String']['input'];
  maxQuestions?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GenerateQuestionsFromTextMutation = { __typename?: 'Mutation', generateQuestionsFromText: { __typename?: 'Question', text: string, title: string, id: string, questions: Array<{ __typename?: 'GeneratedQuestion', question: string, skill: string, subSkill: string, option: { __typename?: 'QuestionOption', options: Array<string>, explanation: string, correctAnswer: string } }> } };

export type GenerateUserAnalysisMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GenerateUserAnalysisMutation = { __typename?: 'Mutation', generateUserAnalysis: { __typename?: 'AnalysisResponse', message: string, success: boolean, analysis?: { __typename?: 'AIAnalysis', overallScore: number, strengths: Array<string>, improvements: Array<string>, recommendations: Array<string>, analysisDate: string, confidence: number, skillAssessments: Array<{ __typename?: 'SkillAssessment', skill: string, subSkill: string, score: number, level: string, feedback: string }> } | null } };

export type GetBookByIdQueryVariables = Exact<{
  bookId: Scalars['ID']['input'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBookById: { __typename?: 'Book', id: string, title: string, chapters: number, author: string, categories: Array<string>, content: Array<string>, image: Array<string>, audio_url: Array<string> } };

export type GetBooksFromBookFileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksFromBookFileQuery = { __typename?: 'Query', getBooks: Array<{ __typename?: 'Book', id: string, title: string, chapters: number, author: string, categories: Array<string>, content: Array<string>, image: Array<string>, audio_url: Array<string> }> };

export type GetUserAnswersQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserAnswersQuery = { __typename?: 'Query', getUserAnswers: Array<{ __typename?: 'Answer', _id: string, questionId: string, answer: string, isCorrect: boolean, selectedOption?: string | null, option?: { __typename?: 'QuestionOption', correctAnswer: string, explanation: string, options: Array<string> } | null }> };

export type QueryQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', id: string, name: string } };

export type GetUserProgressQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserProgressQuery = { __typename?: 'Query', getUserProgress?: Array<{ __typename?: 'UserProgressResponse', questionId?: string | null, answer?: string | null, isCorrect?: boolean | null, timeDuration?: number | null, timeAnswer?: number | null, userName?: string | null, completed?: boolean | null, explanation?: string | null, score?: number | null, success?: boolean | null } | null> | null };

export type GetUsersFromUserFileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersFromUserFileQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string }> };

export type LatestQuestionQueryVariables = Exact<{ [key: string]: never; }>;


export type LatestQuestionQuery = { __typename?: 'Query', latestQuestion?: { __typename?: 'Question', id: string, title: string, text: string, createdAt?: string | null, updatedAt?: string | null, questions: Array<{ __typename?: 'GeneratedQuestion', _id: string, question: string, skill: string, subSkill: string, option: { __typename?: 'QuestionOption', options: Array<string>, explanation: string, correctAnswer: string } }> } | null };

export type LoginUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string } } };

export type SubmitAnswerMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  userAnswer: Scalars['String']['input'];
  metadata?: InputMaybe<AnswerMetadataInput>;
  selectedOption?: InputMaybe<Scalars['String']['input']>;
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer: { __typename?: 'Answer', answer: string, isCorrect: boolean, questionId: string, selectedOption?: string | null, userId: string, answerMetadata?: { __typename?: 'AnswerMetadata', timeSpent?: number | null, attemptCount?: number | null, difficulty?: string | null, questionType?: string | null } | null } };

export type UserProgressMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  answer: Scalars['String']['input'];
  timeDuration: Scalars['Int']['input'];
  timeAnswer: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UserProgressMutation = { __typename?: 'Mutation', userProgress?: { __typename?: 'UserProgressResponse', success?: boolean | null, isCorrect?: boolean | null, score?: number | null, explanation?: string | null } | null };

export type UpdateBookMutationVariables = Exact<{
  bookId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook: { __typename?: 'Book', id: string, title: string, author: string } };


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
export const GetBooksFromAddBookDocument = gql`
    query GetBooksFromAddBook {
  getBooks {
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

/**
 * __useGetBooksFromAddBookQuery__
 *
 * To run a query within a React component, call `useGetBooksFromAddBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksFromAddBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksFromAddBookQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksFromAddBookQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksFromAddBookQuery, GetBooksFromAddBookQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksFromAddBookQuery, GetBooksFromAddBookQueryVariables>(GetBooksFromAddBookDocument, options);
      }
export function useGetBooksFromAddBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksFromAddBookQuery, GetBooksFromAddBookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksFromAddBookQuery, GetBooksFromAddBookQueryVariables>(GetBooksFromAddBookDocument, options);
        }
export function useGetBooksFromAddBookSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBooksFromAddBookQuery, GetBooksFromAddBookQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksFromAddBookQuery, GetBooksFromAddBookQueryVariables>(GetBooksFromAddBookDocument, options);
        }
export type GetBooksFromAddBookQueryHookResult = ReturnType<typeof useGetBooksFromAddBookQuery>;
export type GetBooksFromAddBookLazyQueryHookResult = ReturnType<typeof useGetBooksFromAddBookLazyQuery>;
export type GetBooksFromAddBookSuspenseQueryHookResult = ReturnType<typeof useGetBooksFromAddBookSuspenseQuery>;
export type GetBooksFromAddBookQueryResult = Apollo.QueryResult<GetBooksFromAddBookQuery, GetBooksFromAddBookQueryVariables>;
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
    mutation CreateUser($name: String!) {
  createUser(name: $name) {
    user {
      id
      name
    }
    token
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
export const DeleteBookDocument = gql`
    mutation DeleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    success
    message
  }
}
    `;
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options);
      }
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>;
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>;
export const GenerateMcqQuestionsDocument = gql`
    mutation GenerateMCQQuestions($content: String!, $bookId: ID, $chapterId: ID, $difficulty: String, $numberOfQuestions: Int, $language: String, $answer: String!) {
  generateMCQQuestions(
    content: $content
    bookId: $bookId
    chapterId: $chapterId
    difficulty: $difficulty
    numberOfQuestions: $numberOfQuestions
    language: $language
    answer: $answer
  ) {
    id
    title
    text
    questions {
      question
      skill
      subSkill
      option {
        options
        correctAnswer
        explanation
      }
    }
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
 *      answer: // value for 'answer'
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
export const GenerateQuestionsFromTextDocument = gql`
    mutation GenerateQuestionsFromText($title: String!, $text: String!, $maxQuestions: Int) {
  generateQuestionsFromText(
    title: $title
    text: $text
    maxQuestions: $maxQuestions
  ) {
    questions {
      question
      skill
      subSkill
      option {
        options
        explanation
        correctAnswer
      }
    }
    text
    title
    id
  }
}
    `;
export type GenerateQuestionsFromTextMutationFn = Apollo.MutationFunction<GenerateQuestionsFromTextMutation, GenerateQuestionsFromTextMutationVariables>;

/**
 * __useGenerateQuestionsFromTextMutation__
 *
 * To run a mutation, you first call `useGenerateQuestionsFromTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateQuestionsFromTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateQuestionsFromTextMutation, { data, loading, error }] = useGenerateQuestionsFromTextMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      maxQuestions: // value for 'maxQuestions'
 *   },
 * });
 */
export function useGenerateQuestionsFromTextMutation(baseOptions?: Apollo.MutationHookOptions<GenerateQuestionsFromTextMutation, GenerateQuestionsFromTextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateQuestionsFromTextMutation, GenerateQuestionsFromTextMutationVariables>(GenerateQuestionsFromTextDocument, options);
      }
export type GenerateQuestionsFromTextMutationHookResult = ReturnType<typeof useGenerateQuestionsFromTextMutation>;
export type GenerateQuestionsFromTextMutationResult = Apollo.MutationResult<GenerateQuestionsFromTextMutation>;
export type GenerateQuestionsFromTextMutationOptions = Apollo.BaseMutationOptions<GenerateQuestionsFromTextMutation, GenerateQuestionsFromTextMutationVariables>;
export const GenerateUserAnalysisDocument = gql`
    mutation GenerateUserAnalysis($userId: ID!) {
  generateUserAnalysis(userId: $userId) {
    analysis {
      overallScore
      skillAssessments {
        skill
        subSkill
        score
        level
        feedback
      }
      strengths
      improvements
      recommendations
      analysisDate
      confidence
    }
    message
    success
  }
}
    `;
export type GenerateUserAnalysisMutationFn = Apollo.MutationFunction<GenerateUserAnalysisMutation, GenerateUserAnalysisMutationVariables>;

/**
 * __useGenerateUserAnalysisMutation__
 *
 * To run a mutation, you first call `useGenerateUserAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateUserAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateUserAnalysisMutation, { data, loading, error }] = useGenerateUserAnalysisMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGenerateUserAnalysisMutation(baseOptions?: Apollo.MutationHookOptions<GenerateUserAnalysisMutation, GenerateUserAnalysisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateUserAnalysisMutation, GenerateUserAnalysisMutationVariables>(GenerateUserAnalysisDocument, options);
      }
export type GenerateUserAnalysisMutationHookResult = ReturnType<typeof useGenerateUserAnalysisMutation>;
export type GenerateUserAnalysisMutationResult = Apollo.MutationResult<GenerateUserAnalysisMutation>;
export type GenerateUserAnalysisMutationOptions = Apollo.BaseMutationOptions<GenerateUserAnalysisMutation, GenerateUserAnalysisMutationVariables>;
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
export const GetBooksFromBookFileDocument = gql`
    query GetBooksFromBookFile {
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
 * __useGetBooksFromBookFileQuery__
 *
 * To run a query within a React component, call `useGetBooksFromBookFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksFromBookFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksFromBookFileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksFromBookFileQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksFromBookFileQuery, GetBooksFromBookFileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksFromBookFileQuery, GetBooksFromBookFileQueryVariables>(GetBooksFromBookFileDocument, options);
      }
export function useGetBooksFromBookFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksFromBookFileQuery, GetBooksFromBookFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksFromBookFileQuery, GetBooksFromBookFileQueryVariables>(GetBooksFromBookFileDocument, options);
        }
export function useGetBooksFromBookFileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBooksFromBookFileQuery, GetBooksFromBookFileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksFromBookFileQuery, GetBooksFromBookFileQueryVariables>(GetBooksFromBookFileDocument, options);
        }
export type GetBooksFromBookFileQueryHookResult = ReturnType<typeof useGetBooksFromBookFileQuery>;
export type GetBooksFromBookFileLazyQueryHookResult = ReturnType<typeof useGetBooksFromBookFileLazyQuery>;
export type GetBooksFromBookFileSuspenseQueryHookResult = ReturnType<typeof useGetBooksFromBookFileSuspenseQuery>;
export type GetBooksFromBookFileQueryResult = Apollo.QueryResult<GetBooksFromBookFileQuery, GetBooksFromBookFileQueryVariables>;
export const GetUserAnswersDocument = gql`
    query GetUserAnswers($userId: ID!) {
  getUserAnswers(userId: $userId) {
    _id
    questionId
    answer
    isCorrect
    selectedOption
    option {
      correctAnswer
      explanation
      options
    }
  }
}
    `;

/**
 * __useGetUserAnswersQuery__
 *
 * To run a query within a React component, call `useGetUserAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAnswersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserAnswersQuery(baseOptions: Apollo.QueryHookOptions<GetUserAnswersQuery, GetUserAnswersQueryVariables> & ({ variables: GetUserAnswersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAnswersQuery, GetUserAnswersQueryVariables>(GetUserAnswersDocument, options);
      }
export function useGetUserAnswersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAnswersQuery, GetUserAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAnswersQuery, GetUserAnswersQueryVariables>(GetUserAnswersDocument, options);
        }
export function useGetUserAnswersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserAnswersQuery, GetUserAnswersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserAnswersQuery, GetUserAnswersQueryVariables>(GetUserAnswersDocument, options);
        }
export type GetUserAnswersQueryHookResult = ReturnType<typeof useGetUserAnswersQuery>;
export type GetUserAnswersLazyQueryHookResult = ReturnType<typeof useGetUserAnswersLazyQuery>;
export type GetUserAnswersSuspenseQueryHookResult = ReturnType<typeof useGetUserAnswersSuspenseQuery>;
export type GetUserAnswersQueryResult = Apollo.QueryResult<GetUserAnswersQuery, GetUserAnswersQueryVariables>;
export const QueryDocument = gql`
    query Query($userId: ID!) {
  getUserById(userId: $userId) {
    id
    name
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useQueryQuery(baseOptions: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables> & ({ variables: QueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const GetUserProgressDocument = gql`
    query GetUserProgress($userId: ID!) {
  getUserProgress(userId: $userId) {
    questionId
    answer
    isCorrect
    timeDuration
    timeAnswer
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
export const GetUsersFromUserFileDocument = gql`
    query GetUsersFromUserFile {
  getUsers {
    id
    name
  }
}
    `;

/**
 * __useGetUsersFromUserFileQuery__
 *
 * To run a query within a React component, call `useGetUsersFromUserFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersFromUserFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersFromUserFileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersFromUserFileQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersFromUserFileQuery, GetUsersFromUserFileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersFromUserFileQuery, GetUsersFromUserFileQueryVariables>(GetUsersFromUserFileDocument, options);
      }
export function useGetUsersFromUserFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersFromUserFileQuery, GetUsersFromUserFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersFromUserFileQuery, GetUsersFromUserFileQueryVariables>(GetUsersFromUserFileDocument, options);
        }
export function useGetUsersFromUserFileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersFromUserFileQuery, GetUsersFromUserFileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersFromUserFileQuery, GetUsersFromUserFileQueryVariables>(GetUsersFromUserFileDocument, options);
        }
export type GetUsersFromUserFileQueryHookResult = ReturnType<typeof useGetUsersFromUserFileQuery>;
export type GetUsersFromUserFileLazyQueryHookResult = ReturnType<typeof useGetUsersFromUserFileLazyQuery>;
export type GetUsersFromUserFileSuspenseQueryHookResult = ReturnType<typeof useGetUsersFromUserFileSuspenseQuery>;
export type GetUsersFromUserFileQueryResult = Apollo.QueryResult<GetUsersFromUserFileQuery, GetUsersFromUserFileQueryVariables>;
export const LatestQuestionDocument = gql`
    query LatestQuestion {
  latestQuestion {
    id
    title
    text
    questions {
      _id
      question
      skill
      subSkill
      option {
        options
        explanation
        correctAnswer
      }
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useLatestQuestionQuery__
 *
 * To run a query within a React component, call `useLatestQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestQuestionQuery({
 *   variables: {
 *   },
 * });
 */
export function useLatestQuestionQuery(baseOptions?: Apollo.QueryHookOptions<LatestQuestionQuery, LatestQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestQuestionQuery, LatestQuestionQueryVariables>(LatestQuestionDocument, options);
      }
export function useLatestQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestQuestionQuery, LatestQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestQuestionQuery, LatestQuestionQueryVariables>(LatestQuestionDocument, options);
        }
export function useLatestQuestionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LatestQuestionQuery, LatestQuestionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LatestQuestionQuery, LatestQuestionQueryVariables>(LatestQuestionDocument, options);
        }
export type LatestQuestionQueryHookResult = ReturnType<typeof useLatestQuestionQuery>;
export type LatestQuestionLazyQueryHookResult = ReturnType<typeof useLatestQuestionLazyQuery>;
export type LatestQuestionSuspenseQueryHookResult = ReturnType<typeof useLatestQuestionSuspenseQuery>;
export type LatestQuestionQueryResult = Apollo.QueryResult<LatestQuestionQuery, LatestQuestionQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($name: String!) {
  loginUser(name: $name) {
    user {
      id
      name
    }
    token
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const SubmitAnswerDocument = gql`
    mutation SubmitAnswer($questionId: ID!, $userAnswer: String!, $metadata: AnswerMetadataInput, $selectedOption: String) {
  submitAnswer(
    questionId: $questionId
    userAnswer: $userAnswer
    metadata: $metadata
    selectedOption: $selectedOption
  ) {
    answer
    answerMetadata {
      timeSpent
      attemptCount
      difficulty
      questionType
    }
    isCorrect
    questionId
    selectedOption
    userId
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
 *      metadata: // value for 'metadata'
 *      selectedOption: // value for 'selectedOption'
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
    mutation UserProgress($questionId: ID!, $answer: String!, $timeDuration: Int!, $timeAnswer: Int!, $userId: ID) {
  userProgress(
    questionId: $questionId
    answer: $answer
    timeDuration: $timeDuration
    timeAnswer: $timeAnswer
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
 *      timeAnswer: // value for 'timeAnswer'
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
export const UpdateBookDocument = gql`
    mutation UpdateBook($bookId: ID!, $title: String) {
  updateBook(bookId: $bookId, title: $title) {
    id
    title
    author
  }
}
    `;
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>;

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options);
      }
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>;
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>;