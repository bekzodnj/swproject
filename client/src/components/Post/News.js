import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/blogposts';

//DraftJs
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import ReactDOM from 'react-dom';
import { html } from 'htm/react';

const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: 'Initialized from content state.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '7joh4',
      text: 'Continue.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

const News = ({ blogpost, getAllPosts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const contentState = convertFromRaw(content);

  const [stated, setStated] = useState(contentState);

  if (blogpost.length !== 0) {
    console.log(blogpost[0].texBody);
    console.log(stated);
  }

  return (
    <section>
      <Link to='/' className='btn btn-primary pt-2'>
        Back to Main
      </Link>
      <div className='d-flex justify-content-between '>
        <h2 className='display-3 my-3'>News</h2>
      </div>
      {/* <Editor

        wrapperClassName='demo-wrapper'
        editorClassName='demo-editor'
        onEditorStateChange={onEditorStateChange}
      /> */}

      <div> {draftToHtml(convertToRaw(stated))}</div>
      <div>
        <div
          className='Container'
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(stated)),
          }}
        ></div>
      </div>

      {/* {blogpost.length !== 0 && (
        <div>
          <h1>TestOutput: </h1>
          <div> {draftToHtml(convertoRaw(blogpost[0].textBody))}</div>
        </div>
      )} */}

      {blogpost.length !== 0 &&
        blogpost.map((el, idx) => (
          <div className='card'>
            <h1 className='lead'>{el.title}</h1>
            <div></div>
          </div>
        ))}
    </section>
  );
};

const mapStateToProps = (state) => ({
  blogpost: state.blogpost,
});

export default connect(mapStateToProps, {
  getAllPosts,
})(News);
