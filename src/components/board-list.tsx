"use client";

import { useKanbanStore } from "@/store/use-kanban-store";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddBoardButton from "./add-board-button";
import Board from "./board";

export default function BoardList() {
  const { boards, setBoards } = useKanbanStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (e: any) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = boards.findIndex((b) => b.id === active.id);
    const newIndex = boards.findIndex((b) => b.id === over.id);

    setBoards(arrayMove(boards, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={boards} strategy={verticalListSortingStrategy}>
        <section className="flex w-max gap-5 p-10">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
          <AddBoardButton />
        </section>
      </SortableContext>
    </DndContext>
  );
}
