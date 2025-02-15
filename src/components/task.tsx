import { useState } from "react";
import KebabMenu from "./kebab-menu";

export default function Task() {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState("테스크");

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

  return (
    <li
      className={`relative rounded-md border border-gray-300 bg-white py-3 ${isEditing ? "px-4" : "pl-4 pr-6"}`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="h-20 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <button
            onClick={handleSaveClick}
            className="rounded-md bg-green-700 px-2 py-1 text-sm text-white hover:bg-green-600"
          >
            완료
          </button>
        </div>
      ) : (
        <>
          <div className="absolute right-2 top-3">
            <KebabMenu type="할 일" onEditClick={handleEditClick} />
          </div>
          <p>{task}</p>
        </>
      )}
    </li>
  );
}
