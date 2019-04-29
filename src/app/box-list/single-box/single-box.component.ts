import { Component, OnInit } from '@angular/core';
import { Box } from '../../models/box.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxsService } from '../../services/boxs.service';

@Component({
  selector: 'app-single-box',
  templateUrl: './single-box.component.html',
  styleUrls: ['./single-box.component.scss']
})
export class SingleBoxComponent implements OnInit {

  box: Box;

  constructor(private route: ActivatedRoute, private boxsService: BoxsService, private router: Router) { }

  ngOnInit() {
    this.box = new Box('', '');
    /* tslint:disable:no-string-literal */
    const id = this.route.snapshot.params['id'];
    /* tslint:enable:no-string-literal */
    this.boxsService.getSingleBox(+id).then(
      (box: Box) => {
        this.box = box;
      }
    );
  }

  onBack() {
    this.router.navigate(['/boxs']);
  }

}
