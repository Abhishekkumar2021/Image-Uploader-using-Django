import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState<File>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [prevewImage, setPreviewImage] = useState('');
  const [posts, setPosts] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/posts/', {
        title,
        content,
        image
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true   // This is required for the cookie to be sent
      }
    )
    .then(res => {
      // Get all posts
      console.log(res);
    }
    )
    .catch(err => {
      console.log(err);
    }
    );
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      // Get the url of the image
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(url);
    }
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts/',)
    .then(res => {
      console.log(res.data);
      setPosts(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [posts]);
    
  return (
    <div className="app">
      <div className='form'>
      <h1>Image Uploader</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <input type="file" accept='image/*' onChange={handleFile} placeholder="Image" />
        {/* Preview image */}
        <img className = "preview" src = {prevewImage} alt = "preview" />
        <button type="submit">Submit</button>
      </form>
      </div>

      <div className="all_posts">
        <h1>All posts</h1>
        <div className='posts'>
          {posts.map(post => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <img src={post.image} alt={post.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
