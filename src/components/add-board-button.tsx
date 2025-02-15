import { useKanbanStore } from "@/store/use-kanban-store";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";

export default function AddBoardButton() {
  const { addBoard } = useKanbanStore();

  const [isEditing, setIsEditing] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  const handleEdit = () => setIsEditing(true);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addBoard(boardTitle);
    setBoardTitle("");
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="flex w-80 shrink-0 flex-col gap-2"
        >
          <input
            autoFocus
            value={boardTitle}
            maxLength={14}
            onChange={(e) => setBoardTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-green-600"
            placeholder="새 보드 이름을 입력하세요."
          />
          <button
            disabled={!boardTitle.trim()}
            className={`h-10 w-full rounded-md transition ${
              boardTitle.trim()
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
          className="flex h-[105px] w-80 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-100"
        >
          <span className="text-lg">새 보드 추가하기</span>
          <Plus className="size-5 stroke-green-700" />
        </button>
      )}
    </>
  );
}
