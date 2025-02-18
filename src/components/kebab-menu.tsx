import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  type: "보드" | "할 일";
  onEdit: () => void;
  onRemove: () => void;
}

export default function KebabMenu({ type, onEdit, onRemove }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="relative flex items-center"
      ref={menuRef}
    >
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <EllipsisVertical className="size-5 stroke-gray-400" />
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 top-6 z-[999] overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg ${type === "보드" ? "w-[115px]" : "w-[93px]"}`}
        >
          <button
            onClick={onEdit}
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
          >
            {type} {type === "보드" && "이름"} 수정
          </button>
          <button
            onClick={onRemove}
            className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-100"
          >
            {type} 삭제
          </button>
        </div>
      )}
    </div>
  );
}
