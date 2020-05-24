import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { getMyPosts, deletePost } from '../../actions/blogposts';

export const Posts = ({ blogpost, getMyPosts, deletePost }) => {
  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  const handleDelete = (id) => {
    // let res = confirm("Are you sure?");
    deletePost(id);
  };
  return (
    <section>
      <div className='d-flex justify-content-between '>
        <h2>My Posts</h2>
        <Link to='/create-post' className='btn btn-primary pt-2'>
          Create a new post
        </Link>
      </div>

      <table className='table table-hover table-striped mt-3'>
        <thead>
          <tr>
            <th scope='col'>Service</th>
            <th scope='col'>Subject</th>
            <th scope='col'>Category</th>
            <th scope='col'>Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogpost.length !== 0 &&
            blogpost.map((el, idx) => (
              <tr key={el._id}>
                <td>{idx}</td>
                <td>{el.title}</td>
                <td>Text</td>
                <td>Updated Date</td>
                <td>Is published:</td>
                <td>
                  <button className='btn btn-primary mr-2'>Edit</button>
                  <button
                    onClick={() => handleDelete(el._id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

const mapStateToProps = (state) => ({
  blogpost: state.blogpost,
});

export default connect(mapStateToProps, {
  getMyPosts,
})(Posts);
