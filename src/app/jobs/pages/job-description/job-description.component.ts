import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Job } from "src/app/shared/models/jobs";
import { select, Store } from "@ngrx/store";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-job-description",
  templateUrl: "./job-description.component.html",
  styleUrls: ["./job-description.component.scss"],
})
export class JobDescriptionComponent implements OnInit {
  job$!: Observable<Job | null>;
  id: string | null = null;
  left = faArrowLeft;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.store.dispatch(jobsActions.getJobDetail({ id: this.id }));
    this.job$ = this.store.pipe(select(fromJobs.selectJob));
  }

  returnJobs() {
    this.router.navigate(["/jobs"]);
    this.store.dispatch(jobsActions.returnfilterJobs());
  }
}
