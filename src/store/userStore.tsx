import create from 'zustand';

interface UserStore {
  username: string;
  setUsername: (name: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  username: '',
  setUsername: (name) => set(() => ({ username: name })),
}));
