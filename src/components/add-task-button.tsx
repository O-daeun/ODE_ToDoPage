import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddTaskButton() {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState("");

  const handleAddClick = () => setIsEditing(true);
  const handleCompleteClick = () => {
    console.log("할일 추가: ", task);
    setTask("");
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="h-20 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
            placeholder="할 일을 입력하세요."
          />
          <button
            onClick={handleCompleteClick}
            disabled={!task.trim()}
            className={`h-10 w-full rounded-md transition ${
              task.trim()
                ? "bg-green-700 text-white hover:bg-green-600"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            완료
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddClick}
          className="flex h-10 w-full items-center justify-center rounded-md border border-gray-300 bg-white"
        >
          <Plus className="size-5 stroke-green-700" />
        </button>
      )}
    </>
  );
}
