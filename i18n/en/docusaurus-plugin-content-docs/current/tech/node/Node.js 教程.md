---
id: n-base
slug: /n-base
title: Basic Learning
date: 2024-11-04
authors: Hoo
tags: [node]
keywords: [node]
---

## Node.js Tutorial



### Installation

1. Select **Windows PowerShell (Admin)**

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser // Start using the computer
```

2. **Install** in the project

```
npm init -y
```

3. **(Select)** Installable

```
npm install -g typescript // Install typescript in computer cmd Global installation / Start using the computer
```

```
tsc -v // Check / Start using the computer
```

```
npm install -g ts-node // Install ts-node in computer cmd Global installation / Start using the computer
```

```
ts-node -v // Check / Start using the computer
```

Install **typescript** in the project

```
tsc --init
```

```
npm i express
```

```
npm i @types/express -D
```

### Start

```js
node hello.js
```

```
ts-node ./api_server.ts
```





## Typescript

```ts
import express from 'express';

const app = express();

app.get('/',(req,res) => {
    res.end('1212');
})

app.listen(8080, () => {
    console.log('The service has been started...')
})
```



### Import Json file

1. Configure in **tsconfig.json**

```ts
"resolveJsonModule":true,
```

2，import

```ts
import list from './list.json'
```

#### Example code:

Json

```json
[
    {
        "name":"Hoo",
        "age":24
    },
    {
        "name":"Jee",
        "age":14
    }
]
```

data.ts

```ts
import list from './list.json'

export class DataStore{
    static list = list
}
```

api_server.ts

```ts
import express from 'express';
import { DataStore } from './data' // Importing Json data

const app = express();

app.get('/',(req,res) => {
    res.json(DataStore.list);
})

app.listen(8080, () => {
    console.log('The service has been started...')
})
```

## JavaScript Writing

### FS

#### Create a file

```js
// Import fs
const fs = require('fs');

// Asynchronous write
fs.writeFile('./newFile.txt', 'Content to write', err => {
    if (err) {
        console.log('Write failed');
        return;
    }

    console.log('Success');
});
```

```js
// Import fs
const fs = require('fs');

// Synchronous write
fs.writeFileSync('./newFile.txt', 'Content to write');

// Path
'D:/index.html';
```



#### Additional content

```js
// Import fs
const fs = require('fs');

// Append content
fs.appendFile('./newFile.txt', 'Appended content', err => {
    if (err) throw err;
    console.log('Success');
});
```

```js
// Import fs
const fs = require('fs');

// Synchronous append
fs.appendFileSync('./newFile.txt', 'Content to append');
```



#### FS Streaming Writing Create

```js
// Import fs
const fs = require('fs');

// Write
let ws = fs.createWriteStream('./worldview.txt');
ws.write('World 1\r\n');
ws.write('World 2\r\n');
ws.write('World 3\r\n');
ws.write('World 4\r\n');

// Close
ws.end();
```



#### Read

```js
// Import fs
const fs = require('fs');

// Read as binary
fs.readFile('./newFile.txt', (err, data) => {
    if (err) throw err;
    console.log(data); // Binary data output
});

// Read as text
fs.readFile('./newFile.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data); // Text content output
});
```

```js
// Import fs
const fs = require('fs');

// Read as binary
let data = fs.readFileSync('./newFile.txt');
console.log(data.toString());
```



#### Save Video

```js
// Import fs
const fs = require('fs');

// Read video file
let data = fs.readFileSync('./example.mp4');

// Save video file
fs.writeFileSync('../File/Save/example.mp4', data);
```

```js
// Import fs
const fs = require('fs');

// Create read stream
const rs = fs.createReadStream('./example.mp4');
// Create write stream
const ws = fs.createWriteStream('./newExample.mp4');

// On data event, write to the new file
rs.on('data', chunk => {
    ws.write(chunk);
});

// Optional: Handle end of stream
rs.on('end', () => {
    ws.end();  // Close the write stream when done
});
```



#### Change name

```js
// Import fs
const fs = require('fs');

// Rename file
fs.rename('./newFile.txt', './newName.txt', err => {
    if (err) throw err;
    console.log('Success');
});
```



#### Move files

```js
// 导入 fs
const fs = require('fs');

// 移动 文件
fs.rename('./创建文件.txt','./新文件夹/创建文件.txt', err => {
    if(err) throw err;
    console.log('成功');
})
```



#### Deleting files

```js
// Import fs
const fs = require('fs');

// Move file
fs.rename('./newFile.txt', './newFolder/newFile.txt', err => {
    if (err) throw err;
    console.log('Success');
});
```

```js
// Import fs
const fs = require('fs');

// Delete file
fs.rm('./newFile.txt', err => {
    if (err) throw err;
    console.log('Success');
});
```



#### Create a folder

```js
// Import fs
const fs = require('fs');

// Create directory
fs.mkdir('./page', err => {
    if (err) throw err;
    console.log('Success');
});
```



#### Read Folder

```js
// Import fs
const fs = require('fs');

