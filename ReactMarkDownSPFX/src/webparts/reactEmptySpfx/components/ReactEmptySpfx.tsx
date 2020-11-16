import * as React from 'react';
import styles from './ReactEmptySpfx.module.scss';
import { IReactEmptySpfxProps } from './IReactEmptySpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import * as ReactMarkdown from 'react-markdown';
const MOCK_DATA = "content";
export default class ReactEmptySpfx extends React.Component<IReactEmptySpfxProps, any> {
  
  
  submitContent = async () => {
    // Pressing ctrl + s when the editor has focus will execute this method
    // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
    const htmlContent = this.state.editorState.toHTML()
    //const result = await saveEditorContent(htmlContent)
  }

  mdEditor?: MdEditor = undefined;

  mdParser: MarkdownIt;

  constructor(props: any) {
    super(props);
    this.renderHTML = this.renderHTML.bind(this);
    // initial a parser
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight(str, lang) {
        /*
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }
        return '' // use external default escaping
        */
      },
    });

    this.state = {
      value: MOCK_DATA,
    };
  }

  handleEditorChange = (it: { text: string; html: string }, event: any) => {
    // console.log('handleEditorChange', it.text, it.html, event);
    this.setState({
      value: it.text,
    });
  };

  handleImageUpload = (file: File): Promise<string> => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = data => {
        // @ts-ignore
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  onCustomImageUpload = (event: any): Promise<any> => {
    console.log('onCustomImageUpload', event);
    return new Promise((resolve, reject) => {
      const result = window.prompt('Please enter image url here...') as string;
      resolve({ url: result });
    
    });
  };

  handleGetMdValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getMdValue());
    }
  };

  handleGetHtmlValue = () => {
    if (this.mdEditor) {
      alert(this.mdEditor.getHtmlValue());
    }
  };

  handleSetValue = () => {
    const text = window.prompt('Content');
    this.setState({
      value: text,
    });
  };

  renderHTML(text: string) {
    // return this.mdParser.render(text);
    // Using react-markdown
    return React.createElement(ReactMarkdown, {
      source: text,
    });
  }

  
  public render(): React.ReactElement<IReactEmptySpfxProps> {
    const { editorState } = this.state;
    const mdParser = new MarkdownIt(/* Markdown-it options */);
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
          <MdEditor
            ref={node => (this.mdEditor = node || undefined)}
            value={this.state.value}
            style={{ height: '500px', width: '100%' }}
            renderHTML={this.renderHTML}
            
            config={{
              view: {
                menu: true,
                md: true,
                html: true,
                fullScreen: true,
                hideMenu: true,
              },
              table: {
                maxRow: 5,
                maxCol: 6,
              },
              imageUrl: 'https://octodex.github.com/images/minion.png',
              syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
            }}
            onChange={this.handleEditorChange}
            onImageUpload={this.handleImageUpload}
            onFocus={e => console.log('focus', e)}
            onBlur={e => console.log('blur', e)}
            // onCustomImageUpload={this.onCustomImageUpload}
          />
        </div>
        
      </div>
    );
  }
 
}
