import { create } from "zustand";

type State = {
  isLogin: boolean;
};
type Action = {
  login: (isLogin: State["isLogin"]) => void;
  loginOut: (isLogin: State["isLogin"]) => void;
};

export const useLogin = create<State & Action>((set) => ({
  isLogin: false,
  login: () =>
    set((state: { isLogin: boolean }) => ({ isLogin: (state.isLogin = true) })),
  loginOut: () =>
    set((state: { isLogin: boolean }) => ({
      isLogin: (state.isLogin = false),
    })),
}));
