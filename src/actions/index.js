import jsonPlaceholder from "../apis/jsonPlaceholder"
import _ from 'lodash';


export const fetchUsersAndPosts =() => async (dispatch,getState) => {

    await dispatch(fetchPosts());
    // const uniqueUserIds = _.uniq(_.map(getState().posts,'userId'));
    // uniqueUserIds.forEach((userId)=>{
    //      dispatch(fetchUser(userId));
    // })

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
    
}


export const fetchPosts = ()=> async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({type:"FETCH_POSTS",payload:response.data});
}

export const fetchUser = userId => async dispatch =>{
    const response = await jsonPlaceholder.get(`/users/${userId}`);
    dispatch({type:"FETCH_USER",payload:response.data});
}


// export const fetchUser = (userId)=>  dispatch => {
//     _fetchUser(userId,dispatch);
// }

// const _fetchUser = _.memoize(async(userId,dispatch)=>{
//     const response = await jsonPlaceholder.get(`/users/${userId}`)
//     dispatch({type:"FETCH_USER",payload:response.data});
// });
