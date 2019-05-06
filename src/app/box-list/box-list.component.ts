import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoxsService } from '../services/boxs.service';
import { Box } from '../models/box.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit, OnDestroy {

  boxs: Box[];
  boxSubscription: Subscription;

  constructor(private boxsService: BoxsService, private router: Router, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.boxSubscription = this.boxsService.boxsSubject.subscribe(
      (boxs: Box[]) => {
        this.boxs = boxs;
      }
    );
    this.boxsService.emitBoxs();
  }

  onNewBox() {
    this.router.navigate(['/boxs', 'new']);
  }

  onDeleteBox(box: Box) {
    if (confirm('Etes vous sûr de supprimer ce Box ?')) {
      this.boxsService.removeBox(box);
      this.snackbarService.open(box.nom + ' supprimé', 'OK');
    } else {
      return null;
    }
  }

  onViewBox(id: number) {
    this.router.navigate(['/boxs', 'view', id]);
  }

  onSwitch(id: number) {
    if (this.boxs[id].etat === 'Ouvert') {
      this.boxsService.switchoffOne(id);
    } else if (this.boxs[id].etat === 'Fermé') {
      this.boxsService.swicthOnOne(id);
    }
  }
  ngOnDestroy() {
    this.boxSubscription.unsubscribe();
  }

}
