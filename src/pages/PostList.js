import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import { Grid } from '../elements';

const PostList = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  React.useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          if (p.user_info.user_id === user_info?.uid) {
            return (
              <Post
                key={p.id}
                {...p}
                is_me
                _onClick={() => {
                  history.push(`/PostDetail/${p.id}`);
                }}
              />
            );
          } else {
            return (
              <Post
                key={p.id}
                {...p}
                _onClick={() => {
                  history.push(`/PostDetail/${p.id}`);
                }}
              />
            );
          }
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};

export default PostList;
