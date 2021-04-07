import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ListItems } from '../models/listItems.model';
import { AppService } from '../services/app.service';
@Component({
  selector: 'app-sp-fx-angular9-web-part',
  templateUrl: './sp-fx-angular9-web-part.component.html',
  styleUrls: ['./sp-fx-angular9-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SpFxAngular9WebPartComponent implements OnInit {  

  @Input()
  public set siteurl(url: string) {
    this.appService.setAPIUrl(url);
  }

  listItems: ListItems[];
  
  constructor(private appService: AppService) {
  }

  ngOnInit() {

    this.appService.getListItems().then(listItems => this.listItems = listItems);
  }
}
