import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'SpFxAngular9WebPartStrings';

//import 'sp-fx-angular9/dist/SPFxAngular9/bundle';

import 'spfx-angular9/dist/SPFxAngular9/bundle';

require('../../../node_modules/spfx-angular9/dist/SPFxAngular9/styles.css')

export interface ISpFxAngular9WebPartProps {
  description: string;
}

export default class SpFxAngular9WebPart extends BaseClientSideWebPart<ISpFxAngular9WebPartProps> {

  public render(): void {
    const siteUrl = this.context.pageContext.web.absoluteUrl;
    this.domElement.innerHTML = `<app-sp-fx-angular9-web-part siteUrl="${siteUrl}"></app-sp-fx-angular9-web-part>`;
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
