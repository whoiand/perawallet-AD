import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const organizations: Array<Organization> = [
  "algorand",
  "algorandfoundation",
  "perawallet",
];

const useGetRepositories = () => {
  const getRepoQueryUri = (organization: Organization) =>
    `https://api.github.com/orgs/${organization}/repos`;

  return useQueries({
    queries: organizations.map((organization) => ({
      queryKey: [organization],
      queryFn: () =>
        axios.get<Array<GithubRepo>>(getRepoQueryUri(organization)),
      staleTime: Infinity,
    })),
  });
};

export { useGetRepositories };
