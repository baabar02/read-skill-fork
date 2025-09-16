"use client";

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
import { useAddBookMutation } from "../../../../../../graphql/generated";

type FormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  title: z.string().nonempty("Өгүүллэгийн гарчигийг оруулна уу"),
  context: z.string().nonempty("Өгүүллэгээ оруулна уу"),
});

export const AddTopic = () => {
  const [addBook] = useAddBookMutation();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      context: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    const { data } = await addBook({
      variables: {
        title: values.title,
        content: values.context,
      },
    });
    console.log(data?.addBook);
  };
  return (
    <Card>
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
              name="context"
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
            <Button className="flex items-end" type="submit">
              Өгүүллэг нэмэх
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
