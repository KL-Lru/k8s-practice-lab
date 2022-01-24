export type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  deadline: string;
  finished_at: string;
}

export const initTask = () => ({
  id: '',
  project_id: '',
  title: '',
  description: '',
  deadline: '',
  finished_at: '',
});
