<<<<<<< HEAD:docs/tech/Web/react/Redux Toolkit 工具库.md
---
id: redux-toolkit-react
slug: /redux-toolkit-react
title: Redux Toolkit 插件
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

# Redux Toolkit

类似Vue的Pinia

[**Redux Toolkit**](https://redux-toolkit.js.org/) (也称为 **"RTK"** ) 是我们官方推荐的编写 Redux 逻辑的方法。
[**Redux Toolkit 中文官网**](https://cn.redux-toolkit.js.org/introduction/getting-started)
[**视频教学 Redux Toolkit**](https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=38&amp;vd_source=98bed7c6ffbd4c5daae519aceb54cc51)
[**视频教学 美国**](https://www.bilibili.com/video/BV1qK411D7Lo/)



## 安装

```
npm i @reduxjs/toolkit react-redux
```

`index.js` 传递store

```react
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



## 例子 第一章 (简洁和直接)

根目录创建 `store` 文件

`store/index.js` 暴露出去

```react
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

`store/modules/counterStore.js` 编写逻辑

```react
import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
	name: 'counter',
	
	// 初始状态数据
	initialState:{
		count: 0
	}
	
	// 修改数据的同步方法
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

`前端` 使用

```react
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, addToNum } from './store/modules/counterStore'
import { fetchChannelList } from './store/modules/channelStore'

function App () {
	const { count } = useSelector(state => state.counter)
	const { channelList } = useSelector(state => state.channel)
	const dispatch = useDispatch()
	
	useEffect(() => {
		// 使用useEffect触发异步请求执行
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

`store/modules/channelStore.js` 编写异步数据逻辑

```react
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
            // 处理错误
            console.error("Error fetching channel list:", error);
        }
    };
};

export const { setChannels } = channelStore.actions;
export default channelStore.reducer;
```



## 例子 第二章 (逻辑)

创建 `store` 文件

`store/index.js` 暴露出去

```react
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

`store/modules/counterStore.js` 编写逻辑

```react
import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
	name: 'counter',
	
	// 初始状态数据
	initialState:{
		count: 0
	}
	
	// 修改数据的同步方法
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

`前端` 使用

```react
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, addToNum, selectAllCounter } from './store/modules/counterStore'
import { fetchChannelList, selectAllChannel } from './store/modules/channelStore'

function App () {
	const { count } = useSelector(selectAllCounter)
	const { channelList } = useSelector(selectAllChannel)
	const dispatch = useDispatch()
	
	useEffect(() => {
		// 使用useEffect触发异步请求执行
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

`store/modules/channelStore.js` 编写异步数据逻辑

```react
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
            // 处理错误
            console.error("Error fetching channel list:", error);
        }
    };
};

export const { setChannels } = channelStore.actions;
export const selectAllChannel = (state) => state.channel
export default channelStore.reducer;
```



### nanoid

`nanoid` 是一个用于生成唯一标识符（UUID）的工具函数，它通常用于生成 Redux 中的 action 的唯一标识符或者生成唯一的 key。在 Redux Toolkit 中，`nanoid` 函数可以从 `@reduxjs/toolkit` 包中导入使用。

```react
import { nanoid } from "@reduxjs/toolkit";

nanoid()
```



### 添加数据

进阶写法 `reducer` 和 `prepare`

`store/modules/postsStore.js` 编写异步数据逻辑

```react
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

`前端` 使用

```react
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

`store/modules/postsStore.js` 编写异步数据逻辑

```react
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'api-link';

// 创建异步 action
export const fetchPostList = createAsyncThunk('post/fetchPostList',async () => {
        try {
            const res = await axios.get(url);
            return res.data.data.posts;
        } catch (error) {
            // 处理错误
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
        status: 'idle', // 添加异步状态管理
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

### 两种写法

#### 写法 1

```react
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

#### 写法 2

```react
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

`前端`

```react
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

```react
// 创建异步 action
export const fetchPostList = createAsyncThunk('post/fetchPostList',async (data) => {
        try {
            const res = await axios.post(url, data);
            return res.data;
        } catch (error) {
            // 处理错误
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



# 模板

通常将 `initialState` 写在函数里

```react
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



# 其他写法 参考

```react
// 前端
dispatch(setName({
    name,
    age,
    email
}))

// 后端
setName(state, action) {
    const { name, age, email } action.payload;
}
```











=======
---
id: redux-toolkit-react
slug: /redux-toolkit-react
title: Redux Toolkit 插件
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

# Redux Toolkit

类似Vue的Pinia

[**Redux Toolkit**](https://redux-toolkit.js.org/) (也称为 **"RTK"** ) 是我们官方推荐的编写 Redux 逻辑的方法。

[Redux Toolkit 中文官网]: https://cn.redux-toolkit.js.org/introduction/getting-started
[视频教学 Redux Toolkit]: https://www.bilibili.com/video/BV1ZB4y1Z7o8?p=38&amp;vd_source=98bed7c6ffbd4c5daae519aceb54cc51
[视频教学 美国]: https://www.bilibili.com/video/BV1qK411D7Lo/



## 安装

```
npm i @reduxjs/toolkit react-redux
```

`index.js` 传递store

```react
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



## 例子 第一章 (简洁和直接)

根目录创建 `store` 文件

`store/index.js` 暴露出去

```react
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

`store/modules/counterStore.js` 编写逻辑

```react
import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
	name: 'counter',
	
	// 初始状态数据
	initialState:{
		count: 0
	}
	
	// 修改数据的同步方法
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

`前端` 使用

```react
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, addToNum } from './store/modules/counterStore'
import { fetchChannelList } from './store/modules/channelStore'

function App () {
	const { count } = useSelector(state => state.counter)
	const { channelList } = useSelector(state => state.channel)
	const dispatch = useDispatch()
	
	useEffect(() => {
		// 使用useEffect触发异步请求执行
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

`store/modules/channelStore.js` 编写异步数据逻辑

```react
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
            // 处理错误
            console.error("Error fetching channel list:", error);
        }
    };
};

export const { setChannels } = channelStore.actions;
export default channelStore.reducer;
```



## 例子 第二章 (逻辑)

创建 `store` 文件

`store/index.js` 暴露出去

```react
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

`store/modules/counterStore.js` 编写逻辑

```react
import { createSlice } from "@reduxjs/toolkit"

const counterStore = createSlice({
	name: 'counter',
	
	// 初始状态数据
	initialState:{
		count: 0
	}
	
	// 修改数据的同步方法
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

`前端` 使用

```react
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, addToNum, selectAllCounter } from './store/modules/counterStore'
import { fetchChannelList, selectAllChannel } from './store/modules/channelStore'

function App () {
	const { count } = useSelector(selectAllCounter)
	const { channelList } = useSelector(selectAllChannel)
	const dispatch = useDispatch()
	
	useEffect(() => {
		// 使用useEffect触发异步请求执行
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

`store/modules/channelStore.js` 编写异步数据逻辑

```react
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
            // 处理错误
            console.error("Error fetching channel list:", error);
        }
    };
};

export const { setChannels } = channelStore.actions;
export const selectAllChannel = (state) => state.channel
export default channelStore.reducer;
```



### nanoid

`nanoid` 是一个用于生成唯一标识符（UUID）的工具函数，它通常用于生成 Redux 中的 action 的唯一标识符或者生成唯一的 key。在 Redux Toolkit 中，`nanoid` 函数可以从 `@reduxjs/toolkit` 包中导入使用。

```react
import { nanoid } from "@reduxjs/toolkit";

nanoid()
```



### 添加数据

进阶写法 `reducer` 和 `prepare`

`store/modules/postsStore.js` 编写异步数据逻辑

```react
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

`前端` 使用

```react
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

`store/modules/postsStore.js` 编写异步数据逻辑

```react
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'api-link';

// 创建异步 action
export const fetchPostList = createAsyncThunk('post/fetchPostList',async () => {
        try {
            const res = await axios.get(url);
            return res.data.data.posts;
        } catch (error) {
            // 处理错误
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
        status: 'idle', // 添加异步状态管理
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

### 两种写法

#### 写法 1

```react
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

#### 写法 2

```react
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

`前端`

```react
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

```react
// 创建异步 action
export const fetchPostList = createAsyncThunk('post/fetchPostList',async (data) => {
        try {
            const res = await axios.post(url, data);
            return res.data;
        } catch (error) {
            // 处理错误
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



# 模板

通常将 `initialState` 写在函数里

```react
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



# 其他写法 参考

```react
// 前端
dispatch(setName({
    name,
    age,
    email
}))

// 后端
setName(state, action) {
    const { name, age, email } action.payload;
}
```











>>>>>>> d75f00fc1ea1253c1f56f4615d7fcfbc00d453b8:docs/tech/web/react/Redux Toolkit 工具库.md
