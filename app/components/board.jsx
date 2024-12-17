"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Award, Trophy, UsersRound } from "lucide-react";

export default function Board() {
  // const { user } = UserAuth();

  return (
    <div className="flex flex-col gap-4 w-full h-screen p-6">
      <div className="flex flex-row w-full py-4 items-center gap-4">
        <Trophy size={32} className="text-primary" />
        <h1 className="text-3xl font-bold">即時排行榜</h1>
      </div>

      <Separator />

      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row py-2 items-center gap-3">
          <UsersRound size={16} />
          <h1 className="text-lg font-bold">組別</h1>
        </div>

        <div className="flex flex-row py-2 items-center gap-3">
          <Award size={16} />
          <h1 className="text-lg font-bold">分數</h1>
        </div>
      </div>

      <div className="flex flex-col w-full overflow-y-auto"></div>
    </div>
  );
}
