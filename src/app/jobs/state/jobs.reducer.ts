import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import { Job } from "../../shared/models/jobs";

import * as jobsActions from "./jobs.actions";

export interface State {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  isAdd: boolean;
  deletedJob: string | null;
  selectedJob: Job | null;
  filters: Array<number>;
  tempFilters: Array<number>;
}

const initialState: State = {
  jobs: [],
  loading: false,
  error: null,
  isAdd: false,
  deletedJob: null,
  selectedJob: null,
  filters: [],
  tempFilters: [],
};

const jobsReducer = createReducer<State>(
  initialState,
  on(jobsActions.getJobs, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedJob: null,
    isDeteteSucess: null,
  })),
  on(jobsActions.getJobsSuccess, (state, { jobs }) => ({
    ...state,
    loading: false,
    error: null,
    jobs,
  })),
  on(jobsActions.getJobsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.addJobForm, (state, { isAdd }) => {
    return {
      ...state,
      isAdd: isAdd,
    };
  }),
  on(jobsActions.addJobSuccess, (state, { job }) => {
    let jobs = state.jobs;
    if (state.filters.length === 0 || state.filters.includes(job.type)) {
      jobs = [...state.jobs, job];
    }
    return {
      ...state,
      jobs: jobs,
      isAdd: false,
    };
  }),
  on(jobsActions.addJobError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.searchJob, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(jobsActions.searchJobSuccess, (state, { jobs }) => {
    return {
      ...state,
      loading: false,
      error: null,
      jobs,
    };
  }),
  on(jobsActions.searchJobError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    jobs: [],
  })),
  on(jobsActions.getJobDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(jobsActions.getJobDetailSuccess, (state, { job }) => ({
    ...state,
    loading: false,
    error: null,
    selectedJob: job,
  })),
  on(jobsActions.getJobDetailError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.filterJobs, (state, { jobType, isFilter }) => {
    let filters = Array.from(state.filters);
    if (isFilter) {
      if (!filters.includes(jobType)) {
        filters.push(jobType);
      }
    } else {
      if (filters.includes(jobType)) {
        filters = filters.filter((f) => f !== jobType);
      }
    }
    return {
      ...state,
      loading: true,
      error: null,
      filters: filters,
    };
  }),
  on(jobsActions.filterJobsSuccess, (state, { jobs }) => {
    return {
      ...state,
      loading: false,
      error: null,
      jobs,
    };
  }),
  on(jobsActions.filterJobsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    jobs: [],
  })),
  on(jobsActions.deteteJob, (state, { id }) => {
    return {
      ...state,
      deletedJob: null,
      loading: false,
      error: null,
    };
  }),
  on(jobsActions.deteteJobSuccess, (state, { jobs, id }) => {
    return {
      ...state,
      deletedJob: id,
      loading: false,
      error: null,
      jobs,
    };
  }),
  on(jobsActions.deteteJobError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.returnfilterJobs, (state) => ({
    ...state,
    loading: false,
    tempFilters: state.filters,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return jobsReducer(state, action);
}

export const selectJobsState = createFeatureSelector<State>("jobsFeature");
export const selectJobs = createSelector(
  selectJobsState,
  (state) => state.jobs
);
export const selectAdd = createSelector(
  selectJobsState,
  (state) => state.isAdd
);
export const selectError = createSelector(
  selectJobsState,
  (state) => state.error
);

export const selectJob = createSelector(
  selectJobsState,
  (state) => state.selectedJob
);

export const selectDeletedJob = createSelector(
  selectJobsState,
  (state) => state.deletedJob
);

export const selectFilter = createSelector(
  selectJobsState,
  (state) => state.tempFilters
);
