import { useKanbanStore } from "@/store/use-kanban-store";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";

interface Props {
  boardId: string;
}

export default function AddTaskButton({ boardId }: Props) {
  const { addTask } = useKanbanStore();

  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState("");

  const handleEdit = () => setIsEditing(true);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask(boardId, task);
    setTask("");
    setIsEditing(false);
  };

  return (
    <div onPointerDown={(e) => e.stopPropagation()}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="h-20 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
            placeholder="할 일을 입력하세요."
          />
          <button
            disabled={!task.trim()}
            className={`h-10 w-full rounded-md transition ${
              task.trim()
                ? "bg-green-700 text-white hover:bg-green-600"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            완료
          </button>
        </form>
      ) : (
        <button
          onClick={handleEdit}
          className="flex h-10 w-full items-center justify-center rounded-md border border-gray-300 bg-white"
        >
          <Plus className="size-5 stroke-green-700" />
        </button>
      )}
    </div>
  );
}
