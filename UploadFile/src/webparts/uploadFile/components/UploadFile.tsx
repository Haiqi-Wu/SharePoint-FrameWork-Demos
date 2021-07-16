import * as React from 'react';
import styles from './UploadFile.module.scss';
import { IUploadFileProps } from './IUploadFileProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/forms";
import "@pnp/sp/views";
import { IOpenWebByIdResult } from "@pnp/sp/sites";
export default class UploadFile extends React.Component<IUploadFileProps, {}> {

  state = {
    siteUrl: "",
    editformUrl: "",
    ServerRelativeUrl: "",
    defaultViewUrl: "",
    rootwebUrl: ""
  }
  public render(): React.ReactElement<IUploadFileProps> {
    console.log(1)

    return (
      <div>
        The file will be uploaded to <b>{this.props.list}</b>
        <div>
        
          <input type="file" name="myFile" id="newfile" className={styles.file}></input></div>
        <div>
          <button onClick={() => this.filesave()}>
            UploadFile
          </button></div>
      </div>
    );
  }
  componentDidMount() {
    sp.site.rootWeb.get().then(parentWeb => this.setState({ rootwebUrl: parentWeb.ResourcePath.DecodedUrl }))

    sp.web.get().then(res => {
      console.log("web", res)
      this.setState({ siteUrl: res.ResourcePath.DecodedUrl })
    })
    sp.web.lists.getByTitle(this.props.list).forms.filter("FormType eq 6").get().then(
      list => {

        this.setState({ editformUrl: list[0].ResourcePath.DecodedUrl })
      })
    sp.web.lists.getByTitle(this.props.list).defaultView.get().then(view => this.setState({ defaultViewUrl: view.ServerRelativeUrl }))
    sp.web.lists.getByTitle(this.props.list).rootFolder.get().then(r => this.setState({ ServerRelativeUrl: r.ServerRelativeUrl }))
  }
  componentWillReceiveProps(nextStatus) {
    console.log(nextStatus)
    sp.web.lists.getByTitle(nextStatus.list).forms.filter("FormType eq 6").get().then(
      list => {

        this.setState({ editformUrl: list[0].ResourcePath.DecodedUrl })
      })

    sp.web.lists.getByTitle(nextStatus.list).rootFolder.get().then(r => this.setState({ ServerRelativeUrl: r.ServerRelativeUrl }))
  }
  private filesave() {
    console.log("ServerRelativeUrl", this.state.ServerRelativeUrl)
    let myfile = (document.querySelector("#newfile") as HTMLInputElement).files[0];
    if (myfile.size <= 10485760) {
      sp.web.getFolderByServerRelativeUrl(`${this.state.ServerRelativeUrl}`).files.add(myfile.name, myfile, true).then(f => {
        console.log("File Uploaded");
        console.log(f)
        let fileServerRelativeUrl = f.data.ServerRelativeUrl;
        sp.web.getFileByUrl(fileServerRelativeUrl).listItemAllFields.get().then(res => {
          let site = this.state.rootwebUrl.split("/")[this.state.rootwebUrl.split("/").length - 1].toLocaleLowerCase();
          let index = this.state.defaultViewUrl.toLocaleLowerCase().indexOf(site);
          let _defaultViewUrl = ""
          if (index > 0) {

            _defaultViewUrl = this.state.defaultViewUrl.substring(index + site.length);
          }
          window.location.href = `${this.state.siteUrl}/${this.state.editformUrl}?id=${res.Id}&Mode=Upload&CheckInComment=&source=${this.state.rootwebUrl}${_defaultViewUrl}`
        }
        );

      });
    }
    else {
      sp.web.getFolderByServerRelativeUrl(`${this.state.ServerRelativeUrl}`)
        .files.addChunked(myfile.name, myfile)
        .then((file) => {
          console.log(file)
          let fileServerRelativeUrl = file.data.ServerRelativeUrl;
          sp.web.getFileByUrl(fileServerRelativeUrl).listItemAllFields.get().then(res => {
            let site = this.state.rootwebUrl.split("/")[this.state.rootwebUrl.split("/").length - 1].toLocaleLowerCase();
            let index = this.state.defaultViewUrl.toLocaleLowerCase().indexOf(site);
            let _defaultViewUrl = ""
            if (index > 0) {

              _defaultViewUrl = this.state.defaultViewUrl.substring(index + site.length);
            }
            window.location.href = `${this.state.siteUrl}/${this.state.editformUrl}?id=${res.Id}&Mode=Upload&CheckInComment=&source=${this.state.rootwebUrl}${_defaultViewUrl}`
          }
          );

        }
        ).then((item: any) => {
          console.log(item)
          console.log("File Uploaded");

        }).catch(console.log);
    }
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
