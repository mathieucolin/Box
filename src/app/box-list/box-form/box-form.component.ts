import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Box } from '../../models/box.model';
import { BoxsService } from '../../services/boxs.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss']
})
export class BoxFormComponent implements OnInit {

  boxForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private boxsService: BoxsService, private router: Router,
              private snackBarService: SnackbarService) { }

  ngOnInit() {
    this.initForm();
  }



  initForm() {
    this.boxForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern(/^(?:[0-8]\d|9[0-8])\d{3}$/)]],
      etat: ['', Validators.required],
      taille: ['', Validators.required]
    });
  }

  get f() { return this.boxForm.controls ; }

  onSaveBox() {

    this.submitted = true;

    if (this.boxForm.invalid) {
      return;
    }

    this.snackBarService.error('Votre box a bien été créé');

    const nom = this.boxForm.get('nom').value;
    const adresse = this.boxForm.get('adresse').value;
    const ville = this.boxForm.get('ville').value;
    const codePostal = this.boxForm.get('codePostal').value;
    const etat = this.boxForm.get('etat').value;
    const taille = this.boxForm.get('taille').value;
    const newBox = new Box(nom, adresse, ville, codePostal, etat, taille);

    this.boxsService.createNewBox(newBox);
    this.router.navigate(['/boxs']);
  }
}
