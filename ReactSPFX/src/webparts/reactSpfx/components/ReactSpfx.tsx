import * as React from 'react';
import styles from './ReactSpfx.module.scss';
import { IReactSpfxProps } from './IReactSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactSpfx extends React.Component<IReactSpfxProps, any> {
  constructor(props){
    super(props);
    this.state={
      selectedColor:this.props.selectedColor
    }
  }
  public render(): React.ReactElement<IReactSpfxProps> {
    
    return (
      <div className={ styles.reactSpfx } >
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title } style={{color:this.props.selectedColor}}>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    console.log(this)
    console.log(this.props.selectedColor)
    console.log(this.state.selectedColor)
  }
}
