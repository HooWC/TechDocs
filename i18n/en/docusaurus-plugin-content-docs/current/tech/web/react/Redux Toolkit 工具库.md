---
id: redux-toolkit-react
slug: /redux-toolkit-react
title: Redux Toolkit Plugins
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

# Redux Toolkit

Pinia like Vue

[**Redux Toolkit**](https://redux-toolkit.js.org/) (also known as **"RTK"**) is our officially recommended way of writing Redux logic.
[**Redux Toolkit Chinese official website**](https://cn.redux-toolkit.js.org/introduction/getting-started)
[**Redux Toolkit**](https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=38&amp;vd_source=98bed7c6ffbd4c5daae519aceb54cc51)
[**Video tutorials United States**](https://www.bilibili.com/video/BV1qK411D7Lo/) 



## Install

```
npm i @reduxjs/toolkit react-redux
```

`index.js` transfer store

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  	<App />
  </Provider>
);
```



## Example Chapter 1 (Simple and direct)

Create a `store` file in the root directory

Expose `store/index.js`

```js
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./modules/counterStore"
import channelReducer from "./modules/channelStore"

const store = configureStore({
	reducer:{
		counter: counterReducer,
		channel: channelReducer,
	}
})

export default store
```

`store/modules/counterStore.js` Writing Logic

```js
import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
	name: 'counter',
	
	// Initial state data
	initialState:{
		count: 0
	}
	
	// Modify the synchronization method of data
	reducers: {
		increment (state) {
			state.count++
		},
		decrement (state){
			state.count--
		},
		addToNum (state, action){
			state.count = action.payload
		},
	}
})

export const { increment, decrement, addToNum } = counterStore.actions
export default counterStore.reducer
```

`Front-end` use

```js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, addToNum } from './store/modules/counterStore'
import { fetchChannelList } from './store/modules/channelStore'

function App () {
	const { count } = useSelector(state => state.counter)
	const { channelList } = useSelector(state => state.channel)
	const dispatch = useDispatch()
	
	useEffect(() => {
		// Use useEffect to trigger asynchronous request execution
		dispatch(fetchChannelList())
	},[dispatch])
	
	return (
		<div className="App">
			<button onClick={() => dispatch(decrement())}>-</button>
			<span>{count}</span>
			<button onClick={() => dispatch(addToNum(10))}>add to 10</button>
			<button onClick={() => dispatch(addToNum(20))}>add to 20</button>
			<ul>
				{
					channelList.map(item => <li key={item.id}>{item.name}</li>)
				}
			</ul>
		</div>
	)
}
```

`store/modules/channelStore.js` Writing asynchronous data logic

```js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
    name: 'channel',
    initialState: {
        channelList: []
    },
    reducers: {
        setChannels(state, action) {
            state.channelList = action.payload;
        }
    }
});

const url = 'api-link';

export const fetchChannelList = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(url);
            dispatch(setChannels(res.data.data.channels));
        } catch (error) {
            // Handling Errors
            console.error("Error fetching channel list:", error);
        }
    };
};

export const { setChannels } = channelStore.actions;
export default channelStore.reducer;
```



## Example Chapter 2 (Logic)

Create `store` file

Expose `store/index.js`

```js
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./modules/counterStore"
import channelReducer from "./modules/channelStore"

const store = configureStore({
	reducer:{
		counter: counterReducer,
		channel: channelReducer,
	}
})

export default store
```

`store/modules/counterStore.js` Writing Logic

```js
import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
	name: 'counter',
	
	// Initial state data
	initialState:{
		count: 0
	}
	
	// Modify the synchronization method of data
	reducers: {
		increment (state) {
			state.count++
		},
		decrement (state){
			state.count--
		},
		addToNum (state, action){
			state.count = action.payload
		},
	}
})

export const { increment, decrement, addToNum } = counterStore.actions
export const selectAllCounter = (state) => state.counter
export default counterStore.reducer
```

`Front-end` use

```js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, addToNum, selectAllCounter } from './store/modules/counterStore'
import { fetchChannelList, selectAllChannel } from './store/modules/channelStore'

function App () {
	const { count } = useSelector(selectAllCounter)
	const { channelList } = useSelector(selectAllChannel)
	const dispatch = useDispatch()
	
	useEffect(() => {
		// Use useEffect to trigger asynchronous request execution
		dispatch(fetchChannelList())
	},[dispatch])
	
	return (
		<div className="App">
			<button onClick={() => dispatch(decrement())}>-</button>
			<span>{count}</span>
			<button onClick={() => dispatch(addToNum(10))}>add to 10</button>
			<button onClick={() => dispatch(addToNum(20))}>add to 20</button>
			<ul>
				{
					channelList.map(item => <li key={item.id}>{item.name}</li>)
				}
			</ul>
		</div>
	)
}
```

`store/modules/channelStore.js` Writing asynchronous data logic

```js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
    name: 'channel',
    initialState: {
        channelList: []
    },
    reducers: {
        setChannels(state, action) {
            state.channelList = action.payload;
        }
    }
});

