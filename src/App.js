import React, { useState, useEffect } from "react";
import PostService from "./API/PostService";
import { useFetching } from "./components/hooks/useFetching";
import { usePosts } from "./components/hooks/usePosts";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import Loader from "./components/UI/Loader/Loader";
import MyModal from "./components/UI/MyModal/MyModal";
import Pagination from "./components/UI/pagination/Pagination";
import MySelect from "./components/UI/select/MySelect";
import {getPageCount, getPagesArray} from "./components/UI/utils/pages"
import './styles/App.css'

function App(props) {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div>
        <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
          Add Post
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>

        <PostFilter filter={filter} setFilter={setFilter} />

        {postError &&
          <h1> Sorry, {postError} </h1>
        }

        {isPostsLoading 
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}> <Loader /> </div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts' /> }

        <Pagination page={page} changePage={changePage} totalPages={totalPages}/>  

        <br />
    </div>
  )
}

export default App;
