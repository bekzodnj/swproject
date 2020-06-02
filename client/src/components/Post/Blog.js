import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';

function Blog({ match }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:1337/posts');

      setData(result.data);
    };

    fetchData();
  }, []);

  let newdate = '';
  if (data.length > 0) {
    data.map((el) => {
      var dateObj = new Date(el.created_at);
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      el.created_at = year + '/' + month + '/' + day;
    });
  }

  return (
    data.length > 0 && (
      <div>
        {data.map((item) => (
          <div className='card mb-3'>
            <div className='card-body'>
              <h3 className='card-title'>{item.title}</h3>
              <p className='card-subtitle mb-2 text-muted'>{item.created_at}</p>
              <h6 className='card-subtitle mb-2 text-muted'>{item.category}</h6>
              <div className='card-text'>
                <Markdown>{item.textBody.substring(0, 100) + '...'}</Markdown>
              </div>
              <a href='#' className='card-link'>
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

Blog.propTypes = {};

export default Blog;
