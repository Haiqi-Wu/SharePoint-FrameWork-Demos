import * as React from 'react';
import styles from './ReactEmptySpfx.module.scss';
import { IReactEmptySpfxProps } from './IReactEmptySpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
export default class ReactEmptySpfx extends React.Component<IReactEmptySpfxProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null
    };
    
  }
  submitContent = async () => {
    // Pressing ctrl + s when the editor has focus will execute this method
    // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
    const htmlContent = this.state.editorState.toHTML()
    //const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }
 
  public render(): React.ReactElement<IReactEmptySpfxProps> {
    const { editorState } = this.state
    return (
      <div className={ styles.reactEmptySpfx }>
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
          <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
          language={"en"}
        />
        </div>
      </div>
    );
  }
  async componentDidMount () {
    // Assume here to get the editor content in html format from the server
    //const htmlContent = await fetchEditorContent()
    // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })
  }
}
