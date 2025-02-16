import { Board, KanbanStore } from "@/types/kanban";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set, get) => ({
      boards: [],

      setBoards: (boards) => set({ boards }),

      addBoard: (title) => {
        const newBoard: Board = {
          id: crypto.randomUUID(),
          title,
          tasks: [],
        };
        set({ boards: [...get().boards, newBoard] });
      },

      removeBoard: (id) => {
        set({ boards: get().boards.filter((board) => board.id !== id) });
      },

      updateBoardTitle: (id, title) => {
        set({
          boards: get().boards.map((board) =>
            board.id === id ? { ...board, title } : board,
          ),
        });
      },

      addTask: (boardId, content) => {
        set({
          boards: get().boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: [{ id: crypto.randomUUID(), content }, ...board.tasks],
                }
              : board,
          ),
        });
      },

      removeTask: (boardId, taskId) => {
        set({
          boards: get().boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.filter((task) => task.id !== taskId),
                }
              : board,
          ),
        });
      },

      updateTask: (boardId, taskId, content) => {
        set({
          boards: get().boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.map((task) =>
                    task.id === taskId ? { ...task, content } : task,
                  ),
                }
              : board,
          ),
        });
      },
    }),
    {
      name: "kanban-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
