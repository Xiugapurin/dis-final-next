"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Navigation, Plus, Star, UsersRound } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CreateGroupDialog = ({ setJoinedGroups, setOpen }) => {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const handleCreateGroup = async () => {
    if (groupName.trim() === "") {
      setError("請輸入組別名稱");
      return;
    }

    console.log(groupName);
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/group/0/user_001`, {
        group_name: groupName,
      });
      const newGroup = response.data.group;
      console.log("新組別:", response.data);

      setJoinedGroups((prev) => [...prev, newGroup]);
      setOpen(false);
      setGroupName("");
    } catch (error) {
      console.error("建立新組別時發生錯誤：", error);
      setError("創建組別失敗，請稍後再試");
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 py-4">
      <div className="flex flex-col gap-2 w-full font-bold">
        <div className="flex flex-row gap-2 items-center">
          <UsersRound />
          <div className="text-lg">組別名稱</div>
        </div>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="輸入組別名稱"
          className="text-lg w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        {error && <p className="text-md text-red-500">{error}</p>}
      </div>

      <Button onClick={handleCreateGroup} className="text-md font-bold">
        <Plus />
        創建組別
      </Button>
    </div>
  );
};

export default function GroupTable() {
  // const { user } = UserAuth();
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [unjoinedGroups, setUnjoinedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);

      try {
        // const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/paletters`, {
        //   headers: { Authorization: `Bearer ${user.accessToken}` },
        // });
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/groups/user_001`);
        const data = response.data;

        setGroups(data);
        setIsLoading(false);
      } catch (error) {
        console.error("獲取 Group List 時發生錯誤:", error);
      }
    };

    fetchGroups();
  }, [isLoading]);
  // }, [user.accessToken]);

  const handleJoinGroup = async (group_id) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/group/${group_id}/user_001`, {
        group_name: "",
      });
      const data = response.data.group;
      console.log(data);
      setJoinedGroups((prev) => [...prev, data]);
      setUnjoinedGroups((prev) => prev.filter((group) => group.group_id !== group_id));
    } catch (error) {
      console.error("加入 Group 時發生錯誤:", error);
    }
  };

  useEffect(() => {
    const joinedGroups = groups.filter((group) => group.is_joined);
    const unjoinedGroups = groups.filter((group) => !group.is_joined);

    setJoinedGroups(joinedGroups);
    setUnjoinedGroups(unjoinedGroups);
  }, [groups]);

  return (
    <div className="flex flex-col gap-4 h-screen p-6">
      <div className="flex flex-row-reverse w-full py-4 items-end">
        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-3xl font-bold">組別列表</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <div className="flex flow-row gap-2 text-white items-center bg-primary px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform">
                <Plus size={24} />
                <h1 className="font-bold">創建新組別</h1>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">創建新組別</DialogTitle>
              </DialogHeader>
              <CreateGroupDialog setJoinedGroups={setJoinedGroups} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Separator />

      <div className="flex w-full flex-row gap-4">
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex flow-row gap-2 items-center">
            <Star />
            <h1 className="text-xl font-bold">已加入的組別</h1>
          </div>

          <Separator />

          <div className="flex flex-col w-full gap-4 justify-between items-center p-2 max-h-[580px] overflow-y-auto">
            {joinedGroups.length > 0 ? (
              joinedGroups.map((group, index) => {
                return (
                  <motion.div
                    key={`joined-${group.group_id}`}
                    className="flex flex-row w-full gap-4"
                    initial={{ y: -50 + index * 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50 + index * 10, opacity: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <Link
                      className="flex flex-row w-full justify-between items-center p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform"
                      href={`/group/${group.group_id}`}
                    >
                      <div className="flex flex-col w-full items-start justify-between">
                        <div className="flex flex-row w-full gap-2 items-center">
                          <UsersRound size={16} />
                          <h2 className="text-sm">組別</h2>
                        </div>
                        <p className="text-lg font-bold">{group.group_name}</p>
                      </div>

                      <Separator orientation="v" />

                      <div className="flex flex-col w-1/3 ml-4 justify-between items-center">
                        <h2 className="text-sm font-bold">成員人數</h2>
                        <p className="text-3xl text-primary">{group.member_count}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div
                className="flex flex-col justify-between items-center gap-3 w-full bg-white p-4 rounded-xl shadow-md hover:cursor-pointer hover:scale-[1.02] transition-transform"
                key="create-group-button-1"
              >
                <h1 className="text-lg font-bold">你尚未加入任何組別！</h1>
                <Separator />
                <div className="flex flex-row gap-2 justify-between items-center">
                  <h1 className="text-lg">點選創建新組別，或是在右側選擇組別加入</h1>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator orientation="v" />

        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex flow-row gap-2 items-center">
            <Navigation />
            <h1 className="text-xl font-bold">其他組別</h1>
          </div>
          <Separator />
          <div className="flex flex-col w-full gap-4 justify-between items-center p-2 max-h-[580px] overflow-y-auto">
            {unjoinedGroups.length > 0
              ? unjoinedGroups.map((group) => {
                  return (
                    <motion.div
                      key={`unjoined-${group.group_id}`}
                      className="flex flex-row w-full gap-4"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <div className="flex flex-row justify-between items-center w-5/6 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform">
                        <div className="flex flex-col w-full h-full items-start justify-between">
                          <div className="flex flex-row gap-2 items-center">
                            <UsersRound size={16} />
                            <h2 className="text-sm">組別</h2>
                          </div>
                          <p className="text-lg font-bold">{group.group_name}</p>
                        </div>

                        <Separator orientation="v" />

                        <div className="flex flex-col w-1/3 ml-4 justify-between items-center">
                          <h2 className="text-sm font-bold">成員人數</h2>
                          <p className="text-3xl text-primary">{group.member_count}</p>
                        </div>
                      </div>
                      <div
                        className="flex flex-col w-1/6 h-full gap-1 justify-center items-center hover:cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleJoinGroup(group.group_id)}
                      >
                        <Plus />
                        <p className="text-md">加入</p>
                      </div>
                    </motion.div>
                  );
                })
              : Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={`skeleton-${index}`} className="w-full h-[100px] rounded-xl shadow-lg" />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}