import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'InjectCssApplicationCustomizerStrings';

const LOG_SOURCE: string = 'InjectCssApplicationCustomizer';


export interface IInjectCssApplicationCustomizerProperties {
  jsurl: string;
}

export default class InjectCssApplicationCustomizer
  extends BaseApplicationCustomizer<IInjectCssApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const jsurl: string = this.properties.jsurl;
    console.log(jsurl);
    if (jsurl) {
        // inject the style sheet
        const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
        let customJs:HTMLScriptElement = document.createElement("script");
        customJs.src=jsurl;
        head.insertAdjacentElement("beforeEnd", customJs);
        
    }

    return Promise.resolve();
  }
}
