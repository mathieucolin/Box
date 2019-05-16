import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { BoxsService } from '../services/boxs.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  users: User[];

  constructor(private usersService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.emitUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
