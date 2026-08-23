export interface Repository {
  id: string;
  name: string;
}

export type TaskCardPriority = "low" | "medium" | "high";
export type TaskCardStatus = "in-progress" | "pending" | "done";
export type TaskCardTimelineStepStatus = "done" | "in-progress" | "pending";

export interface TaskCardTimelineStep {
  id: string;
  label: "분석" | "설계" | "코딩/테스트" | "PR 생성";
  order: 1 | 2 | 3 | 4;
  status: TaskCardTimelineStepStatus;
  logMessage?: string;
  relativeTimeLabel?: string;
}

export interface TaskCardComment {
  id: string;
  content: string;
  createdAt: string;
}

export interface TaskCard {
  id: string;
  title: string;
  repositoryId: string;
  description: string;
  acceptanceCriteria: string[];
  priority: TaskCardPriority;
  status: TaskCardStatus;
  startedRelativeLabel?: string;
  timeline: TaskCardTimelineStep[];
  comments: TaskCardComment[];
}
