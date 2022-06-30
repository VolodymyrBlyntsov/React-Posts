import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    console.log(props);
    return (
        <div className='post'>
            <div className="post__content">
                <h4>{props.post.id}. {props.post.title}</h4>
                {props.post.body}
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.remove(props.post)}> Удалить </MyButton>
            </div>
        </div>
    )
}

export default PostItem;