import Image from "next/image";
import GroupTable from "./components/group-table/page";
import LeaderBoard from "./components/leader-board/page";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="flex w-4/12">
        <LeaderBoard />
      </div>

      <Separator orientation="v" />

      <div className="flex flex-col w-8/12">
        <GroupTable />
      </div>
    </div>
  );
}
