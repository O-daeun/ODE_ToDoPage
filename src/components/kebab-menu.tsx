import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function KebabMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-10 flex items-center" ref={menuRef}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <EllipsisVertical className="size-5 stroke-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-6 w-32 rounded-md border border-gray-300 bg-white shadow-lg">
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            보드 이름 수정
          </button>
          <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-100">
            보드 삭제
          </button>
        </div>
      )}
    </div>
  );
}
