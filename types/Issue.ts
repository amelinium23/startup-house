export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels?: Labels[] | null;
  state: string;
  locked: boolean;
  assignee?: null;
  assignees?: null[] | null;
  milestone?: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: null;
  author_association: string;
  active_lock_reason?: null;
  draft: boolean;
  pull_request: PullRequest | null;
  body: string;
  timeline_url: string;
  performed_via_github_app?: null;
  state_reason?: null;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Labels {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description?: string | null;
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at?: null;
}
