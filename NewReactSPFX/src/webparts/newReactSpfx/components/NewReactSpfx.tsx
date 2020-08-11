import * as React from 'react';
import styles from './NewReactSpfx.module.scss';
import { INewReactSpfxProps } from './INewReactSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web } from "sp-pnp-js";
import IAttachmentInfo from "sp-pnp-js";
export default class NewReactSpfx extends React.Component<INewReactSpfxProps, any> {
  public constructor(props) {
    super(props);
    this.state = {     
      fileInfos: null
    };
  }
  public render(): React.ReactElement<INewReactSpfxProps> {
    return (
      <div className={styles.newReactSpfx}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
            <input type="file" multiple={true} id="file" onChange={this.addFile.bind(this)} />
            <input type="button" value="submit" onClick={this.upload.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
  private addFile(event) {
    //let resultFile = document.getElementById('file');
    let resultFile = event.target.files;
    console.log(resultFile);
    let fileInfos = [];
    for (var i = 0; i < resultFile.length; i++) {
      var fileName = resultFile[i].name;
      console.log(fileName);
      var file = resultFile[i];
      var reader = new FileReader();
      reader.onload = (function(file) {
         return function(e) {
              //Push the converted file into array
               fileInfos.push({
                  "name": file.name,
                  "content": e.target.result
                  });
                }
         })(file);
      reader.readAsArrayBuffer(file);
    }
    this.setState({fileInfos});
    console.log(fileInfos)
  }
  private upload() {


    let {fileInfos}=this.state;

    
    console.log(this.props)
    let web = new Web(this.props.context.pageContext.web.absoluteUrl);
    web.lists.getByTitle("testn").items.getById(2).attachmentFiles.addMultiple(fileInfos);
  }
}
