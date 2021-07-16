import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'UploadFileWebPartStrings';
import UploadFile from './components/UploadFile';
import { IUploadFileProps } from './components/IUploadFileProps';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";

export interface IUploadFileWebPartProps {
  list: string ; 
  description: string;
}
const options =[];
export default class UploadFileWebPart extends BaseClientSideWebPart<IUploadFileWebPartProps> {
  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
  
      // other init code may be present
  
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  
  
  public render(): void {
    sp.web.lists.filter("BaseTemplate eq 101").get().then(res =>{
    res.forEach(r=>options.push({key:r.Title,text:r.Title}) )
  })
    const element: React.ReactElement<IUploadFileProps > = React.createElement(
      UploadFile,
      {
        description:this.properties.description,
        list:this.properties.list,
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  public onCustomPropertyPaneFieldChanged(targetProperty: string, newValue: any) {
    const oldValue = this.properties[targetProperty];
    this.properties[targetProperty] = newValue;

    this.onPropertyPaneFieldChanged(targetProperty, oldValue, newValue);

    // NOTE: in local workbench onPropertyPaneFieldChanged method initiates re-render
    // in SharePoint environment we need to call re-render by ourselves
    if (Environment.type !== EnvironmentType.Local) {
      this.render();
    }
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
                }),
                PropertyPaneDropdown('list', {
                  label: 'choose the library you want to upload files ',
                  options: options,
                  
              })
              ]
            }
            
          ]
        }
      ]
    };
  }
}
