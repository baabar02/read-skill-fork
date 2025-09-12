import { model, models, Schema } from "mongoose";

type UserProgress = {
    _id:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    bookId:Schema.Types.ObjectId;
    chapterId:Schema.Types.ObjectId;
    questionId:Schema.Types.ObjectId;
    answer:string;
    score:number;
    completed:Boolean;
    isCorrect:Boolean;
    timeDuration:Date;
    createdAt:Date;
    updatedAt:Date;
}

const UserProgressSchema = new Schema<UserProgress> ({
    userId:{type:Schema.Types.ObjectId, required:true, ref:'User'},
    bookId:{type:Schema.Types.ObjectId, required:true, ref:'Book'},
    chapterId:{type:Schema.Types.ObjectId, required:true, ref:'Chapter'},
    questionId:{type:Schema.Types.ObjectId, required:true, ref:'Question'},
    answer:{type:String, required:true},
    score:{type:Number, required:true, ref:'Score'},
    completed:{type:Boolean, required:true},
    isCorrect:{type:Boolean, required:true},
    timeDuration:{type:Date, required:true},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required:true},
}, {timestamps:true});  

export const UserProgress = models.UserProgress || model<UserProgress>("UserProgress", UserProgressSchema);