import { create } from "zustand";

type Store = {
  favouriteRepos: Array<GithubRepo>;
  addFavouriteRepo: (repo: GithubRepo) => void;
  removeFavouriteRepo: (repoId: GithubRepo["id"]) => void;
};

const useStore = create<Store>((set) => ({
  favouriteRepos: [],
  addFavouriteRepo: (repo) =>
    set((state) => ({
      favouriteRepos: [...state.favouriteRepos, repo],
    })),
  removeFavouriteRepo: (repoId) =>
    set((state) => ({
      favouriteRepos: state.favouriteRepos.filter(({ id }) => repoId !== id),
    })),
}));

export { useStore };
