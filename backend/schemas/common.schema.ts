export const typeDefs = `
  type User {
    id: ID!
    name: String!
    token: String
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Book {
    id: ID!
    title: String!
    chapters: Int!
    author: String!
    categories: [String!]!
    content: [String!]!
    image: [String!]!
    audio_url: [String!]!
  }

  type Chapter {
    bookId: ID!
    title: String
    content: [String]
    audio_url: String
  }

  type Content {
    id: ID!
    chapterId: ID!
    chapter: Chapter!
  }
  
  type QuestionOption {
    _id: ID!
    options: [String!]!
    explanation: String!
    correctAnswer: String!
  }

  type GeneratedQuestion {
    _id: ID!
    question: String!
    skill: String  
    subSkill: String  
    option: QuestionOption!
  }

  type Question {
    _id: ID!
    title: String!
    text: String!
    questions: [GeneratedQuestion!]!
    option: QuestionOption
    createdAt: String!
    updatedAt: String!
  }

 
  type SkillAssessment {
    skill: String!
    subSkill: String!
    score: Int!           
    level: String!        
    feedback: String!     
  }

  type AIAnalysis {
    overallScore: Int!              
    skillAssessments: [SkillAssessment!]! 
    strengths: [String!]!         
    improvements: [String!]!        
    recommendations: [String!]!  
    analysisDate: String!         
    confidence: Float!             
  }

  type AnswerMetadata {
    timeSpent: Int               
    attemptCount: Int        
    difficulty: String         
    questionType: String            
  }
    
  type Answer {
    _id: ID!
    questionId: ID!
    userId: String!
    answer: String!
    isCorrect: Boolean!
    selectedOption: String
    option: QuestionOption
    aiAnalysis: AIAnalysis         
    answerMetadata: AnswerMetadata 
    createdAt: String!
    updatedAt: String!
  }

 
  type UserLearningStats {
    userId: ID!
    totalAnswered: Int!            
    correctAnswers: Int!        
    overallAccuracy: Float!       
    averageTime: Float!         
    skillBreakdown: [SkillStats!]!  
    weeklyProgress: [WeeklyProgress!]!
    lastAnalysis: AIAnalysis       
  }

  type SkillStats {
    skill: String!
    subSkill: String!
    totalQuestions: Int!
    correctAnswers: Int!
    accuracy: Float!
    averageScore: Float!
    trend: String!                
  }

  type WeeklyProgress {
    week: String!               
    questionsAnswered: Int!
    accuracy: Float!
    averageScore: Float!
    topSkills: [String!]!        
  }

  type Transcription {
    id: ID!
    text: String!
    userId: ID!
    bookId: ID!
    isCorrect: Boolean!
    score: Int!
    createdAt: String!
    wordCount: Int!
    duration: Int
  }

  # Inputs
  input QuestionOptionsInput {
    options: [String!]!
    answer: String!
    explanation: String
  }

  input AnswerMetadataInput {
    timeSpent: Int
    attemptCount: Int
    difficulty: String
    questionType: String
  }

  type Query {
    getUsers: [User!]!
    getUserAnswers(userId: ID!): [Answer!]!
    getUserById(userId: ID!): User!
    getBooks: [Book!]!
   latestQuestion: Question
    getBookById(bookId: ID!): Book!
    getUserProgress(userId: ID!): [UserProgressResponse]
    getTranscriptions(userId: ID!): [Transcription]!
    getTranscription(id: ID!): Transcription
    questions: [Question!]!
    question(id: ID!): Question
    
 
    getUserLearningStats(userId: ID!): UserLearningStats!
    getSkillAnalysis(userId: ID!, skill: String): [SkillAssessment!]!
    getUserAIAnalysis(userId: ID!): AIAnalysis
    
  }

  type UserProgressResponse {
    questionId: ID
    question: String
    answer: String
    isCorrect: Boolean
    timeDuration: Float
    timeAnswer: Float
    userName: String
    completed: Boolean
    score: Int
    explanation: String
    success: Boolean
  }

  type DeleteResponse {
    success: Boolean!
    message: String
  }

 
  type AnalysisResponse {
    success: Boolean!
    message: String!
    analysis: AIAnalysis
  }

  type Mutation {
    createUser(name: String!): AuthPayload!
    loginUser(name: String!): AuthPayload!
    
    addBook(title: String!, chapters: Int, author: String, categories: [String], content: String, image: [String], audio_url: [String]): Book!
    addContent(bookId: ID!, title: String, content: [String], audio_url: String): Chapter!
    updateBook(bookId: ID!, title: String, chapters: Int, author: String, categories: [String], content: String, image: [String], audio_url: [String]): Book!
    deleteBook(bookId: ID!): DeleteResponse!
    
    generateQuestions(chapter: String!): [String!]!
    generateQuestionsWithContent(content: String!, bookId: ID, chapterId: ID, difficulty: String, numberOfQuestions: Int): GeneratedQuestions!
    generateMCQQuestions(content: String!,   bookId: ID,  chapterId: ID, difficulty: String, numberOfQuestions: Int, answer: String, language: String): [Question!]!
    

    userProgress(userId: ID, bookId: ID, chapterId: ID, questionId: ID!, answer: String!, timeDuration: Int!, timeAnswer:Int!):UserProgressResponse
   


    
    createQuestion( title: String!, text: String!, type: String!, question: String!, option: QuestionOptionsInput, createdBy: ID!, assignedTo: ID):Question!

    transcribeAudio(userId: ID!, bookId: ID!, audioBase64: String!): Transcription!
    generateQuestionsFromText(title: String!, text: String!, maxQuestions: Int = 8): Question!
    
   
  
    
 
    submitAnswer(questionId: ID!, userAnswer: String!, selectedOption: String, metadata: AnswerMetadataInput): Answer!
    
   
    
   
    
    
    generateUserAnalysis(userId: ID!): AnalysisResponse!
    requestSkillAssessment(userId: ID!, skills: [String!]): AnalysisResponse!
    updateLearningGoals(userId: ID!, goals: [String!]!): Boolean!
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
`;
