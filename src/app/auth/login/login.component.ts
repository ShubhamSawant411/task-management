import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private appService: AppService,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let auth=false;
      this.appService.isAuthenticated(this.loginForm.value.username,this.loginForm.value.password)
      .pipe(
        tap(res=>{
          console.log(res);
          
          if(res){
            localStorage.setItem('auth',"token")
            localStorage.setItem('name',this.loginForm.value.username)
            
            this.router.navigate(['/home'])
          } 
          
        })
      )
      .subscribe();

      
      // let temp = this.appService.getUsers().pipe(tap(res=>console.log(res)
      // )).subscribe()
      // console.log(temp);
      
    }
  }
}