// Read directory
fs.readdir('./page', (err, data) => {
    if (err) throw err;
    console.log(data); // Output the list of files and directories
});
```



#### Delete a folder

```js
// Import fs
const fs = require('fs');

// Remove directory (cannot remove non-empty directories)
fs.rmdir('./page', err => {
    if (err) throw err;
    console.log("Success");
});
```

```js
// Import fs
const fs = require('fs');

// Delete directory (even if non-empty)
fs.rmdir('./page', { recursive: true }, err => {
    if (err) throw err;
    console.log("Success");
});
```

```js
// Import fs
const fs = require('fs');

// Delete directory (even if non-empty) - Recommended
fs.rm('./page', { recursive: true }, err => {
    if (err) throw err;
    console.log("Success");
});
```



### Http

```js
// Import http
const http = require('http');

// Create server object
const server = http.createServer((request, response) => {
   response.end('Hello Http'); 
})

// Start server
server.listen(9000, () => {
    console.log('Server is running');
});
```

```js
// Import http
const http = require('http');

// Create server object
const server = http.createServer((request, response) => {
    // Set header for Chinese characters
   response.setHeader('content-type', 'text/html;charset=utf-8');
   response.end('你好'); 
})

// Start server
server.listen(9000, () => {
    console.log('Server is running');
});
```



#### Get URL data

```js
// Import http
const http = require('http');
// Import url
const url = require('url');

// Create server object
const server = http.createServer((request, response) => {
   // Parse the request URL
   let res = url.parse(request.url, true);

   // Get the pathname
   let pathname = res.pathname;
   // Get the query parameter 'keyword'
   let keyword = res.query.keyword;

   // Respond with the pathname and keyword
   response.end(`Pathname: ${pathname}, Keyword: ${keyword}`);
})

// Start server
server.listen(9000, () => {
    console.log('Server is running...');
});
```

```js
// Import http
const http = require('http');
// Import url
const url = require('url');

// Create server object
const server = http.createServer((request, response) => {
   // Parse the request URL
   const parsedUrl = url.parse(request.url, true);

   // Create a URL object to access searchParams
   const queryParams = new URLSearchParams(parsedUrl.query);

   // Get the value of 'keyword' from the query string
   let keyword = queryParams.get('keyword');

   // Respond with the keyword value
   response.end(`Keyword: ${keyword}`);
})

// Start server
server.listen(9000, () => {
    console.log('Server is running...');
});
```



#### Judgment method

```js
// Import http and url modules
const http = require('http');
const url = require('url');

// Create server object
const server = http.createServer((request, response) => {

    // Get request method
    let {method} = request;
    
    // Get pathname from the URL
    let {pathname} = url.parse(request.url, true);

    // Set header to support Chinese characters
    response.setHeader('content-type', 'text/html;charset=utf-8');

   // Check request method and path
   if (method === 'GET' && pathname === '/login') {
        response.end('Login Page');  // Login page
   } else if (method === 'GET' && pathname === '/reg') {
        response.end('Registration Page');  // Registration page
   } else {
        response.end('Page Not Found');  // Page not found
   }
});

// Start server
server.listen(9000, () => {
    console.log('Server is running...');
});
```



#### Importing HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <h1>mnj</h1>
    
</body>
</html>
```

```js
// Import the http and fs modules
const http = require('http');
const fs = require('fs');

// Create the server object
const server = http.createServer((request, response) => {

    // Read the HTML file
    let html = fs.readFileSync('./1.html');
    response.end(html);

});

// Start the server
server.listen(9000, () => {
    console.log('Server is running...');
});
```

```js
// Import the http and fs modules
const http = require('http');
const fs = require('fs');
const url = require('url');

// Create the server object
const server = http.createServer((request, response) => {

    // Parse the URL and extract the pathname
    let {pathname} = url.parse(request.url, true);

    // Serve the correct file based on the pathname
    if (pathname === '/') {
        let html = fs.readFileSync('./1.html');
        response.end(html);
    } else if (pathname === '/index.css') {
        let css = fs.readFileSync('./1.css');
        response.end(css);
    } else if (pathname === '/index.js') {
        let js = fs.readFileSync('./1.js');
        response.end(js);
    } else {
        response.statusCode = 404;
        response.end('<h1>404 Not Found</h1>');
    }

});

// Start the server
server.listen(9000, () => {
    console.log('Server is running...');
});
```

```js
// Import the http and fs modules
const http = require('http');
const fs = require('fs');
const url = require('url'); // Make sure to require 'url' module

// Create the server object
const server = http.createServer((request, response) => {

    // Parse the URL and get the pathname
    let { pathname } = url.parse(request.url, true);

    // Define the file path based on the requested pathname
    let filePath = '.' + pathname; // Prepend '.' to make it relative to the current directory

    // Read the requested file and return its content
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.statusCode = 404; // If file not found, send 404 error
            response.end('<h1>404 Not Found</h1>');
            return;
        }
        response.end(data); // Send the file content as the response
    });

});

// Start the server
server.listen(9000, () => {
    console.log('Server is running...');
});
```













