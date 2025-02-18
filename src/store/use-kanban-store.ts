import { Board, KanbanStore } from "@/types/kanban";
import { arrayMove } from "@dnd-kit/sortable";
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

      moveTask: (fromBoardId, toBoardId, taskId, overId) => {
        set((state) => {
          let newBoards = [...state.boards];
          let fromBoardIndex = newBoards.findIndex((b) => b.id === fromBoardId);
          let toBoardIndex = newBoards.findIndex((b) => b.id === toBoardId);

          if (fromBoardIndex === -1 || toBoardIndex === -1) return state;

          let fromBoard = newBoards[fromBoardIndex];
          let toBoard = newBoards[toBoardIndex];

          let oldIndex = fromBoard.tasks.findIndex((t) => t.id === taskId);
          if (oldIndex === -1) return state;

          let task = fromBoard.tasks[oldIndex];

          if (fromBoardId === toBoardId) {
            let newIndex = toBoard.tasks.findIndex((t) => t.id === overId);
            toBoard.tasks = arrayMove(toBoard.tasks, oldIndex, newIndex);
          } else {
            let newIndex = toBoard.tasks.findIndex((t) => t.id === overId);
            toBoard.tasks.splice(
              newIndex !== -1 ? newIndex : toBoard.tasks.length,
              0,
              task,
            );
          }

          return { boards: newBoards };
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
