import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Job, JobType } from "./shared/models/jobs";
import jobs from "./jobs/jobs.json";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  jobList: Job[] = [];
  tempList: Job[] = [];
  fitlers: Array<number> = [];
  constructor() {
    this.jobList = Array.from(jobs);
    this.tempList = Array.from(jobs);
  }

  getJobs(): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    return of(this.jobList);
  }
  saveJob(job: Job): Observable<Job> {
    // TODO: replace this one with an actual call to a API or json-server
    this.jobList = [...this.jobList, job];
    this.tempList = [...this.tempList, job];
    return of(job);
  }

  deleteJob(id: string): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    let list = this.jobList.filter((job) => job.id !== id);
    this.jobList = Array.from(list);
    let temp = this.tempList.filter((job) => job.id !== id);
    this.tempList = Array.from(temp);
    return of(this.jobList);
  }

  searchJob(text: string): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    if (text) {
      let list = this.jobList.filter((job) => {
        return job.company.includes(text) || job.title.includes(text);
      });
      return of(list);
    }

    return of(this.jobList);
  }
  fitlerJobs(jobType: JobType, isFilter: boolean): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    if (isFilter) {
      if (!this.fitlers.includes(jobType)) {
        this.fitlers.push(jobType);
      }
    } else {
      if (this.fitlers.includes(jobType)) {
        this.fitlers = this.fitlers.filter((f) => f !== jobType);
      }
    }
    this.jobList = this.tempList.filter(
      (job) => this.fitlers.length === 0 || this.fitlers.includes(job.type)
    );
    return of(this.jobList);
  }
  getJobDetail(id: string | null): Observable<Job> {
    // TODO: replace this one with an actual call to a API or json-server
    let job = this.jobList.find((job) => job.id === id);
    if (!job) {
      throw new Error("Job not found");
    }
    return of(job);
  }
}
