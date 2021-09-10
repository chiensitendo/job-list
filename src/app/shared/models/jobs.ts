export enum JobType {
  PartTime,
  FullTime,
  Remote,
}

export interface Job {
  id: string;
  title: string;
  logo: string;
  company: string;
  link: string;
  date: string;
  type: JobType;
  description?: string;
}
