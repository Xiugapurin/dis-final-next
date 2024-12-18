"use client";

import Image from "next/image";
import axios from "axios";
import Group from "./components/group";
import Board from "./components/board";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAuth } from "./context/AuthContext";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { user, googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("登入時發生錯誤：", error);
      console.log(error);
    }
  };

  return !user ? (
    <div className="flex flex-col w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center min-h-screen items-center justify-center">
      <div className="flex flex-col py-8 px-12 gap-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">登入</h1>
          <Separator />
        </div>

        <div className="flex flex-col min-w-60 gap-2">
          <h2>帳號</h2>
          <Input type="text" placeholder="輸入帳號名稱" />
        </div>
        <div className="flex flex-col min-w-60 gap-2">
          <h2>密碼</h2>
          <Input type="password" placeholder="輸入密碼" />
        </div>

        <Button>登入</Button>

        <div className="flex flex-row gap-4 items-center">
          <div className="h-[1px] bg-slate-600 w-full" />
          <p className="text-gray-600 text-sm font-bold whitespace-nowrap">或是</p>
          <div className="h-[1px] bg-slate-600 w-full" />
        </div>

        <Button onClick={handleGoogleSignIn} variant="secondary">
          <Image src="/google.png" width={24} height={24} alt="Google Sign In" />
          使用 Google 登入
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex flex-row">
      <div className="flex w-4/12">
        <Board />
      </div>

      <Separator orientation="v" />

      <div className="flex flex-col w-8/12 h-full">
        <Group />
      </div>
    </div>
  );
}
