import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../validators/match.validator';
import { User } from '../../models/user.model';
import { Box } from '../../models/box.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.initForm();
  }

  get f() { return this.signUpForm.controls; }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const name = this.signUpForm.get('nom').value;
    const boxs: Box[] = [];
    const newUser = new User(email, password, name, boxs);

    console.log('newUser.box = ' + newUser.boxs);
    this.authService.createNewUser(newUser).then(
      () => {
        console.log('newUser : ' + newUser.boxs);
        this.router.navigate(['/boxs']);
        this.snackbarService.open('Votre compte ' + email + ' a été créé', 'OK');
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
