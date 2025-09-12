import { model, models, Schema } from "mongoose"

type Answer = {
    _id:Schema.Types.ObjectId;
    bookId:Schema.Types.ObjectId;
    chapterId:Schema.Types.ObjectId;
    questionId:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    answer:string;
    isCorrect:Boolean;
    createdAt:Date;
    updatedAt:Date;
}

const AnswerSchema = new Schema<Answer> ({
    bookId:{type:Schema.Types.ObjectId, required:true, ref:'Book'},
    chapterId:{type:Schema.Types.ObjectId, required:true, ref:'Chapter'},
    questionId:{type:Schema.Types.ObjectId, required:true, ref:'Question'},
    userId:{type:Schema.Types.ObjectId, required:true, ref:'User'},
    answer:{type:String, required:true},
    isCorrect:{type:Boolean, required:true},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required:true},
}, {timestamps:true});

export const Answer = models.Answer || model<Answer>("Answer", AnswerSchema);


