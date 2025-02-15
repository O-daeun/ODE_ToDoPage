"use client";

import AddBoardButton from "./add-board-button";
import Board from "./board";

export default function BoardList() {
  return (
    <section className="flex w-max gap-5 p-10">
      <Board />
      <Board />
      <AddBoardButton />
    </section>
  );
}
