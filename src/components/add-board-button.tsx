import { Plus } from "lucide-react";

export default function AddBoardButton() {
  return (
    <button className="flex h-[105px] w-80 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-100">
      <span className="text-lg">새 보드 추가하기</span>
      <Plus className="size-5 stroke-green-700" />
    </button>
  );
}
