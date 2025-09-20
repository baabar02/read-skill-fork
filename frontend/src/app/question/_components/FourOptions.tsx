// "use client";

// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// type Question = {
//   id: number;
//   text: string;
//   options: string[];
//   correctIndex: number;
// };

// const QUESTIONS: Question[] = [
//   {
//     id: 1,
//     text: "Монгол Улсын нийслэл аль вэ?",
//     options: ["Улаанбаатар", "Эрдэнэт", "Дархан", "Хархорин"],
//     correctIndex: 0,
//   },
//   {
//     id: 2,
//     text: "Нар ямар өнгөтэй вэ?",
//     options: ["Цэнхэр", "Шар", "Ногоон", "Хар"],
//     correctIndex: 1,
//   },
//   {
//     id: 3,
//     text: "Монгол бичгийн алдартай хүн хэн бэ?",
//     options: ["Гуталчин Чимэд", "Чингис хаан", "Сүхбаатар", "Жанлав"],
//     correctIndex: 1,
//   },
// ];

// export default function FourOptions() {

//   // const {data} =
//   const [selected, setSelected] = useState<Record<number, number | null>>(() => {
//     const init: Record<number, number | null> = {};
//     QUESTIONS.forEach((q) => (init[q.id] = null));
//     return init;
//   });

//   const [revealed, setRevealed] = useState<Record<number, boolean>>(() => {
//     const init: Record<number, boolean> = {};
//     QUESTIONS.forEach((q) => (init[q.id] = false));
//     return init;
//   });

//   const correctCount = QUESTIONS.reduce(
//     (acc, q) => (revealed[q.id] && selected[q.id] === q.correctIndex ? acc + 1 : acc),
//     0
//   );

//   function handleSelect(q: Question, optionIndex: number) {
//     if (revealed[q.id]) return;
//     setSelected((s) => ({ ...s, [q.id]: optionIndex }));
//     setRevealed((r) => ({ ...r, [q.id]: true }));
//   }

//   function optionClasses(q: Question, idx: number) {
//     const sel = selected[q.id];
//     const isRevealed = revealed[q.id];

//     let base =
//       "justify-between text-lg font-semibold rounded-2xl py-3 shadow-md hover:scale-105 transition-transform w-full flex px-5 ";

//     if (!isRevealed) {
//       base += "bg-blue-400 hover:bg-blue-100 border-2 border-blue-100 text-black";
//     } else {
//       if (idx === q.correctIndex) base += "bg-green-400 border-green-500 text-white";
//       else if (sel === idx && idx !== q.correctIndex) base += "bg-red-400 border-red-500 text-white line-through";
//       else base += "bg-yellow-50 border-yellow-200 text-black";
//     }

//     return base;
//   }

//   const batteryPercent = Math.round((correctCount / QUESTIONS.length) * 100);

//   return (
//     <Card className="max-w-3xl mx-auto p-4 space-y-6 bg-blue-400">
//       {/* Гарчиг */}
//       <h2 className="text-3xl font-extrabold text-center ">🔍 Асуулт & Хариулт </h2>

//       {/* Battery progress */}
//       <div className="w-full bg-gray-300 h-6 rounded-full overflow-hidden relative shadow-inner">
//         <div
//           className="h-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
//           style={{ width: `${batteryPercent}%` }}
//         ></div>
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm font-bold text-black">
//           {batteryPercent}%
//         </div>
//       </div>

//       {/* Асуултууд */}
//       {QUESTIONS.map((q) => (
//         <Card key={q.id} className="bg-blue-300 shadow-lg rounded-3xl border-2 border-blue-200">
//           <CardContent className="space-y-4 ">
//             <h3 className="text-xl font-bold ">
//               {q.id}. {q.text}
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
//               {q.options.map((opt, idx) => (
//                 <Button
//                   key={idx}
//                   className={optionClasses(q, idx)}
//                   onClick={() => handleSelect(q, idx)}
//                 >
//                   <span>{String.fromCharCode(65 + idx)}. {opt}</span>
//                   {revealed[q.id] && (
//                     <span className="ml-2 text-xl">
//                       {idx === q.correctIndex
//                         ? "✅"
//                         : selected[q.id] === idx
//                         ? "❌"
//                         : ""}
//                     </span>
//                   )}
//                 </Button>
//               ))}
//             </div>

//             {revealed[q.id] && (
//               <div
//                 className={`mt-1 text-md font-medium ${
//                   selected[q.id] === q.correctIndex ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {selected[q.id] === q.correctIndex
//                   ? "👍 сайн байна — зөв хариуллаа!"
//                   : `😅 Алдаатай: зөв хариулт — ${String.fromCharCode(
//                       65 + q.correctIndex
//                     )}. ${q.options[q.correctIndex]}`}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </Card>
//   );
// }

"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, BookOpen, Pencil, Trash } from "lucide-react";
import {
  useDeleteBookMutation,
  useGetBooksFromAddBookQuery,
  useUpdateBookMutation,
} from "../../../../graphql/generated";

export default function BookList() {
  const { data, loading, error, refetch } = useGetBooksFromAddBookQuery();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const handleEditClick = (bookId: string, currentTitle: string) => {
    setEditingBookId(bookId);
    setEditedTitle(currentTitle);
  };

  
  const handleUpdate = async (bookId: string) => {
    try {
      await updateBook({
        variables: {
          bookId,
          title: editedTitle,
        },
      });
      setEditingBookId(null);
      refetch();
    } catch (err) {
      console.error("📕 Update failed:", err);
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      const confirmDelete = confirm(
        "Та энэ номыг устгахдаа итгэлтэй байна уу?"
      );
      if (!confirmDelete) return;

      await deleteBook({
        variables: { bookId },
      });
      refetch(); // Refresh book list after deletion
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  // -----------------------------
  // UI States
  // -----------------------------
  if (loading) {
    return (
      <div className="text-center py-10">
        <Loader2 className="mx-auto animate-spin w-8 h-8 text-gray-600" />
        <p className="mt-4 text-gray-600">Номуудыг ачааллаж байна...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Номуудыг авахад алдаа гарлаа: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Бүх Номнууд
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.getBooks.map((book) => {
          const isEditing = editingBookId === book.id;

          return (
            <Card
              key={book.id}
              className="shadow hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4 flex flex-col items-start">
                {book.image?.[0] ? (
                  <img
                    src={book.image[0]}
                    alt={book.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* Title + Edit Field */}
                {isEditing ? (
                  <div className="w-full">
                    <input
                      className="border px-2 py-1 rounded w-full mb-2"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate(book.id)}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Хадгалах
                      </button>
                      <button
                        onClick={() => setEditingBookId(null)}
                        className="text-sm text-gray-500"
                      >
                        Цуцлах
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between w-full items-center mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {book.title}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(book.id, book.title)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Засах"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Устгах"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <p className="text-sm text-gray-600 mb-2">
                  Зохиолч: {book.author}
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {book.categories?.map((category: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {book.audio_url?.[0] && (
                  <audio controls src={book.audio_url[0]} className="w-full">
                    Таны браузер аудио тоглуулагчийг дэмждэггүй.
                  </audio>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
