import React from 'react'
import Header from '../Component/Header/Header'
import CreatePost from '../Component/CreatePost/CreatePost'

const createPost = () => {
  return (
    <>
        <Header />
        <CreatePost isPost={true}/>
    </>
  )
}

export default createPost