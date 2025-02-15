import { useState } from "react";
import AddTaskButton from "./add-task-button";
import KebabMenu from "./kebab-menu";
import TaskList from "./task-list";

export default function Board() {
  const [isEditing, setIsEditing] = useState(false);
  const [boardName, setBoardName] = useState("보드이름");

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

  return (
    <article className="flex w-80 shrink-0 flex-col gap-4 rounded-lg border border-gray-300 bg-gray-100 p-5">
      <div className="flex items-center justify-between">
        <h2 className="ml-3 flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-700" />
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="w-36 rounded-md border border-gray-300 px-2 py-[3px] text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              />
              <button
                onClick={handleSaveClick}
                className="rounded-md bg-green-700 px-2 py-1 text-sm text-white hover:bg-green-600"
              >
                완료
              </button>
            </div>
          ) : (
            <span className="text-lg">{boardName}</span>
          )}
        </h2>
        <KebabMenu type="보드" onEditClick={handleEditClick} />
      </div>
      <AddTaskButton />
      <TaskList />
    </article>
  );
}
