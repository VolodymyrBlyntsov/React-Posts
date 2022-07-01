import React, { useEffect, useState } from "react";
import PostService from "../../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../../components/UI/utils/pages";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import PostForm from "../PostForm";
import PostFilter from "../PostFilter";
import Loader from "../UI/Loader/Loader";
import PostList from "../PostList";
import Pagination from "../UI/pagination/Pagination";

function Posts(props) {
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

export default Posts;
