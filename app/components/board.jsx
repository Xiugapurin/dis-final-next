"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import { Separator } from "@/components/ui/separator";
import { Award, Trophy, UsersRound } from "lucide-react";

const SCORE = [
  { group_id: "1", group_score: 1, group_name: "awards" },
  { group_id: "2", group_score: 2, group_name: "trophies" },
  { group_id: "3", group_score: 3, group_name: "users" },
  { group_id: "4", group_score: 4, group_name: "awards" },
  { group_id: "5", group_score: 5, group_name: "trophies" },
  { group_id: "6", group_score: 6, group_name: "users" },
  { group_id: "7", group_score: 7, group_name: "awards" },
  { group_id: "8", group_score: 8, group_name: "trophies" },
  { group_id: "9", group_score: 9, group_name: "users" },
  { group_id: "10", group_score: 10, group_name: "awards" },
  { group_id: "11", group_score: 11, group_name: "trophies" },
  { group_id: "12", group_score: 12, group_name: "users" },
  { group_id: "13", group_score: 13, group_name: "awards" },
  { group_id: "14", group_score: 14, group_name: "trophies" },
  { group_id: "15", group_score: 15, group_name: "users" },
  { group_id: "16", group_score: 16, group_name: "awards" },
  { group_id: "17", group_score: 17, group_name: "trophies" },
  { group_id: "18", group_score: 18, group_name: "users" },
  { group_id: "19", group_score: 19, group_name: "awards" },
  { group_id: "20", group_score: 20, group_name: "trophies" },
  { group_id: "21", group_score: 21, group_name: "users" },
  { group_id: "22", group_score: 22, group_name: "awards" },
  { group_id: "23", group_score: 23, group_name: "trophies" },
  { group_id: "24", group_score: 24, group_name: "users" },
  { group_id: "25", group_score: 25, group_name: "awards" },
  { group_id: "26", group_score: 26, group_name: "trophies" },
  { group_id: "27", group_score: 27, group_name: "users" },
  { group_id: "28", group_score: 28, group_name: "awards" },
  { group_id: "29", group_score: 29, group_name: "trophies" },
  { group_id: "30", group_score: 30, group_name: "users" },
];

export default function Board() {
  // const { user } = UserAuth();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/leaderboard`);
        const data = response.data;

        setScores(data);
      } catch (error) {
        console.error("獲取 Group List 時發生錯誤:", error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URI);

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
