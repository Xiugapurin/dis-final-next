"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const GROUPS = [
  { group_id: 1, group_name: "A Team", created_time: "2024-11-01", member_count: 1, is_joined: false },
  { group_id: 2, group_name: "B Team", created_time: "2024-11-03", member_count: 1, is_joined: false },
  { group_id: 3, group_name: "C Team", created_time: "2024-11-01", member_count: 3, is_joined: false },
  { group_id: 4, group_name: "D Team", created_time: "2024-11-04", member_count: 5, is_joined: true },
  { group_id: 5, group_name: "E Team", created_time: "2024-11-05", member_count: 1, is_joined: false },
  { group_id: 6, group_name: "F Team", created_time: "2024-11-09", member_count: 2, is_joined: true },
  { group_id: 7, group_name: "G Team", created_time: "2024-11-10", member_count: 2, is_joined: false },
];

export default function Group() {
  // const { user } = UserAuth();
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [unjoinedGroups, setUnjoinedGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/paletters`, {
        //   headers: { Authorization: `Bearer ${user.accessToken}` },
        // });
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/groups/test`);
        const data = response.data;

        setGroups(data);
      } catch (error) {
        console.error("獲取 Group List 時發生錯誤:", error);
      }
    };

    fetchGroups();
  }, []);
  // }, [user.accessToken]);

  useEffect(() => {
    const joinedGroups = groups.filter((group) => group.is_joined);
    const unjoinedGroups = groups.filter((group) => !group.is_joined);

    setJoinedGroups(joinedGroups);
    setUnjoinedGroups(unjoinedGroups);
  }, [groups]);

  return (
    <div className="flex w-full flex-row h-screen p-6 gap-4">
      <div className="flex flex-col w-1/2 gap-4">
        <h1>已加入的組別</h1>
        <Separator />
        <div className="flex flex-col w-full gap-6">
          {joinedGroups &&
            joinedGroups.map((group) => {
              return (
                <Link
                  key={`joined-${group.group_id}`}
                  href={`/group/${group.group_id}`}
                  className="flex flex-row justify-between items-center w-full px-8 py-4 rounded-2xl shadow-lg"
                >
                  <div className="flex flex-col h-full items-start justify-between bg-slate-500">
                    <h2 className="text-sm font-bold">組別</h2>
                    <p className="text-lg">{group.group_name}</p>
                  </div>

                  <div className="flex flex-col items-center bg-green-400">
                    <h2 className="text-sm font-bold">成員人數</h2>
                    <p className="text-3xl">{group.member_count}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      <Separator orientation="v" />

      <div className="flex flex-col w-1/2 gap-4">
        <h1>其他組別</h1>
        <Separator />
        <div className="flex flex-col w-full gap-6">
          {unjoinedGroups &&
            unjoinedGroups.map((group) => {
              return (
                <Link
                  key={group.group_id}
                  href={`/group/${group.group_id}`}
                  className="flex flex-row justify-between items-center w-full px-8 py-4 rounded-2xl shadow-lg"
                >
                  <div className="flex flex-col h-full items-start justify-between bg-slate-500">
                    <h2 className="text-sm font-bold">組別</h2>
                    <p className="text-lg">{group.group_name}</p>
                  </div>

                  <div className="flex flex-col items-center bg-green-400">
                    <h2 className="text-sm font-bold">成員人數</h2>
                    <p className="text-3xl">{group.member_count}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
