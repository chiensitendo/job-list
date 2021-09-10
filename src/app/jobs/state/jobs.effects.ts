import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError, tap } from "rxjs/operators";

import { JobsService } from "../../jobs.service";
import * as fromJobs from "./jobs.actions";

@Injectable()
export class JobsEffects {
  getJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.getJobs),
      mergeMap(() =>
        this.jobsService.getJobs().pipe(
          map((jobs) => fromJobs.getJobsSuccess({ jobs })),
          catchError((error) => of(fromJobs.getJobsError({ error })))
        )
      )
    )
  );

  deleteJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.deteteJob),
      mergeMap((params) =>
        this.jobsService.deleteJob(params.id).pipe(
          map((jobs) =>
            fromJobs.deteteJobSuccess({ jobs: jobs, id: params.id })
          ),
          catchError((error) => of(fromJobs.deteteJobError({ error })))
        )
      )
    )
  );

  saveJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.addJobLoad),
      mergeMap((req) => {
        return this.jobsService.saveJob(req.job).pipe(
          map((job) => fromJobs.addJobSuccess({ job: job })),
          catchError((error) => of(fromJobs.addJobError({ error })))
        );
      })
    )
  );

  searchJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.searchJob),
      mergeMap((params) => {
        return this.jobsService.searchJob(params.text).pipe(
          map((jobs) => fromJobs.searchJobSuccess({ jobs })),
          catchError((error) => of(fromJobs.searchJobError({ error })))
        );
      })
    )
  );

  getJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.getJobDetail),
      mergeMap((params) =>
        this.jobsService.getJobDetail(params.id).pipe(
          map((job) => fromJobs.getJobDetailSuccess({ job })),
          catchError((error) => of(fromJobs.getJobDetailError({ error })))
        )
      )
    )
  );

  filterJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromJobs.filterJobs),
      mergeMap((params) => {
        return this.jobsService
          .fitlerJobs(params.jobType, params.isFilter)
          .pipe(
            map((jobs) => fromJobs.filterJobsSuccess({ jobs })),
            catchError((error) => of(fromJobs.filterJobsError({ error })))
          );
      })
    )
  );

  constructor(private actions$: Actions, private jobsService: JobsService) {}
}
