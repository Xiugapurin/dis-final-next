"use client";

import { useEffect, useState } from "react";
// import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Award, Navigation, Pencil, Star, User, UsersRound } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { UserAuth } from "../context/AuthContext";

const USER_ID = "BejlL3LKgRgPHPy8nRr8b0OJlSg2";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleTimeString();
};

export default function Event({ backToGroupList, groupID, groupName }) {
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [hasUserPosts, setHasUserPosts] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroupInfo = async () => {
      setIsLoading(true);

      try {
        // const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/paletters`, {
        //   headers: { Authorization: `Bearer ${user.accessToken}` },
        // });
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/group/${groupID}/${USER_ID}`);
        const data = response.data;

        setPosts(data.posts);
        setScore(data.group_score);
        setMembers(data.members);
        setHasUserPosts(data.has_user_posts);
      } catch (error) {
        console.error("獲取 Group Info 時發生錯誤:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupInfo();
  }, []);

  const handleCreatePost = async () => {
    if (content.trim() === "") {
      setError("請輸入內容");
      return;
    }

    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/post/${groupID}/${USER_ID}`, {
        content: content.trim(),
      });
      const data = response.data;

      setPosts((prev) => [...prev, data.post]);
      setScore(data.score);
      setHasUserPosts(true);
    } catch (error) {
      console.error(error);
      setError("打卡失敗，請稍後再試");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-screen p-6">
      <div className="flex flex-row w-full py-4">
        <div className="flex flex-row justify-between items-center gap-4">
          <div
            className="flex h-full aspect-square justify-center items-center hover:cursor-pointer"
            onClick={backToGroupList}
          >
            <ArrowLeft size={32} />
          </div>
          <h1 className="text-3xl font-bold">{`${groupName} 活動進度`}</h1>
        </div>
      </div>

      <Separator />

      {isLoading ? (
        <Skeleton className="w-full h-24" />
      ) : (
        <div className="flex flex-row w-full gap-6">
          <div className="flex flex-col w-2/3 gap-6 h-full">
            {hasUserPosts ? (
              <h1 className="text-2xl font-bold text-primary">你已完成打卡！</h1>
            ) : (
              <div className="flex flex-row w-full gap-4 items-end">
                <div className="flex flex-col w-full gap-3">
                  <div className="flex flex-row gap-2 items-center">
                    <Pencil size={24} />
                    <h1 className="text-xl font-bold">創建你的貼文</h1>
                  </div>
                  <div className="flex flex-row w-full justify-between items-end gap-4">
                    <Textarea
                      className="flex w-full"
                      placeholder="說點什麼..."
                      id="post-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div
                      className="flex flex-col w-1/6 justify-center items-center gap-2 text-primary hover:cursor-pointer hover:scale-105 transition-transform"
                      onClick={handleCreatePost}
                    >
                      <Navigation size={32} />
                      <p className="text-lg font-bold">打卡</p>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              </div>
            )}

            <Separator />

            <div className="flex flex-row gap-3 items-center">
              <Star size={24} />
              <h1 className="text-xl font-bold">{`團隊打卡記錄 (${posts.length ? posts.length : 0}/${
                members.length
              })`}</h1>
            </div>
            <div className="flex flex-col w-full gap-6 p-2 overflow-y-auto">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post.post_id}
                    className="flex flex-col w-full bg-gradient-to-br bg-white p-4 gap-3 rounded-lg shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex flex-row w-full justify-between items-center">
                      <div className="flex flex-row gap-3 font-bold">
                        <User size={32} />
                        <h1 className="text-2xl">{post.user_name}</h1>
                      </div>
                      <p className="text-md font-bold">{formatDate(post.created_time)}</p>
                    </div>

                    <Separator className="bg-gray-600" />

                    <h2 className="text-md">{post.content}</h2>
                  </div>
                ))
              ) : (
                <div>目前沒有貼文</div>
              )}
            </div>
          </div>

          <Separator orientation="v" />

          <div className="flex flex-col w-1/3 h-full gap-6">
            <div className="flex flex-row gap-3 items-center">
              <Award size={24} />
              <h1 className="text-xl font-bold">團隊分數</h1>
            </div>

            <div className="flex w-full py-4 justify-center items-center">
              <h2 className="text-7xl text-primary font-serif">{score}</h2>
            </div>

            <Separator />

            <div className="flex flex-row gap-3 items-center">
              <UsersRound size={24} />
              <h1 className="text-xl font-bold">{`團隊成員 (${members.length})`}</h1>
            </div>

            <div className="flex flex-col w-full h-full gap-3 max-h-[400px] overflow-y-auto">
              {members.map((member) => (
                <div
                  key={member.user_id}
                  className={`flex flex-row w-full justify-between items-center ${
                    USER_ID == member.user_id && "text-primary"
                  }`}
                >
                  <div className="text-lg font-bold">{member.name}</div>
                  <div className="text-lg font-bold">
                    {member.last_post_time ? formatDate(member.last_post_time) : "尚未打卡"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
