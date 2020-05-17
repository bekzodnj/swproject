import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class CreatePost extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleClick = (current) => {
    console.log(current);
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onEditorStateChange={this.onEditorStateChange}
        />

        <h1>Output: </h1>
        <div> {draftToHtml(convertToRaw(editorState.getCurrentContent()))}</div>
        <button
          className='btn btn-primary my-2'
          onClick={() =>
            this.handleClick(convertToRaw(editorState.getCurrentContent()))
          }
        >
          Save
        </button>
      </div>
    );
  }
}
