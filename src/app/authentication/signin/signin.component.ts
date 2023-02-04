import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;

  
  
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  userdata: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      // username: ["admin@software.com", Validators.required],
      // password: ["admin@123", Validators.required],

      username: this.username,
      password: this.password,
    });
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    debugger
    this.submitted = true;
    this.loading = true;
    this.error = "";
    const loginUser = {
      EmployeeId: this.authForm.value.username,
      Password: this.authForm.value.password
    }
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.subs.sink = this.authService
        .Login(loginUser) .subscribe(
          (res: any) => {
            this.userdata = res.LoginDetails;
            // if (res) {
            //   const token = this.authService.currentUserValue.token;
            //   console.log(token);
            //   if (token) {
            //     this.router.navigate(["/dashboard/dashboard1"]);
            //   }
            // } else {
            //   this.error = "Invalid Login";
            // }

            if (res.LoginDetails == null ) {
              this.toastr.error('invalid details', 'Error');
            }
            else if (res.LoginDetails !== null) {
              this.toastr.success(res.success, 'success');
              this.authForm.reset();
              // location.reload(false);
              this.router.navigate(["/dashboard/dashboard1"])
                .then(() => {
                  window.location.reload();
                });
              // this.router.navigate(['/profile']);
    
            }
            console.log(res);
          },
          // (error) => {
          //   this.error = error;
          //   this.submitted = false;
          //   this.loading = false;
          // }
        );
    }
  }
}
