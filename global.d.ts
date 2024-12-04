declare type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  description: string | null;
  html_url: string;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  private: boolean;
  archived: boolean;
  disabled: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  visibility: "public" | "private" | "internal";
};

declare type Organization = "perawallet" | "algorandfoundation" | "algorand";
