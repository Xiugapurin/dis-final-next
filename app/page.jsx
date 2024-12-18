import Group from "./components/group";
import Board from "./components/board";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="flex w-4/12">
        <Board />
      </div>

      <Separator orientation="v" />

      <div className="flex flex-col w-8/12">
        <Group />
      </div>
    </div>
  );
}
