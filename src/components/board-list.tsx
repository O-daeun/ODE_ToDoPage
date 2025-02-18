"use client";

import { useKanbanStore } from "@/store/use-kanban-store";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import AddBoardButton from "./add-board-button";
import Board from "./board";
import Task from "./task";

export default function BoardList() {
  const { boards, setBoards, moveTask } = useKanbanStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<any>(null);
  const [overBoardId, setOverBoardId] = useState<string | null>(null);

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

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const isTask = active.data.current?.type === "task";
    if (isTask) {
      const overId = String(over.id);
      const overBoard = boards.find(
        (board) =>
          board.id === overId || board.tasks.some((task) => task.id === overId),
      );
      if (overBoard) {
        setOverBoardId(overBoard.id);
        const fromBoardId = active.data.current?.boardId;
        if (fromBoardId !== overBoard.id) {
          setOverBoardId(overBoard.id);
        }
      }
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) {
      setActiveId(null);
      setActiveData(null);
      setOverBoardId(null);
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
    setOverBoardId(null);
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
    } else if (activeData.type === "board") {
      const board = boards.find((b) => b.id === activeId);
      if (board) {
        return <Board board={board} isDraggingOverlay />;
      }
    }

    return null;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={(args) => {
        // Task를 드래그할 때
        if (activeData?.type === "task") {
          const pointerCollisions = pointerWithin(args);
          if (!pointerCollisions.length) return [];

          const boardId = getFirstCollision(pointerCollisions, "id");
          if (boardId) {
            return rectIntersection({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => {
                  return (
                    container.id === boardId ||
                    boards
                      .find((board) => board.id === boardId)
                      ?.tasks.some((task) => task.id === container.id)
                  );
                },
              ),
            });
          }
        }

        if (activeData?.type === "board") {
          return rectIntersection(args);
        }
        return closestCenter(args);
      }}
    >
      <SortableContext items={boards} strategy={horizontalListSortingStrategy}>
        <section className="flex w-max gap-5 p-10">
          {boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              isOver={overBoardId === board.id}
            />
          ))}
          <AddBoardButton />
        </section>
      </SortableContext>
      <DragOverlay>{renderDragOverlay()}</DragOverlay>
    </DndContext>
  );
}
