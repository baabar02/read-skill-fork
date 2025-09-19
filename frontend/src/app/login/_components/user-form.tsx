"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../../../graphql/generated";
import { useUser } from "@/app/providers/UserProvider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

export default function AuthForm() {
  const { setUser } = useUser();

  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [createUser] = useCreateUserMutation();
  const [login] = useLoginUserMutation();

  const handleRegister = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Нэрээ оруулна уу.");
      return;
    }

    try {
      const { data } = await createUser({ variables: { name } });
      if (!data?.createUser?.user) {
        setErrorMessage("Хэрэглэгч үүсгэхэд алдаа гарлаа.");
        return;
      }

      setSuccessMessage(`Амжилттай бүртгэгдлээ: ${data.createUser.user.name}`);
      setName("");
    } catch (error: any) {
      if (error.message?.includes("already exists")) {
        setErrorMessage("Ийм нэртэй хэрэглэгч аль хэдийн бүртгэлтэй байна.");
      } else {
        setErrorMessage(error.message || "Бүртгүүлэхэд алдаа гарлаа.");
      }
    }
  };

  const handleLogin = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Нэрээ оруулна уу.");
      return;
    }

    try {
      const { data } = await login({ variables: { name } });
      if (!data?.loginUser?.user) {
        setErrorMessage("Нэвтрэхэд алдаа гарлаа.");
        return;
      }
      console.log("loginData:", data.loginUser);
      setUser({
        id: data.loginUser.user.id,
        name: data.loginUser.user.name,
      });

      setSuccessMessage(`Амжилттай нэвтэрлээ: ${data.loginUser.user.name}`);
      setName("");
      router.push("/question");
      console.log(setUser, "setUser");
    } catch (error: any) {
      setErrorMessage(error.message || "Нэвтрэхэд алдаа гарлаа.");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-md mx-auto p-6 space-y-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center">Бүртгүүлэх / Нэвтрэх</h2>

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

      <div className="flex space-x-4">
        <Button
          type="button"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          onClick={handleRegister}
        >
          Бүртгүүлэх
        </Button>

        <Button
          type="button"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleLogin}
        >
          Нэвтрэх
        </Button>
      </div>

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
