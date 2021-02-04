import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NoframeworkSpfxWebPart.module.scss';
import * as strings from 'NoframeworkSpfxWebPartStrings';

export interface INoframeworkSpfxWebPartProps {
  description: string;
}

export default class NoframeworkSpfxWebPart extends BaseClientSideWebPart<INoframeworkSpfxWebPartProps> {

  public render(): void {

    this.domElement.innerHTML = `
      <div class="${styles.noframeworkSpfx}">
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
        <label>select date</label>
        <input type="date" id="date">
        <button type="button" id="submit">submit</button>
        <h1 id="h" style="color: red;"></h1>
        </div>`;

    var t = "test" + new Date()
    //     console.log(t)
    //     console.log(t[0])
    // var i =0;
    //   var myI = setInterval(()=>{

    //     console.log(t[i++])
    //      //this.domElement.txt.value=t[i++]

    //     document.getElementById("h").textContent+=t[i++]
    //       if(i>t.length){
    //         console.log(i)
    //           clearInterval(myI)
    //       }
    //   },120)
    this.domElement.querySelector('#submit').addEventListener('click', () => {

      myF()
    })
    function myF() {
      var value = document.getElementById("date")["value"];

      document.getElementById("h")["innerText"] = value;
    }
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
