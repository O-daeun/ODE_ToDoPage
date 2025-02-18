export type Task = {
  id: string;
  content: string;
};

export type Board = {
  id: string;
  title: string;
  tasks: Task[];
};

export type KanbanStore = {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  addBoard: (title: string) => void;
  removeBoard: (id: string) => void;
  updateBoardTitle: (id: string, title: string) => void;
  moveTask: (
    fromBoardId: string,
    toBoardId: string,
    taskId: string,
    overId: string,
  ) => void;
  addTask: (boardId: string, content: string) => void;
  removeTask: (boardId: string, taskId: string) => void;
  updateTask: (boardId: string, taskId: string, content: string) => void;
};
