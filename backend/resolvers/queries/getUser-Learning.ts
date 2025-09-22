import { AnswerModel } from "../../models/answer-model";

export const getUserLearningStats = async (
  _: unknown,
  args: { userId: string }
) => {
  try {
    const { userId } = args;

    const userAnswers = await AnswerModel.find({ userId })
      .populate("questionId")
      .sort({ createdAt: -1 });

    if (userAnswers.length === 0) {
      return {
        userId,
        totalAnswered: 0,
        correctAnswers: 0,
        overallAccuracy: 0,
        averageTime: 0,
        skillBreakdown: [],
        weeklyProgress: [],
        lastAnalysis: null,
      };
    }

    const totalAnswered = userAnswers.length;
    const correctAnswers = userAnswers.filter((a) => a.isCorrect).length;
    const overallAccuracy = (correctAnswers / totalAnswered) * 100;

    const timesSpent = userAnswers
      .map((a) => a.answerMetadata?.timeSpent || 0)
      .filter((t) => t > 0);
    const averageTime =
      timesSpent.length > 0
        ? timesSpent.reduce((sum, time) => sum + time, 0) / timesSpent.length
        : 0;

    // Skill breakdown
    const skillStats = userAnswers.reduce((acc, answer: any) => {
      const question = answer.questionId;
      if (!question?.questions) return acc;

      question.questions.forEach((q: any) => {
        const key = `${q.skill}:${q.subSkill}`;
        if (!acc[key]) {
          acc[key] = {
            skill: q.skill,
            subSkill: q.subSkill,
            totalQuestions: 0,
            correctAnswers: 0,
            scores: [],
          };
        }
        acc[key].totalQuestions++;
        if (answer.isCorrect) acc[key].correctAnswers++;
        acc[key].scores.push(answer.isCorrect ? 100 : 0);
      });
      return acc;
    }, {} as any);

    const skillBreakdown = Object.values(skillStats).map((stat: any) => ({
      skill: stat.skill,
      subSkill: stat.subSkill,
      totalQuestions: stat.totalQuestions,
      correctAnswers: stat.correctAnswers,
      accuracy: (stat.correctAnswers / stat.totalQuestions) * 100,
      averageScore:
        stat.scores.reduce((sum: number, score: number) => sum + score, 0) /
        stat.scores.length,
      trend: "Тогтвортой", // Энэ хэсгийг дараа нарийвчлан тооцоолно
    }));

    // Сүүлийн AI analysis
    const lastAnalysis =
      userAnswers.find((a) => a.aiAnalysis)?.aiAnalysis || null;

    return {
      userId,
      totalAnswered,
      correctAnswers,
      overallAccuracy,
      averageTime,
      skillBreakdown,
      weeklyProgress: [], // Энэ хэсгийг дараа нэмнэ
      lastAnalysis,
    };
  } catch (error: any) {
    console.error("getUserLearningStats error:", error);
    throw new Error(error.message || "Статистик авахад алдаа гарлаа");
  }
};
