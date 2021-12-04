export interface News {
  story_id: number;
  story_title: string;
  created_at: string;
  author: string;
  story_url: string | null;
}

export interface Options {
  label: string;
  value: string;
  icon: string;
}
