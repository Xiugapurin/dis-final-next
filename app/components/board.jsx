"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import { Separator } from "@/components/ui/separator";
import { Award, Trophy, UsersRound } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Board() {
  const { user, logOut } = UserAuth();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`https://flask-server-503510295785.asia-east1.run.app/api/leaderboard`);
        const data = response.data;

        setScores(data);
      } catch (error) {
        console.error("獲取 Group List 時發生錯誤:", error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI, { transports: ["websocket"] });

    socket.on("score_update", (data) => {
      console.log("Received score update:", data);

      setScores((prevScores) => {
        const existingIndex = prevScores.findIndex((score) => score.group_id === data.group_id);

        let updatedScores;
        if (existingIndex !== -1) {
          updatedScores = [...prevScores];
          updatedScores[existingIndex].group_score = data.group_score;
        } else {
          updatedScores = [...prevScores, data];
        }

        const topScores = updatedScores.sort((a, b) => b.group_score - a.group_score).slice(0, 20);

        return topScores;
      });
    });

    // 清理 Socket.IO 連線
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen p-6">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row w-full py-4 items-center gap-4">
          <Trophy size={32} className="text-primary" />
          <h1 className="text-3xl font-bold">即時排行榜</h1>
        </div>
        <Button onClick={handleSignOut}>登出</Button>
      </div>

      <Separator />

      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row py-2 items-center gap-3">
          <UsersRound size={16} />
          <h1 className="text-lg font-bold">組別</h1>
        </div>

        <div className="flex flex-row py-2 items-center gap-3">
          <h1 className="text-lg font-bold">分數</h1>
        </div>
      </div>

      <AnimatePresence>
        <div className="flex flex-col w-full overflow-y-auto">
          {scores.length > 0 ? (
            scores.map((score, index) => (
              <motion.div
                key={score.group_id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-row w-full justify-between items-center py-2 px-4 bg-white shadow-md rounded-md"
              >
                <div className="text-lg font-medium">{`${score.group_name}`}</div>
                <div className="text-lg font-bold text-primary">{score.group_score}</div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">尚無資料</p>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
