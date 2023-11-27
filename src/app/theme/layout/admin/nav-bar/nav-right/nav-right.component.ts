// Angular import
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/demo/models/user.model';
import { AuthService } from 'src/app/demo/services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{


 // user: User = new User();
  authenticatedUser: any;
  constructor(public authService: AuthService, private actRoute: ActivatedRoute) {}
  


  logout() {
    this.authService.doLogout()
  }



  ngOnInit(): void {
  }


}

