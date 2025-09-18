"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { CreateUserDocument } from "@/graphql/generated";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  // const [createUser, { loading }] = useMutation(CreateUserDocument);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    router.push("/question");

    if (!name.trim()) {
      setErrorMessage("Нэрээ оруулна уу.");
      return;
    }

    // try {
    //   const { data } = await createUser({
    //     variables: { name },
    //   });

    //   if (data?.createUser) {
    //     setSuccessMessage(`Амжилттай бүртгэгдлээ: ${data.createUser.name}`);
    //     setName(""); // input-г цэвэрлэнэ
    //   }
    // } catch (error: any) {
    //   console.error(error);
    //   setErrorMessage(error.message || "Алдаа гарлаа.");
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center">Бүртгүүлэх</h2>

      <div>
        <Label htmlFor="name">Нэр</Label>
        <Input
          id="name"
          type="text"
          placeholder="Нэрээ оруулна уу..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        // disabled={loading}
      >
        {/* {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" /> Илгээж байна...
          </>
        ) : (
          "Бүртгүүлэх"
        )} */}
      </Button>

      {successMessage && (
        <Alert className="flex items-center gap-2 text-green-800 bg-green-100">
          <CheckCircle className="w-5 h-5" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="flex items-center gap-2 text-red-800 bg-red-100">
          <XCircle className="w-5 h-5" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
