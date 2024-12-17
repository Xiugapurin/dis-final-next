"use client";

import { useEffect, useState } from "react";
// import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Group({ params }) {
  const groupID = params.id;
  // const { user } = UserAuth();
  const [groupName, setGroupName] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/${paletterID}/${page}`, {
  //         headers: { Authorization: `Bearer ${user.accessToken}` },
  //       });
  //       const data = response.data;

  //       setPaletterName(data.paletter_name);
  //       if (page === 1) {
  //         setMessages(data.messages);
  //       } else {
  //         setMessages((prev) => [...prev, ...data.messages]);
  //       }
  //       setNextPage(data.next_page);
  //     } catch (error) {
  //       console.error("獲取聊天記錄時發生錯誤:", error);
  //     }
  //   };

  //   fetchMessages();
  // }, [user.accessToken, page]);

  const handleCreateGroup = async () => {
    if (input.trim() === "") return;

    const now = new Date();
    const utcPlus8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);

    const newMessage = {
      group_name: paletterID,
    };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/${paletterID}`,
        { group_name: groupName },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );

      const aiMessages = response.data.ai_messages;

      setMessages((prevMessages) => [...prevMessages, ...aiMessages]);
    } catch (error) {
      console.error("發送訊息時發生錯誤:", error);
    }
  };

  return (
    <div className="flex w-full flex-col h-screen p-6 gap-8">
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600" onClick={handleGoBack}>
          返回
        </button>
        <h1 className="text-black font-bold text-2xl">{`GROUP`}</h1>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        <button className="px-4 py-2 bg-gray-300 text-black rounded-lg" onClick={onLoadMore}>
          載入更多
        </button>
      </div>
    </div>
  );
}
