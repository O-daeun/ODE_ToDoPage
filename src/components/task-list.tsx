import Task from "./task";

export default function TaskList() {
  return (
    <ul className="flex flex-col gap-2">
      <Task />
      <Task />
    </ul>
  );
}
