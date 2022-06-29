import React, { useRef, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MySelect from "./components/UI/select/MySelect";
import './styles/App.css'

function App(props) {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'A: Description about JS'},
    {id: 2, title: 'Python', body: 'B: Description about Python'},
    {id: 3, title: 'C++', body: 'C: Description about C++'}
  ])

  const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div>
      <PostForm create={createPost} />
      
      <hr style={{margin: '15px 0'}} />
      <div>
          <MySelect 
              value={selectedSort}
              onChange={sortPosts}
              defaultValue='Сортировка по'
              options={[
                  {value: 'title', name: 'По названию'},
                  {value: 'body', name: 'По описанию'}
              ]} />
      </div>


      {
        posts.length !== 0
        ? <PostList remove={removePost} posts={posts} title='Список постов' />
        : <h1 style={{textAlign: 'center'}}>
              Постов не найдено!  
          </h1>
      }
    </div>
  )
}

export default App;
