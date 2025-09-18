"use client";

import React from "react";
import { User } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // App Router-д зориулсан useRouter

export default function Header() {
  const router = useRouter();

  const goToProfile = () => {
    router.push("/user/profile"); // ProfileEditor-ийн page-ийн path
  };

  const logout = () => {
    // Логик хэрэв token устгах шаардлагатай бол энд хийнэ
    router.push("/"); // Home page руу чиглүүлэх
  };

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-transparent shadow-sm">
      {/* Logo name */}
      <div className="text-xl font-bold tracking-wide text-gray-800">
        ECHO MIND
      </div>

      {/* Profile dropdown */}
      <Menu as="div" className="relative">
        <Menu.Button
          as={Button}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 flex items-center justify-center"
        >
          <User className="w-5 h-5" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={goToProfile} // энд дарвал profile page руу
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout} // энд дарвал home page руу
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
}
