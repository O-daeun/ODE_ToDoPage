import { useKanbanStore } from "@/store/use-kanban-store";
import { Task as TaskType } from "@/types/kanban";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./task";

interface Props {
  boardId: string;
  tasks: TaskType[];
}

export default function TaskList({ boardId, tasks }: Props) {
  const { moveTask } = useKanbanStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const fromBoardId = boardId;
    let toBoardId = boardId;

    if (!tasks.some((task) => task.id === overId)) {
      toBoardId = overId;
    }

    moveTask(fromBoardId, toBoardId, activeId, overId);
  };

  if (!tasks.length) return;
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul
          onPointerDown={(e) => e.stopPropagation()}
          className="flex flex-col gap-2"
        >
          {tasks.map((task) => (
            <Task key={task.id} boardId={boardId} task={task} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
