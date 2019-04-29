import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoxsService } from '../services/boxs.service';
import { Box } from '../models/box.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit, OnDestroy {

  boxs: Box[];
  boxSubscription: Subscription;

  constructor(private boxsService: BoxsService, private router: Router) { }

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
    this.boxsService.removeBox(box);
  }

  onViewBox(id: number) {
    this.router.navigate(['/boxs', 'view', id]);
  }

  ngOnDestroy() {
    this.boxSubscription.unsubscribe();
  }

}
