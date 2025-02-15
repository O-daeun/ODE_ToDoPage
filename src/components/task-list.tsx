import { Task as TaskType } from "@/types/kanban";
import Task from "./task";

interface Props {
  boardId: string;
  tasks: TaskType[];
}

export default function TaskList({ boardId, tasks }: Props) {
  if (!tasks.length) return;
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <Task key={task.id} boardId={boardId} task={task} />
      ))}
    </ul>
  );
}
