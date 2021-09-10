import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Job, JobType } from "../../../../shared/models/jobs";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"],
})
export class JobComponent implements OnInit {
  @Input() job: Job | null = null;

  JobType = JobType;

  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleDetete(id: string) {
    this.delete.emit(id);
  }
}
