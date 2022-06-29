import React from "react";

const PostItem = (props) => {
    console.log(props);
    return (
        <div className='post'>
            <div className="post__content">
                <h4>{props.number} {props.post.title}</h4>
                {props.post.body}
            </div>
            <div className="post__btns">
                <button>Удалить</button>
            </div>
        </div>
    )
}

export default PostItem;