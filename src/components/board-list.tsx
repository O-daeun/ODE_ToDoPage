"use client";

import { useKanbanStore } from "@/store/use-kanban-store";
import AddBoardButton from "./add-board-button";
import Board from "./board";

export default function BoardList() {
  const { boards } = useKanbanStore();
  console.log(boards);

  return (
    <section className="flex w-max gap-5 p-10">
      {boards.map((board) => (
        <Board key={board.id} board={board} />
      ))}
      <AddBoardButton />
    </section>
  );
}
