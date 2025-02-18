"use client";

import { useKanbanStore } from "@/store/use-kanban-store";
import {
  DndContext,
  DragEndEvent,
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
  const { boards, setBoards, moveTask } = useKanbanStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const activeTask = boards
      .flatMap((board) => board.tasks)
      .find((task) => task.id === active.id);

    if (activeTask) {
      // Task를 드래그한 경우
      const fromBoard = boards.find((board) =>
        board.tasks.some((task) => task.id === active.id),
      );
      const toBoard = boards.find(
        (board) =>
          board.id === over.id ||
          board.tasks.some((task) => task.id === over.id),
      );

      if (fromBoard && toBoard && fromBoard.id !== toBoard.id) {
        moveTask(fromBoard.id, toBoard.id, String(active.id), String(over.id));
      } else if (fromBoard && toBoard && fromBoard.id === toBoard.id) {
        // Same board, reorder task
        const newIndex = toBoard.tasks.findIndex((task) => task.id === over.id);
        fromBoard.tasks = arrayMove(
          fromBoard.tasks,
          fromBoard.tasks.indexOf(activeTask),
          newIndex,
        );
        setBoards([...boards]); // 상태 업데이트
      }
    } else {
      // Board를 드래그한 경우
      const oldIndex = boards.findIndex((b) => b.id === active.id);
      const newIndex = boards.findIndex((b) => b.id === over.id);
      setBoards(arrayMove(boards, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
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
