import { Schema, model, Document, Types } from "mongoose";

interface QuestionOption {
  options: string[];    
  answer: string;    
  explanation?: string; 
}

export interface IQuestion extends Document {
  title: string;                
  text: string;                  
  type: "mcq" | "open";         
  question: string;             
  option?: QuestionOption;       
  createdBy: Types.ObjectId;   
  assignedTo?: Types.ObjectId;  
  createdAt?: Date;
  updatedAt?: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ["mcq", "open"], required: true },
    question: { type: String, required: true },
    option: {
        options: [{ type: String, required: true }],
        answer: { type: String, required: true },
        explanation: { type: String, required: false },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

export const QuestionModel =
  model<IQuestion>("QuestionAi", QuestionSchema);
