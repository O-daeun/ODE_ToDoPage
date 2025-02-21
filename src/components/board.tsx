import { useKanbanStore } from "@/store/use-kanban-store";
import { Board as BoardType } from "@/types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormEvent, useState } from "react";
import AddTaskButton from "./add-task-button";
import KebabMenu from "./kebab-menu";
import TaskList from "./task-list";

interface Props {
  board: BoardType;
  isDraggingOverlay?: boolean;
  isOver?: boolean;
}

export default function Board({ board, isDraggingOverlay, isOver }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: {
      type: "board",
    },
  });

  const { updateBoardTitle, removeBoard } = useKanbanStore();
  const [isEditing, setIsEditing] = useState(false);
  const [boardName, setBoardName] = useState(board.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateBoardTitle(board.id, boardName);
    setIsEditing(false);
  };

  const handleRemove = () => {
    const isConfirmed = window.confirm(
      `정말 보드 "${boardName}"을 삭제하시겠습니까?`,
    );

    if (isConfirmed) {
      removeBoard(board.id);
    }
  };

  const style = {
    transform: isDraggingOverlay
      ? undefined
      : CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <article ref={isDraggingOverlay ? undefined : setNodeRef} className="grow">
      <div
        style={style}
        {...(isDraggingOverlay ? {} : { ...attributes, ...listeners })}
        className={`group relative flex h-fit w-80 shrink-0 flex-col gap-4 rounded-lg border border-gray-300 bg-gray-100 p-5 duration-200 hover:bg-[#e9f6ee] ${isOver ? "scale-105 transform border-green-500 shadow-lg" : ""} `}
      >
        <div className="flex items-center justify-between">
          <h2 className="ml-3 flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-700" />
            {isEditing ? (
              <form
                onPointerDown={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                className="flex w-full items-center gap-2"
              >
                <input
                  autoFocus
                  value={boardName}
                  maxLength={14}
                  onChange={(e) => setBoardName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-2 py-[3px] text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                />
                <button className="shrink-0 rounded-md bg-green-700 px-2 py-1 text-sm text-white hover:bg-green-600">
                  완료
                </button>
              </form>
            ) : (
              <span className="text-lg">{boardName}</span>
            )}
          </h2>
          <KebabMenu type="보드" onEdit={handleEdit} onRemove={handleRemove} />
        </div>
        <AddTaskButton boardId={board.id} />
        <TaskList boardId={board.id} tasks={board.tasks} isOverBoard={isOver} />
      </div>
    </article>
  );
}
