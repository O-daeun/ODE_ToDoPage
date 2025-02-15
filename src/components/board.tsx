import AddTaskButton from "./add-task-button";
import KebabMenu from "./kebab-menu";
import TaskList from "./task-list";

export default function Board() {
  return (
    <article className="flex w-80 shrink-0 flex-col gap-4 rounded-lg border border-gray-300 bg-gray-100 p-5">
      <div className="flex items-center justify-between">
        <h2 className="ml-3 flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-700" />
          <span className="text-lg">보드이름</span>
        </h2>
        <KebabMenu />
      </div>
      <AddTaskButton />
      <TaskList />
    </article>
  );
}
