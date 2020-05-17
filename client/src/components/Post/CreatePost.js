import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const CreatePost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClick = (currentEditorText) => {
    const formData = {
      title,
      currentEditorText,
    };

    console.log(formData);
  };

  //const { editorState } = this.state;
  return (
    <Fragment>
      <div>
        <div className='my-3'>
          <div className='display-4'>Create a new blog post:</div>
          <div className='w-50 my-3'>
            <label htmlFor='title'>1) Enter blog post title</label>
            <input
              value={title}
              type='text'
              name='title'
              placeholder='Enter blog post title'
              className='form-control'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor='title'>2) Enter blog post text here</label>
        <Editor
          editorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onEditorStateChange={onEditorStateChange}
        />

        <h1>Output: </h1>
        <div> {draftToHtml(convertToRaw(editorState.getCurrentContent()))}</div>
        <button
          className='btn btn-primary my-2'
          onClick={() =>
            handleClick(convertToRaw(editorState.getCurrentContent()))
          }
        >
          Save
        </button>
      </div>
    </Fragment>
  );
};

export default CreatePost;
