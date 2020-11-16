import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactSpfxWebPartStrings';
import ReactSpfx from './components/ReactSpfx';
import { IReactSpfxProps } from './components/IReactSpfxProps';

export interface IReactSpfxWebPartProps {
  description: string;
  bgcolor:Array<any>;
  selectedColor:string;
}

export default class ReactSpfxWebPart extends BaseClientSideWebPart<IReactSpfxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactSpfxProps> = React.createElement(
      ReactSpfx,
      {
        description: this.properties.description,
        bgcolor:this.properties.bgcolor,
        selectedColor:this.properties.selectedColor
      }
    );
      console.log(this.properties.bgcolor)
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'BGcolor' && newValue) {
      this.properties.selectedColor=newValue;
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
      // re-render the web part as clearing the loading indicator removes the web part body
      this.render();      
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, oldValue);
    }
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
            
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  
                }),
                PropertyPaneDropdown('BGcolor', {
                  label:'BGcolor',
                  selectedKey:"red",
                  options: this.properties.bgcolor
                  
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