const url = 'api-link';

export const fetchChannelList = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(url);
            dispatch(setChannels(res.data.data.channels));
        } catch (error) {
            // Handling Errors
            console.error("Error fetching channel list:", error);
        }
    };
};

export const { setChannels } = channelStore.actions;
export const selectAllChannel = (state) => state.channel
export default channelStore.reducer;
```



### nanoid

`nanoid` is a utility function for generating a unique identifier (UUID), which is usually used to generate a unique identifier for an action in Redux or to generate a unique key. In Redux Toolkit, the `nanoid` function can be imported from the `@reduxjs/toolkit` package.

```react
import { nanoid } from "@reduxjs/toolkit";

nanoid()
```



### Add data

Advanced writing methods `reducer` and `prepare`

`store/modules/postsStore.js` writes asynchronous data logic

```js
import { createSlice, nanoid } from "@reduxjs/toolkit"

const postsStore = createSlice({
	name:'posts',
	initialState: {
		list = []
	},
	reducers: {
		postAdded: {
			reducer(state, action){
    			state.list.push(action.payload)
			},
            prepare(title, content){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
         }
	}
})

export const { postAdded } = counterStore.actions
export const selectAllPosts = (state) => state.posts
export default postsStore.reducer
```

`Front-end` use

```js
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { postAdded } from "./postsStore"

function App () {
	const dispatch = useDispatch()
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
	
	const onSavePostCLicked = () => {
        if(title && content) {
            dispatch(postAdded(title, content))
            
            setTitle('')
            setContent('')
        }
    }
	
	return (
		<div className="App">
			<form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
            	<label htmlFor="postContent">Content:</label>
            	<textarea id="postContent" value={content} onChange={onContentChanged} />
            	<button type="button" onClick={onSavePostCLicked}>Save Post</button>
            </form>
		</div>
	)
}
```





# Axios (Api)

## createAsyncThunk

`store/modules/postsStore.js` Writing asynchronous data logic

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'api-link';

// Create Asynchronous action
export const fetchPostList = createAsyncThunk('post/fetchPostList',async () => {
        try {
            const res = await axios.get(url);
            return res.data.data.posts;
        } catch (error) {
            // Handling Errors
            // console.error("Error fetching post list:", error);
            // throw error;
            return error.message
        }
    }
);

const postsStore = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle', // Adding asynchronous state management
        error: null
    },
    reducers: {
        postAdded(state, action) {
            state.posts.push(action.payload);
        }
    },
    extraReducers: (builder) => {
	    builder
	        .addCase(fetchPostList.pending, (state) => {
	            state.status = 'loading';
	        })
	        .addCase(fetchPostList.fulfilled, (state, action) => {
	            state.status = 'succeeded';
	            state.posts.push(action.payload);
	        })
	        .addCase(fetchPostList.rejected, (state, action) => {
	            state.status = 'failed';
	            state.error = action.error.message;
	        });
	}
});

export const { postAdded } = postsStore.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export default postsStore.reducer;
```

### Two ways of writing

#### Writing method 1

```js
extraReducers: (builder) => {
    builder
        .addCase(fetchPostList.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPostList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts.push(action.payload);
        })
        .addCase(fetchPostList.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
}
```

#### Writing 2

```js
extraReducers: {
    [fetchPostList.pending]: (state) => {
        state.status = 'loading';
    },
    [fetchPostList.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
    },
    [fetchPostList.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    }
}
```

`Front end`

```js
import { selectAllPosts, getPostsStatus, getPostsError, fetchPostList } from './postsStore'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import PostsExcerpt from "./PostsExcerpt"

function App(){
    
    const dispatch = useDispatch()
	const posts = useSelector(selectAllPosts);
	const postStatus = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);
	
	useEffect(() => {
	    if(postStatus === 'idle'){
	        dispatch(fetchPostList())
	    }
	},[postsStatus,dispatch])
    
    let content;
    if(postStatus === 'loading'){
        content = <p>"Loading..."</p>
    }else if(postStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    }else if(postStatus === 'failed'){
        content = <p>{error}</p>
    }
    
    return (
    	<div>
        	{content}
        </div>
    )
    
}
```

### Post Axios

```js
// Create an asynchronous action
export const fetchPostList = createAsyncThunk('post/fetchPostList',async (data) => {
        try {
            const res = await axios.post(url, data);
            return res.data;
        } catch (error) {
            // Handling Errors
            // console.error("Error fetching post list:", error);
            // throw error;
            return error.message
        }
    }
);

.addCase(fetchPostList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts.push(action.payload.name);
        })
```



# Template

Usually write `initialState` in a function

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Hoo"
};

const counterStore = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload;
        }
    }
});

export const { setName } = counterStore.actions;
export default counterStore.reducer;
```



# Other ways to write reference

```js
// front end
dispatch(setName({
    name,
    age,
    email
}))

// back end
setName(state, action) {
    const { name, age, email } action.payload;
}
```











