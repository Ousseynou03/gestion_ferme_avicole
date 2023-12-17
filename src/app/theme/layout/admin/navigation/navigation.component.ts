// Angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/demo/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // public props
  @Output() NavCollapsedMob = new EventEmitter();
  navCollapsedMob = window.innerWidth;
  windowWidth: number;

  constructor(public authService : AuthService){}

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
