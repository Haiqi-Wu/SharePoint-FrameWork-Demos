import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './2019NoFrameworkWebPart.module.scss';
import * as strings from '2019NoFrameworkWebPartStrings';

export interface I2019NoFrameworkWebPartProps {
  description: string;
}

export default class NoFrameworkWebPart extends BaseClientSideWebPart<I2019NoFrameworkWebPartProps> {
  
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.NoFramework2019}">
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
        <input type="text" id="idTitle" name="Title" placeholder="Serial Number." value="test title"><br />  
        <input id="upload" type="file" /><br />  
    <button class="create-Button ${styles.button}" id="btnRegister" ><span class="${styles.label}">Submit Order</span></button>
      </div>`;
    this._setButtonEventHandlers();
    //this.upload();
  }
  private _setButtonEventHandlers(): void {

    this.domElement.querySelector('#btnRegister').addEventListener('click', async () => {
      
      var id = await this.createItem();
      let resultFile = document.getElementById('upload')["files"];
      var file = resultFile[0];
      var reader = new FileReader();
      
      var content;
      reader.onload = (function (file) {
        return function (e) {
      
        }
      })(file);
      reader.readAsArrayBuffer(file);
      this.upload(id,file["name"], file);
    });
  }

  protected upload(ID,name,file){
    console.log(name)
    const spOpts: ISPHttpClientOptions = {
      body:file,
      headers: {
        'Accept': 'application/json; odata=verbose',
        'Content-type': 'application/json;odata=verbose',       
      },
      
    };
    this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Developer Workbench')/items(${ID})/AttachmentFiles/add(FileName='${name}')`, SPHttpClient.configurations.v1, spOpts)
    .then(async (response: SPHttpClientResponse) => {
  
      //response.json() returns a promise so you get access to the json in the resolve callback.
     await response.json().then((responseJSON: JSON) => {
        console.log(responseJSON);
      });
    });
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


  protected async createItem() {
    var id;
    const spOpts: ISPHttpClientOptions = {
      body: JSON.stringify({
        "__metadata": {
          "type": "SP.Data.Developer_x0020_WorkbenchListItem"
        },
        "Title": `${document.getElementById('idTitle')["value"]} `
      }),
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': ''
      }
    };

    await this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Developer Workbench')/items`, SPHttpClient.configurations.v1, spOpts)
      .then( async (response: SPHttpClientResponse) => {
        // Access properties of the response object. 
        //console.log(`Status code: ${response.status}`);
        //console.log(`Status text: ${response.statusText}`);
        //console.log(response)
        //response.json() returns a promise so you get access to the json in the resolve callback.
         
         await response.json().then((responseJSON: JSON) => {
          //this.id = responseJSON["ID"];
          //console.log(responseJSON["ID"]);
           id=responseJSON["d"].ID;
          
        })

      });
       return id;
  }


}