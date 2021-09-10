import { Component, ElementRef, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Job } from "src/app/shared/models/jobs";
import * as jobsActions from "../../jobs/state/jobs.actions";
import * as fromJobs from "../../jobs/state/jobs.reducer";
import * as moment from "moment";
import { v4 as uuidv4 } from "uuid";
@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  modalRef: BsModalRef = new BsModalRef<any>();
  minDate: Date = new Date();
  jobForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    companyName: new FormControl("", [Validators.required]),
    jobType: new FormControl("1", [Validators.required]),
    startDate: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    logo: new FormControl(""),
    url: new FormControl("", [
      Validators.required,
      Validators.pattern(
        /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
      ),
    ]),
  });

  @ViewChild("btn") btn: ElementRef = new ElementRef(null);
  constructor(private store: Store, private modalService: BsModalService) {
    var isAdd$ = this.store.pipe(select(fromJobs.selectAdd));
    isAdd$.subscribe((isAdd) => {
      if (isAdd && this.btn.nativeElement) {
        this.btn.nativeElement.click();
        return;
      }
      if (!isAdd && this.modalRef) {
        this.jobForm.reset();
        this.modalRef.hide();
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  hideModal(event: any) {
    this.modalRef.hide();
    this.store.dispatch(jobsActions.addJobForm({ isAdd: false }));
  }
  onSubmit() {
    this.jobForm.markAllAsTouched();
    if (!this.jobForm.valid) {
      return;
    }
    if (!moment(this.jobForm.value.startDate).isValid()) {
      return;
    }
    const job: Job = {
      company: this.jobForm.value.companyName,
      title: this.jobForm.value.name,
      id: uuidv4(),
      link: this.jobForm.value.url,
      type: +this.jobForm.value.jobType,
      description: this.jobForm.value.description,
      logo: this.jobForm.value.logo
        ? this.jobForm.value.logo
        : "http://dummyimage.com/236x100.png/cc0000/ffffff",
      date: moment(this.jobForm.value.startDate, "MM/DD/YYYY").format(
        "MM/DD/YYYY"
      ),
    };
    this.store.dispatch(jobsActions.addJobLoad({ job: job }));
  }
}
