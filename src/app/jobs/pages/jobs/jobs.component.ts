import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Job } from "../../../shared/models/jobs";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  add = faPlus;

  form: FormGroup = new FormGroup({
    searchString: new FormControl(""),
    partTime: new FormControl(false),
    fullTime: new FormControl(false),
    remote: new FormControl(false),
  });

  constructor(private store: Store) {
    this.store.pipe(select(fromJobs.selectFilter)).subscribe((filter) => {
      if (filter.length > 0) {
        this.form.patchValue({
          partTime: filter.includes(0),
          fullTime: filter.includes(1),
          remote: filter.includes(2),
        });
      }
    });
  }
  ngOnInit(): void {
    this.store.dispatch(jobsActions.getJobs());

    this.jobs$ = this.store.pipe(select(fromJobs.selectJobs));
    var error$ = this.store.pipe(select(fromJobs.selectError));
    error$.subscribe((err) => {
      if (err) {
        alert(err);
      }
    });

    this.form.get("searchString")?.valueChanges.subscribe((value) => {
      this.store.dispatch(jobsActions.searchJob({ text: value }));
    });
    this.form.get("partTime")?.valueChanges.subscribe((value) => {
      this.store.dispatch(
        jobsActions.filterJobs({ jobType: 0, isFilter: value })
      );
    });
    this.form.get("fullTime")?.valueChanges.subscribe((value) => {
      this.store.dispatch(
        jobsActions.filterJobs({ jobType: 1, isFilter: value })
      );
    });
    this.form.get("remote")?.valueChanges.subscribe((value) => {
      this.store.dispatch(
        jobsActions.filterJobs({ jobType: 2, isFilter: value })
      );
    });
  }

  onAdd(): void {
    // TODO: feel free to modify any files.
    // NOTE: Only maintain console.log that are useful in debugging
    console.log("Add button is pressed");
    this.store.dispatch(jobsActions.addJobForm({ isAdd: true }));
  }
  handleDetete(event: string) {
    this.store.dispatch(jobsActions.deteteJob({ id: event }));
  }
}
