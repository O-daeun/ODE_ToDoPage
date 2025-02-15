import { Plus } from "lucide-react";

export default function AddTaskButton() {
  return (
    <button className="flex h-10 w-full items-center justify-center rounded-md border border-gray-300 bg-white">
      <Plus className="size-5 stroke-green-700" />
    </button>
  );
}
