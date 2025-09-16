"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, BookOpen, Plus, CheckCircle } from "lucide-react";

// GraphQL imports
import { AddBookDocument } from "../../../../graphql/generated";

type Book = {
  id: string;
  title: string;
  author: string;
  chapters: number;
  categories: string[];
  content: string[];
  image: string[];
  audio_url: string[];
};

export default function BookManager() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    chapters: 1,
    categories: [] as string[],
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [addBook] = useMutation(AddBookDocument);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCategory = () => {
    if (
      categoryInput.trim() &&
      !formData.categories.includes(categoryInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()],
      }));
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setErrorMessage("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await addBook({
        variables: {
          title: formData.title,
          content: formData.content,
          author: formData.author || "Unknown",
          chapters: formData.chapters,
          categories: formData.categories,
          image: [],
          audio_url: [],
        },
      });

      if (result.data?.addBook) {
        setSuccessMessage("Book created successfully!");
        setFormData({
          title: "",
          content: "",
          author: "",
          chapters: 1,
          categories: [],
        });
      }
    } catch (error) {
      console.error("Error creating book:", error);
      setErrorMessage("Failed to create book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6" />
          Book Manager
        </CardTitle>
        <p className="text-center text-gray-600">
          Add new books to your reading collection
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {successMessage && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {errorMessage && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Book Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter book title"
                required
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Enter author name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chapters">Number of Chapters</Label>
              <Input
                id="chapters"
                type="number"
                min="1"
                value={formData.chapters}
                onChange={(e) =>
                  handleInputChange("chapters", parseInt(e.target.value) || 1)
                }
              />
            </div>

            <div>
              <Label htmlFor="categories">Categories</Label>
              <div className="flex gap-2">
                <Input
                  id="categories"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  placeholder="Add category"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddCategory())
                  }
                />
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="content">Book Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Enter the book content here. This will be used to generate questions..."
              className="min-h-[200px]"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the full text content of the book. This will be
              automatically split into sentences and used to generate questions.
            </p>
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting || !formData.title.trim() || !formData.content.trim()
            }
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Book...
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5 mr-2" />
                Create Book
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
