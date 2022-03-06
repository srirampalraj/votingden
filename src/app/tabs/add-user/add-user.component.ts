import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PopupAuthComponent } from 'src/app/shared/components/popup-auth/popup-auth.component';

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  srcResult: any;
  maxSize = 0.5 * 2 ** 20;
  private basePath = '/uploads';
  saveFileData: any;
  downloadURL: any;
  downloadableURL = '';
  task: AngularFireUploadTask;
  progressValue: Observable<number>;
  eventPic: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: AngularFireStorage,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      aadhar: ['', Validators.required],
      epicid: ['', Validators.required],
      mobile: ['', Validators.required],
      photo: [
        undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)],
      ],
      photoURL: [null],
    });
  }

  eventPhoto(e) {
    this.eventPic = e;
  }

  log(log, photo) {
    this.openDialog();
    // this.onFileChanged(this.eventPic);
  }

  async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${this.addUserForm.value.epicid}.jpeg`;
      this.task = this.storage.upload(filePath, file); // upload task
      this.progressValue = this.task.percentageChanges();
      (await this.task).ref.getDownloadURL().then((url) => {
        this.downloadableURL = url;
        this.setData();
      });
    } else {
      alert('No images selected');
      this.downloadableURL = '';
    }
  }

  setData() {
    this.progressValue.subscribe((val) => {
      if (val === 100) {
        this.addUserForm.get('photoURL').setValue(this.downloadableURL);
        this.addUserForm.updateValueAndValidity();
        console.log(this.addUserForm);
        this.auth.setVoterData(this.addUserForm.value);
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupAuthComponent, {
      data: { from: 'agent' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
