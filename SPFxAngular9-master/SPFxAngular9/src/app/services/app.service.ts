import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListItems } from '../models/listItems.model';
import { map, tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private BASE_URL = 'https://contoso.sharepoint.com';
  constructor(private httpClient: HttpClient) {
  }
  setAPIUrl(url: string) {
    this.BASE_URL = url || this.BASE_URL;
  }

  getListItems() {
    return this.httpClient.get<any>(`${this.BASE_URL}/_api/web/lists/getbytitle('test')/items?$select=Id,Title`).pipe(
      map(response => response.value as ListItems[])
    ).toPromise();
  }
}
