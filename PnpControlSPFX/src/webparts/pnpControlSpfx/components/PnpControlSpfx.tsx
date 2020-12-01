import * as React from 'react';
import styles from './PnpControlSpfx.module.scss';
import { IPnpControlSpfxProps } from './IPnpControlSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IFramePanel } from "@pnp/spfx-controls-react/lib/IFramePanel";
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
export default class PnpControlSpfx extends React.Component<IPnpControlSpfxProps, any> {
  constructor(props){
    super(props);
    this.state={
      value:"",
      iFrameUrl:""
    }
  }
  
  public render(): React.ReactElement<IPnpControlSpfxProps> {
    
    return (
      <div className={ styles.pnpControlSpfx }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
        {/* <IFramePanel url={this.state.iFrameUrl}
        height={"500px"}
        isOpen={true}
              /> */}
               <IFrameDialog 
    url={this.state.iFrameUrl}
    hidden={false}
    width={'570px'}
    height={'315px'}/>
    <div className={styles.test}>
  </div>
       123
      </div>
      
    );
  }
 

  private onSelectedItem(data: { key: string; name: string }[]) {
    // for (const item of data) {
    //   console.log(`Item value: ${item.key}`);
    //   console.log(`Item text: ${item.name}`);
    // }
    console.log(this)
  }
  componentDidMount(){
    // var iFrameUrl=this.getQueryString("iframe");
    // console.log(iFrameUrl, 'iFrameUrl');
    // this.setState({iFrameUrl})
    var urlParams = new URLSearchParams(window.location.search);

    var urlParamstoString = urlParams.toString();
    
    var justUrl = window.location.href;

    var trimHref = justUrl.split('&')[0];

    var trimHref2 = trimHref.substring(trimHref.indexOf("=") + 1);
    
    var txtUrlParams = urlParams.toString();
    console.log(trimHref2);
    var trimtxtUrlParams = txtUrlParams.substring(3);
    this.setState({
      urlParams: trimHref2
    });
  }
  

  getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    console.log(reg, 'reg');
    var r = window.location.search.substr(1).match(reg); 
    console.log(r, 'r');
    if (r != null) return unescape(r[2]); return null; 
    } 
}
