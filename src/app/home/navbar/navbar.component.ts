import { Component } from '@angular/core';
import { JwtService, ResponseModel } from 'src/auth/jwtService';
import { AjaxService } from 'src/providers/ajax.service';
import { ErrorToast, Toast } from 'src/providers/common.service';
import { Client, Dashboard } from 'src/providers/constants';
import { iNavigation } from 'src/providers/iNavigation';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoading: boolean = false;
  isShowPassword: boolean = false;

  constructor (private http: AjaxService,
              private jwtService: JwtService,
              private nav:iNavigation) {

  }

  loginPopup() {
    $("#loginModal").modal("show");
  }

  UserLogin() {
    this.isLoading = true;
    let loginValue = {
      Password: null,
      Email: null,
      Mobile: null,
    };

    let userId: any = document.getElementById("EmailOrMobile");
    let password: any = document.getElementById("Password");

    if (!userId.value) {
      this.isLoading = false;
      return;
    }

    if (!password.value) {
      this.isLoading = false;
      return;
    }

    if (userId.value !== "" && password.value !== "") {
      if(userId.value.indexOf("@") !== -1) {
        loginValue.Email = userId.value;
      } else {
        loginValue.Mobile = userId.value;
      }

      loginValue.Password = password.value;
      this.http.login('authenticate', loginValue).then((result: ResponseModel) => {
        if (result.ResponseBody) {
          $("#loginModal").modal("hide");
          Toast("Please wait loading dashboard ...", 15);
          this.nav.navigate(Dashboard, null);
          // if(Data.UserTypeId == 1)
          // else
          //   this.nav.navigate("", null);
        } else {
          ErrorToast("Incorrect username or password. Please try again.");
        }
      }).catch(e => {
        this.isLoading = false;
      });
    }
  }

  showPassword() {
    document.getElementById('Password').setAttribute('type', 'text');
    this.isShowPassword = true;
  }

  hidePassword() {
    document.getElementById('Password').setAttribute('type', 'password');
    this.isShowPassword = false;
  }

}
