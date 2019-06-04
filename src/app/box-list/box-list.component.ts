import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoxsService } from '../services/boxs.service';
import { Box } from '../models/box.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit, OnDestroy {

  boxs: Box[];
  boxsAdmin: Box[];
  boxSubscription: Subscription;
  boxAdminSubscription: Subscription;
  mybool: boolean;
  arrayBoxs = [];
  arrayBoxsAdmin = [];

  constructor(private authService: AuthService, private boxsService: BoxsService, private router: Router,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
      this.boxAdminSubscription = this.boxsService.boxsAdminSubject.subscribe(
        (boxsAdmin: Box[]) => {
          this.boxsAdmin = boxsAdmin;
          console.log('boxsAdmin boxSubscription dans Boxlist = ' + this.boxsAdmin);
          this.arrayBoxsAdmin = Array.from(this.boxsAdmin);
        }
      );
      this.boxsService.emitBoxsAdmin();

      this.boxSubscription = this.boxsService.boxsSubject.subscribe(
        (boxs: Box[]) => {
          this.boxs = boxs;
          console.log('boxs boxSubscription dans Boxlist = ' + this.boxs);
          this.arrayBoxs = Array.from(this.boxs);
        }
      );
      this.boxsService.emitBoxs();
  }

  onAdmin(): boolean {
    this.mybool = this.authService.isAdmin();
    return this.authService.isAdmin();
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
