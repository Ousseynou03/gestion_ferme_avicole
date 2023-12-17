// Angular import
import { Component, Output, EventEmitter } from '@angular/core';
import { SearchService } from 'src/app/demo/services/search.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent {

  searchTerm: string = '';


  // public props
  @Output() NavCollapsedMob = new EventEmitter();


  constructor(private searchService: SearchService) {}

  search() {
    // Mettez à jour le terme de recherche dans le service
    this.searchService.setSearchTerm(this.searchTerm);
  }

}
