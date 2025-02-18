import { Task as TaskType } from "@/types/kanban";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./task";

interface Props {
  boardId: string;
  tasks: TaskType[];
  isOverBoard?: boolean;
}

export default function TaskList({ boardId, tasks, isOverBoard }: Props) {
  if (!tasks.length) return;
  return (
    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      <ul
        onPointerDown={(e) => e.stopPropagation()}
        className={`flex flex-col gap-2 transition-all duration-200 ${isOverBoard ? "gap-4" : "gap-2"} `}
        data-board-id={boardId}
      >
        {tasks.map((task) => (
          <Task key={task.id} boardId={boardId} task={task} />
        ))}
      </ul>
    </SortableContext>
  );
}
