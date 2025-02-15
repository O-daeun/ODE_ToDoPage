import { useKanbanStore } from "@/store/use-kanban-store";
import { Task as TaskType } from "@/types/kanban";
import { FormEvent, useState } from "react";
import KebabMenu from "./kebab-menu";

interface Props {
  boardId: string;
  task: TaskType;
}

export default function Task({ boardId, task }: Props) {
  const { updateTask, removeTask } = useKanbanStore();

  const [isEditing, setIsEditing] = useState(false);
  const [taskContent, setTaskContent] = useState(task.content);

  const handleEdit = () => setIsEditing(true);
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateTask(boardId, task.id, taskContent);
    setIsEditing(false);
  };
  const handleRemove = () => {
    const isConfirmed = window.confirm("정말 이 할 일을 삭제하시겠습니까?");

    if (isConfirmed) {
      removeTask(boardId, task.id);
    }
  };

  return (
    <li
      className={`relative rounded-md border border-gray-300 bg-white py-3 ${isEditing ? "px-4" : "pl-4 pr-6"}`}
    >
      {isEditing ? (
        <form onSubmit={handleSave} className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            className="h-20 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <button
            onClick={handleSave}
            className="rounded-md bg-green-700 px-2 py-1 text-sm text-white hover:bg-green-600"
          >
            완료
          </button>
        </form>
      ) : (
        <>
          <div className="absolute right-2 top-[14px]">
            <KebabMenu
              type="할 일"
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          </div>
          <p className="whitespace-pre-wrap">{taskContent}</p>
        </>
      )}
    </li>
  );
}
