import React, { Component, Fragment } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class CreatePost extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    title: '',
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleClick = (current) => {
    console.log(current);
  };

  handleInputChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Fragment>
        <div>
          <div className='my-3'>
            <div className='display-4'>Create a new blog post:</div>
            <div className='w-50 my-3'>
              <label htmlFor='title'>1) Enter blog post title</label>
              <input
                type='text'
                name='title'
                placeholder='Enter blog post title'
                className='form-control'
                onChange={(e) => this.handleInputChange(e)}
              />
            </div>
          </div>
          <label htmlFor='title'>2) Enter blog post text here</label>
          <Editor
            editorState={editorState}
            wrapperClassName='demo-wrapper'
            editorClassName='demo-editor'
            onEditorStateChange={this.onEditorStateChange}
          />

          <h1>Output: </h1>
          <div>
            {' '}
            {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          </div>
          <button
            className='btn btn-primary my-2'
            onClick={() =>
              this.handleClick(convertToRaw(editorState.getCurrentContent()))
            }
          >
            Save
          </button>
        </div>
      </Fragment>
    );
  }
}
