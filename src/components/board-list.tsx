"use client";

import { useKanbanStore } from "@/store/use-kanban-store";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
import { act, useState } from "react";
import AddBoardButton from "./add-board-button";
import Board from "./board";
import Task from "./task";

export default function BoardList() {
  const { boards, setBoards, moveTask } = useKanbanStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(String(active.id));
    setActiveData(active.data.current);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) {
      setActiveId(null);
      setActiveData(null);
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);
    const isTask = active.data.current?.type === "task";

    if (isTask) {
      const fromBoardId = active.data.current?.boardId;
      const toBoardId = over.data.current?.boardId || overId;
      moveTask(fromBoardId, toBoardId, activeId, overId);
    } else {
      const oldIndex = boards.findIndex((b) => b.id === activeId);
      const newIndex = boards.findIndex((b) => b.id === overId);
      setBoards(arrayMove(boards, oldIndex, newIndex));
    }

    setActiveId(null);
    setActiveData(null);
  };

  const renderDragOverlay = () => {
    if (!activeId || !activeData) return null;

    if (activeData.type === "task") {
      const board = boards.find((b) => b.tasks.some((t) => t.id === activeId));
      const task = board?.tasks.find((t) => t.id === activeId);

      if (task && board) {
        return (
          <div className="w-[278px]">
            <Task boardId={board.id} task={task} isDraggingOverlay />
          </div>
        );
      }
    } else if (activeData.type === 'board') {
      const board = boards.find(b => b.id === activeId)
      if (board) {
        return <Board board={board} isDraggingOverlay />
      }
    }

    return null;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
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
      <DragOverlay>{renderDragOverlay()}</DragOverlay>
    </DndContext>
  );
}
