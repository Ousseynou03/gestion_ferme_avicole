// Angular import
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/demo/models/user.model';
import { AuthService } from 'src/app/demo/services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{


  currentUser: User = {
    id: 0,
    name: '',
    contactNumber: '',
    email: '',
    password: ''
  };

  constructor(public authService: AuthService,
    private actRoute: ActivatedRoute) { 
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.authService.getUserProfile(id, Headers).subscribe((res) => {
        this.currentUser = res.msg;
      });
    }


  logout() {
    this.authService.doLogout()
  }

  ngOnInit(): void {

  }

}

