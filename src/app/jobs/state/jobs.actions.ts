import { createAction, props } from "@ngrx/store";
import { Job, JobType } from "../../shared/models/jobs";

// Fetch all jobs
export const getJobs = createAction("[Jobs API] Get Jobs");
export const getJobsSuccess = createAction(
  "[Jobs API] Get Jobs Success",
  props<{ jobs: Job[] }>()
);
export const getJobsError = createAction(
  "[Jobs API] Get Jobs Error",
  props<{ error: string }>()
);

// Get job
export const getJobDetail = createAction(
  "[Jobs API] Get Job Detail",
  props<{ id: string | null }>()
);
export const getJobDetailSuccess = createAction(
  "[Jobs API] Get Job Detail Success",
  props<{ job: Job }>()
);
export const getJobDetailError = createAction(
  "[Jobs API] Get Job Detail Error",
  props<{ error: string }>()
);

// Adding Job Actions
export const addJobForm = createAction(
  "[Jobs API] Add Job Form",
  props<{ isAdd: boolean }>()
);
export const addJobLoad = createAction(
  "[Jobs API] Add Job Load",
  props<{ job: Job }>()
);
export const addJobSuccess = createAction(
  "[Jobs API] Add Job Success",
  props<{ job: Job }>()
);
export const addJobError = createAction(
  "[Jobs API] Add Job Error",
  props<{
    error: string;
  }>()
);

// Delete Job Actions
export const deteteJob = createAction(
  "[Jobs API] Detele Job",
  props<{ id: string }>()
);
export const deteteJobSuccess = createAction(
  "[Jobs API] Detele Job Success",
  props<{ jobs: Job[]; id: string }>()
);
export const deteteJobError = createAction(
  "[Jobs API] Detele Job Error",
  props<{
    error: string;
  }>()
);

export const searchJob = createAction(
  "[Jobs API] Search Job",
  props<{ text: string }>()
);

export const searchJobSuccess = createAction(
  "[Jobs API] Search Job Success",
  props<{ jobs: Job[] }>()
);
export const searchJobError = createAction(
  "[Jobs API] Search Job Error",
  props<{
    error: string;
  }>()
);
// Filter Jobs
export const filterJobs = createAction(
  "[Jobs API] Filter Jobs",
  props<{ jobType: JobType; isFilter: boolean }>()
);

// Filter Jobs
export const returnfilterJobs = createAction("[Jobs API] Return Filter Jobs");

export const filterJobsSuccess = createAction(
  "[Jobs API] Filter Jobs Success",
  props<{ jobs: Job[] }>()
);
export const filterJobsError = createAction(
  "[Jobs API] Filter Jobs Error",
  props<{
    error: string;
  }>()
);

// TODO: add additional actions for other CRUD operations
