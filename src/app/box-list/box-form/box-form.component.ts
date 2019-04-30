import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Box } from '../../models/box.model';
import { BoxsService } from '../../services/boxs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss']
})
export class BoxFormComponent implements OnInit {

  boxForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private boxsService: BoxsService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.boxForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern(/[0-9]{5,}/)]],
      etat: ''
    });
  }

  onSaveBox() {
    const nom = this.boxForm.get('nom').value;
    const adresse = this.boxForm.get('adresse').value;
    const ville = this.boxForm.get('ville').value;
    const codePostal = this.boxForm.get('codePostal').value;
    const etat = this.boxForm.get('etat').value;
    const newBox = new Box(nom, adresse);
    newBox.etat = etat;
    newBox.ville = ville;
    newBox.codePostal = codePostal;
    this.boxsService.createNewBox(newBox);
    this.router.navigate(['/boxs']);
  }
}
