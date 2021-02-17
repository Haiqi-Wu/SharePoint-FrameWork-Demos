import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import * as $ from 'jquery';
import 'bootstrap'
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'ExtensionApplicationCustomizerStrings';

const LOG_SOURCE: string = 'ExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top:string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IExtensionApplicationCustomizerProperties> {
    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }
    this._renderPlaceHolders();
    //Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }
  private _renderPlaceHolders(): void {
    
    this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', ');
  
    // Handling the top placeholder
    if (!this._topPlaceholder) {
  this._topPlaceholder =
    this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose });
  
  // The extension should not assume that the expected placeholder is available.
  if (!this._topPlaceholder) {
    console.error('The expected placeholder (Top) was not found.');
    return;
  }
  
  if (this.properties) {
    let topString: string = this.properties.Top;
    if (!topString) {
      topString = '(Top property was not defined.)';
    }
  
    if (this._topPlaceholder.domElement) {
      this._topPlaceholder.domElement.innerHTML = `
      <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-img="http://sp19/sites/Comm/SiteAssets/test.jpg">Click to toggle popover</button>
      `;
      this.test()
    }
  }
    }
  }
  test(){
    $('[data-toggle="popover"]').popover({
      html: true,
      trigger: 'click',
      placement: 'bottom',
      content: function(){return 'haha';}
    })
  }
  private _onDispose(): void {
    console.log('[BootstrapApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
