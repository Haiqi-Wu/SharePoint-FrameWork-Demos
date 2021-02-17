import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import styles from './ReadSpListItemsWebPart.module.scss';
import * as strings from 'ReadSpListItemsWebPartStrings';

export interface IReadSpListItemsWebPartProps {
  description: string;
}
export interface ISPLists {

  value: ISPList[];

}

export interface ISPList {

  Title: string;

  CustomerID: string;

  CustomerContactNo: string;
  look:{
    Title:string
    ID:number
  }

}
export default class ReadSpListItemsWebPart extends BaseClientSideWebPart<IReadSpListItemsWebPartProps> {
  private _getListData(): Promise<ISPLists> {

    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Customer')/Items?$select=Title,CustomerID,CustomerContactNo,look/Title,look/ID&$expand=look", SPHttpClient.configurations.v1)

      .then((response: SPHttpClientResponse) => {

        return response.json();

      });

  }
  private _renderListAsync(): void {



    if (Environment.type == EnvironmentType.SharePoint ||

      Environment.type == EnvironmentType.ClassicSharePoint) {

      this._getListData()

        .then((response) => {
          //console.log(response)
          this._renderList(response.value);

        });

    }

  }
  private _renderList(items: ISPList[]): void {
    //console.log(items)
    let html: string = '<table border=1 width=100% style="border-collapse: collapse;">';

    html += '<th>Customer Name</th> <th>Customer Code </th><th>Customer Contact Number</th>';

    items.forEach((item: ISPList) => {
      console.log(item.look["Title"])
      html += `

      <tr>            

          <td>${item.Title}</td>

          <td>${item.CustomerID}</td>

          <td>${item.CustomerContactNo}</td>
          
          <td>${item.look["Title"]}</td>
          <td>${item.look["ID"]}</td>

          </tr>

          `;
          //console.log(item)
    });

    html += '</table>';
    const listContainer: Element = this.domElement.querySelector('#spListContainer');

    listContainer.innerHTML = html;

  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.readSpListItems}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome to SharePoint!</span>
              <p class="${styles.subTitle}">Customize SharePoint experiences using Web Parts.</p>
              <p class="${styles.description}">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
        <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">

          <div>List Items</div>

          <br>

           <div id="spListContainer" />

        </div>
      </div>`;
    this._renderListAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
