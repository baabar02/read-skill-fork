"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGenerateQuestionsFromTextMutation } from "../../../../../../graphql/generated";

type FormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  title: z.string().nonempty("Өгүүллэгийн гарчигийг оруулна уу"),
  text: z.string().nonempty("Өгүүллэгээ оруулна уу"),
  maxQuestions: z
    .number()
    .min(1, "Хамгийн багадаа 1 асуулт байна")
    .max(8, "Хамгийн ихдээ 8 асуулт зохиогдоно")
    .optional(),
});

export const AddTopic = () => {
  const [generateQuestionsFromText] = useGenerateQuestionsFromTextMutation();

  const [questions, setQuestions] = useState<
    {
      question: string;
      // skill: string;
      // subSkill: string;
      option: {
        options: string[];
        explanation: string;
        correctAnswer: string;
      };
    }[]
  >([]);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
      maxQuestions: undefined,
    },
  });

  const onSubmit = async (values: FormType) => {
    try {
      const { data } = await generateQuestionsFromText({
        variables: {
          title: values.title,
          text: values.text,
          maxQuestions: values.maxQuestions,
        },
      });

      if (data?.generateQuestionsFromText?.questions) {
        setQuestions(data.generateQuestionsFromText.questions);
      }
    } catch (error) {
      console.error("Асуултууд авахад алдаа гарлаа:", error);
    }
  };

  return (
    <Card className="scroll-my-2.5">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField  
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Гарчиг</FormLabel>
                  <FormControl>
                    <Input placeholder="Гарчиг" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Өгүүллэг</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Өгүүллэг бичих хэсэг" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хамгийн их асуулт</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={8}
                      placeholder="1-8 хооронд тоо оруулна уу"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="flex items-end">
              Өгүүллэг нэмэх
            </Button>
          </form>
        </Form>

        {/* Асуултуудыг жагсаах хэсэг */}
        {questions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Асуултууд:</h2>
            <ul className="space-y-4">
              {questions.map((q, index) => (
                <li key={index} className="p-4 border rounded">
                  <p>
                    <strong>Асуулт:</strong> {q.question}
                  </p>
                  <p>{/* <strong>Чадвар:</strong> {q.skill} */}</p>
                  <p>{/* <strong>Дэд чадвар:</strong> {q.subSkill} */}</p>
                  <p>
                    <strong>Сонголтууд:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    {q.option.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Зөв хариулт:</strong> {q.option.correctAnswer}
                  </p>
                  <p>
                    <strong>Тайлбар:</strong> {q.option.explanation}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
