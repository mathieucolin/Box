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
      etat: ''
    });
  }

  onSaveBox() {
    const nom = this.boxForm.get('nom').value;
    const adresse = this.boxForm.get('adresse').value;
    const etat = this.boxForm.get('etat').value;
    const newBox = new Box(nom, adresse);
    newBox.etat = etat;
    this.boxsService.createNewBox(newBox);
    this.router.navigate(['/boxs']);
  }
}
