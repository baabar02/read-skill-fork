"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: "Төгөлдөр",
    age: 25,
    gender: "Хүү",
    image: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Saved profile:", profile);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <img
        src="/user-bg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Card className="relative w-full max-w-sm p-6 z-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4"
          onClick={() => router.push("/user")}
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </Button>

        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-black overflow-hidden">
              {profile.image ? (
                <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profile.name.charAt(0)
              )}
            </div>

            {editMode && (
              <label className="absolute bottom-0 right-0 cursor-pointer flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="w-full">
            <label className="block text-black mb-1">Нэр</label>
            {editMode ? (
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Нэр оруулна уу"
                className="bg-white/50 text-black"
              />
            ) : (
              <p className="text-lg font-semibold text-black">{profile.name}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-black mb-1">Нас</label>
            {editMode ? (
              <Input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                placeholder="Нас оруулна уу"
                className="bg-white/50 text-black"
              />
            ) : (
              <p className="text-black">{profile.age}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-black mb-1">Хүйс</label>
            {editMode ? (
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2 text-black">
                  <Input
                    type="radio"
                    name="gender"
                    value="Хүү"
                    checked={profile.gender === "Хүү"}
                    onChange={handleChange}
                  />
                  Хүү
                </label>
                <label className="flex items-center gap-2 text-black">
                  <Input
                    type="radio"
                    name="gender"
                    value="Охин"
                    checked={profile.gender === "Охин"}
                    onChange={handleChange}
                  />
                  Охин
                </label>
              </div>
            ) : (
              <p className="text-black">{profile.gender}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {editMode ? (
            <Button onClick={handleSave} variant="default">
              Хадгалах
            </Button>
          ) : (
            <Button onClick={() => setEditMode(true)} variant="default">
              Засах
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

