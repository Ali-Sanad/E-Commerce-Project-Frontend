import { Component, OnInit, TemplateRef } from '@angular/core';
import { Profile } from '../profile';
// import {BsModalRef, BsModalService} from "ngx-bootstrap";
//import {AuthService} from "../../services/auth/auth.service";
import { ActivatedRoute } from '@angular/router';
//import {FileUploader} from "ng2-file-upload";
import { ProfilesService } from '../profiles.service';
import { AuthenticationService } from '../authentication-service.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfileComponent implements OnInit {
  profile;
  updatedProfile;
  snapShot;
  fakePassword: string;
  constructor(
    private _profileService: ProfilesService,
    private AuthenticationService: AuthenticationService
  ) {
    this.fakePassword = 'fakePassword';
  }

  ngOnInit() {
    if (this.AuthenticationService.currentUserValue.id) {
      this._profileService
        .getUserInfo(
          this.AuthenticationService.currentUserValue.id,
          this.AuthenticationService.currentUserValue.role
        )
        .subscribe((data) => {
          this.profile = data;
          this.updatedProfile = { ...data };
          this.updatedProfile.password = this.fakePassword;

          console.log(this.updatedProfile);
        });
    }
  }

  save() {
    // console.log(this.updatedProfile.password)
    const newProfile = { ...this.updatedProfile };
    this._profileService
      .updatedProfile(newProfile, this.fakePassword)
      .subscribe((data) => {
        console.log(data);
      });
  }

  reset(image) {
    console.log('REset');

    this.snapShot = { ...this.updatedProfile };
    this.updatedProfile = { ...this.profile };
    this.updatedProfile.password = this.fakePassword;
    image.src = `https://chocolate-store-api.herokuapp.com/uploads/userImages/${this.updatedProfile.image}`;
    console.log(this.snapShot);
  }
  snap(image) {
    this.updatedProfile = { ...this.snapShot };
    // image.src= `https://chocolate-store-api.herokuapp.com/uploads/productImages/${this.updatedProfile.image}`
    console.log(this.snapShot);
  }

  onFileSelect(event, image) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      // this.selectedFile = file.name;
      // this.formData.set('image', file);
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        let content = readerEvent.target.result;
        this.updatedProfile.file = file;
        this.updatedProfile.password = this.fakePassword;
        // console.log(this.registrationService.selectedUser.file);
        image.src = content;
        // profileImage.src =content;
      };
    }
  }

  done(image) {
    image.click();
  }

  onFocus() {
    this.updatedProfile.password = '';
  }
  onBlur() {
    if (
      this.updatedProfile.password == this.fakePassword ||
      this.updatedProfile.password == ''
    ) {
      this.updatedProfile.password = 'fakePassword';
    }
  }
}
