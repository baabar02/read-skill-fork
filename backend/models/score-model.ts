import { model, models, Schema } from "mongoose";

type Score = {
    _id:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    bookId:Schema.Types.ObjectId;
    chapterId:Schema.Types.ObjectId;
    questionId:Schema.Types.ObjectId;
    answer:string;
    score:number;
    totalQuestions:number;
    totalCorrect:number;
    totalIncorrect:number;
    totalSkipped:number;
    totalTime:number;
    totalScore:number;
    totalPercentage:number;
    isCorrect:Boolean;
    createdAt:Date;
    updatedAt:Date;
}

const ScoreSchema = new Schema<Score> ({
    userId:{type:Schema.Types.ObjectId, required:true, ref:'User'},
    bookId:{type:Schema.Types.ObjectId, required:true, ref:'Book'},
    chapterId:{type:Schema.Types.ObjectId, required:true, ref:'Chapter'},
    questionId:{type:Schema.Types.ObjectId, required:true, ref:'Question'},
    answer:{type:String, required:true},
    score:{type:Number, required:true},
    totalQuestions:{type:Number, required:false},
    totalCorrect:{type:Number, required:false},
    totalIncorrect:{type:Number, required:false},
    totalSkipped:{type:Number, required:false},
    totalTime:{type:Number, required:false},
    totalScore:{type:Number, required:false},
    totalPercentage:{type:Number, required:false},
    isCorrect:{type:Boolean, required:false},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required:true},
}, {timestamps:true});  

export const Score = models.Score || model<Score>("Score", ScoreSchema);