"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function LeaderBoard() {
  // const { user } = UserAuth();

  return (
    <div className="flex flex-col w-full h-screen bg-gray-200 p-6 gap-4">
      <h1>排行榜</h1>
    </div>
  );
}
