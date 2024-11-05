---
id: n-hight
slug: /n-hight
title: Advanced Learning
date: 2024-11-04
authors: Hoo
tags: [node]
keywords: [node]
---

## Node Advanced Learning



### Install

```
npm init -y
npm install express
```



#### Example 1

```js
// Import required modules
const express = require('express');
const app = express();

// Define the port
const PORT = 8080;

// Route - Returns simple text data
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js API server!');
});

// Route - Returns user data in JSON format
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 },
    ];
    res.json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started, access address: http://localhost:${PORT}`);
});

```



#### Example 2

```js
// Import modules
const express = require('express');
const app = express();
const PORT = 8080;

// Middleware: Parse JSON data
app.use(express.json());

// Simulated database data
let users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
];

// Get all users (GET)
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get a user by ID (GET)
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Create a new user (POST)
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1, // Simple ID generation
        name: req.body.name,
        age: req.body.age,
    };
    users.push(newUser);
    res.status(201).json(newUser); // Return the newly created user
});

// Update a user (PUT)
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete a user (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser);
    } else {
        res.status(404).send('User not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started, access address: http://localhost:${PORT}`);
});

```

##### API test method

**Use Postman**

- **GET request**

- Get all users: `GET http://localhost:8080/api/users`

- Get a user by ID: `GET http://localhost:8080/api/users/1`

- **POST request**

- Create a new user: `POST http://localhost:8080/api/users`

- Request body example:

    ```json
    {
      "name": "David",
      "age": 40
    }
    ```

- **PUT request**

- Update user information: `PUT http://localhost:8080/api/users/1`

- Request body example:
    ```json
    {
      "name": "Alice Updated",
      "age": 26
    }
    ```

- **DELETE request**

- Delete a user：`DELETE http://localhost:8080/api/users/1`





### Middleware - Using JWT Authentication

```
npm install express jsonwebtoken body-parser
```



#### Example 1

```js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser to parse request bodies
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for JWT handling
const crypto = require('crypto'); // Import crypto for generating a random secret key

const app = express();
const SECRET_KEY = crypto.randomBytes(32).toString('hex'); // Generate a random 32-byte secret key

// Middleware to parse JSON request body data
app.use(bodyParser.json());

// Middleware: Validate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Get the authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header

    if (!token) return res.status(401).send('Access Denied'); // If no token, respond with 401

    // Verify the token using the secret key
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token'); // If token is invalid, respond with 403
        req.user = user; // Attach the user information to the request
        next(); // Proceed to the next middleware or route handler
    });
}

// Login route to generate JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body; // Get username and password from request body
    
    // Simulated user validation (in a real application, this should check a database)
    if (username === 'testUser' && password === 'password123') {
        const user = { username: 'testUser' }; // Create a user object
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // Sign the token with the secret key
        res.json({ token }); // Respond with the token
    } else {
        res.status(403).send('Invalid username or password'); // If invalid, respond with 403
    }
});

// Protected route that only authenticated users can access
app.get('/protected', authenticateToken, (req, res) => {
    res.send(`Hello ${req.user.username}, you have access to this protected resource!`); // Greet the authenticated user
});

// A public route that does not require authentication
app.get('/public', (req, res) => {
    res.send('This is a public resource accessible to anyone.'); // Respond to public access
});

// Start the server
app.listen(8080, () => {
    console.log('Server running on port 8080'); // Log the server status
});

```



##### Path description

1. **POST `/login`**
- Function: User login and obtain JWT token.
- Request body: `{ "username": "testUser", "password": "password123" }`
- Return: JWT token.

2. **GET `/protected`**
- Function: Protected path, only users with valid JWT can access.
- Request header: `Authorization: Bearer <token>`
- Return: Protected resource information.

3. **GET `/public`**
- Function: Public path, accessible without authentication.
- Return: Public resource information.

### File upload and download - using Multer

```
npm install express multer
```

```
project-directory/
├── uploads/      # Directory for storing uploaded files / create it yourself
├── server.js     # Main Server Files
├── package.json
```



#### Example 1

```js
const express = require('express');
const multer = require('multer');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure the storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the file name
    }
});

// Create a multer instance with the storage configuration
const upload = multer({ storage });

// Route for uploading files
app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`File uploaded successfully: ${req.file.filename}`); // Send a response with the uploaded file's name
});

// Route for downloading files
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename); // Construct the file path
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found'); // Handle errors if the file is not found
        }
    });
});

// Start the server
app.listen(8080, () => {
    console.log('Server running on port 8080'); // Log the server status
});

```

Html Uploads

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload</title>
</head>
<body>
    <h1>File Upload</h1>
    <form action="http://localhost:8080/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" required />
        <button type="submit">Upload</button>
    </form>
</body>
</html>
```

Html Download

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Download</title>
</head>
<body>
    <h1>Download File</h1>
    <button id="downloadBtn">Download File</button>

    <script>
        document.getElementById('downloadBtn').addEventListener('click', function() {
            window.location.href = 'http://localhost:8080/download/1730343500255.txt';
        });
    </script>
</body>
</html>
```



**Use Postman to upload a file**:

- Open Postman.

- Select the request method as `POST`.

- Enter the URL: `http://localhost:8080/upload`.

- In the `Body` tab, select `form-data`.

- In the `Key` field, enter `file` (this is the field name defined in multer).
- In the `Value` field, click the "Select File" button on the right and select the file to upload.
- Click the "Send" button.

**Initiate a GET request in Postman**:

- Open Postman.

- Select the request method as `GET`.

- Enter a URL, for example:

  ```
  http://localhost:8080/download/your_uploaded_file_name.ext
  ```

  replace 

  ```
  your_uploaded_file_name.ext
  ```

   The file name you actually uploaded.

- Click the "Send" button.

**Check Download**:

- Postman will prompt you to save the file. If everything is OK, you will be able to download the file.

##### Routing Description

1. **POST `/upload`**
- Function: Receive file uploads.
- File parameter: `file` (should be consistent with the field name uploaded in the front-end request).
- Return: Upload success message, including the file name.
2. **GET `/download/:filename`**
- Function: Download the specified file.
- Request parameter: `filename` (the file name to be downloaded).
- Return: Download the file or 404 error (file not found).

### Real-time Communication - Using Socket.IO

```
npm install express socket.io
```

```
project-directory/
├── server.js         # Node.js server files
├── public/           # Directory for storing front-end files
│   ├── index.html    # Front-end HTML file
│   └── style.css     # (Optional) Style file
└── package.json      # Project Description File
```



#### Example

```js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Import necessary modules
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from clients
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        // Broadcast the message to all clients
        io.emit('chat message', msg);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

```

HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
    <link rel="stylesheet" href="style.css"> <!-- Optional styles -->
</head>
<body>
    <h1>Chat Room</h1>
    <ul id="messages"></ul>
    <form id="form" action="">
        <input id="input" autocomplete="off" placeholder="Type your message here..." /><button>Send</button>
    </form>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();

        const form = document.getElementById('form');
        const input = document.getElementById('input');
        const messages = document.getElementById('messages');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                // Send a message to the server
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        // Listen for messages sent by the server
        socket.on('chat message', function(msg) {
            const item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    </script>
</body>
</html>
```

Css

```css
body {
    font-family: Arial, sans-serif;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    padding: 8px;
    margin-bottom: 5px;
    background-color: #f1f1f1;
    border-radius: 4px;
}

form {
    display: flex;
    margin-top: 10px;
}

input {
    flex: 1;
    padding: 10px;
}

button {
    padding: 10px;
}
```

Open your browser and visit `http://localhost:3000`. You should be able to see the chat interface.

#### Public Chat Project

```
npm install mongoose
```



Using MongoDB Atlas is a very convenient way to host MongoDB databases. Here are the detailed steps to help you set up and use MongoDB Atlas:

#### 1. Sign up for MongoDB Atlas

1. Access MongoDB Atlas:
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Create an account:
- Click "Get Started Free" to sign up for an account. If you already have an account, just log in.

#### 2. Create a new cluster

1. Create a cluster:
- Once logged in, click "Build a Cluster".
- Select a free cluster configuration (Free Tier).
- Select your cloud provider and region (it is recommended to choose a region closest to you for better performance).
- Click the "Create Cluster" button and wait for the cluster to be created (it may take a few minutes).

#### 3. Configure database users

1. Create a database user:
- After the cluster is created, click the "Database Access" option.
- Click "Add New Database User".
- Set the username and password, and select the "Read and write to any database" permission.
- Click "Add User".

#### 4. Set network access

1. Allow IP access:
- Click the "Network Access" option.
- Click "Add IP Address".
- Select "Allow Access from Anywhere" to allow any IP access (in a production environment, please limit IP as needed).
- Click "Confirm".

#### 5. Get the connection string

1. Get the connection string:

- Return to the cluster page and click the "Connect" button.

- Select "Connect your application".

- Copy the connection string provided, which is in the following format:

```js
mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

#### 6. Connect to MongoDB Atlas using Mongoose

In your Node.js project, you need to install Mongoose (if not already installed):

```
npm install mongoose
```

Then connect to MongoDB Atlas in your code:

```js
const mongoose = require('mongoose');

// Replace the username and password you created on Atlas with
const username = 'yourUsername';
const password = 'yourPassword';
const dbName = 'yourDatabaseName'; // Customizable database name
const uri = `mongodb+srv://${username}:${password}@cluster0.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch(err => {
    console.error('Database connection error:', err);
});
```

#### 7. Perform operations in the database

Once the connection is successful, you can create models, perform CRUD operations, etc. Here is a simple example:

```js
const messageSchema = new mongoose.Schema({
    text: String,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Insert message example
const newMessage = new Message({ text: 'Hello, MongoDB Atlas!' });
newMessage.save()
    .then(() => console.log('Message saved!'))
    .catch(err => console.error('Error saving message:', err));

// Query message example
Message.find()
    .then(messages => console.log('Messages:', messages))
    .catch(err => console.error('Error fetching messages:', err));
```

#### 8. Clean up resources

If you no longer use it, you can delete the cluster in the Atlas console to avoid unnecessary costs.

#### Summary

With the above steps, you can create a database on MongoDB Atlas and use it in a Node.js application. Atlas provides a powerful management interface that can easily monitor and manage the database

#### Example 1

html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
    <link rel="stylesheet" href="style.css"> <!-- Optional styles -->
</head>
<body>
    <h1>Chat Room</h1>
    <ul id="messages"></ul>
    <form id="form" action="">
        <input id="input" autocomplete="off" placeholder="Type your message here..." /><button>Send</button>
    </form>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        const form = document.getElementById('form');
        const input = document.getElementById('input');
        const messages = document.getElementById('messages');

        // Loading history messages
        socket.on('load messages', function(msgs) {
            msgs.forEach(msg => {
                const item = document.createElement('li');
                item.textContent = msg.content; // Displaying messages using msg.content
                messages.appendChild(item);
            });
            window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom of the page
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                // Send a message to the server
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        // Listen for messages sent by the server
        socket.on('chat message', function(msg) {
            const item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    </script>
</body>
</html>
```

css

```css
body {
    font-family: Arial, sans-serif;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    padding: 8px;
    margin-bottom: 5px;
    background-color: #f1f1f1;
    border-radius: 4px;
}

form {
    display: flex;
    margin-top: 10px;
}

input {
    flex: 1;
    padding: 10px;
}

button {
    padding: 10px;
}
```

server.js

```js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('./models/Message'); // Import Message model

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Replace with your username and password you created on Atlas
const username = 'wengchinbusiness'; // Replace with your username
const password = 'OdelKSTJEWDKD27T'; // Replace with your password
const dbName = 'sample_mflix'; // Use your database name
const uri = `mongodb+srv://${username}:${password}@cluster0.5x4eq.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch(err => {
    console.error('Database connection error:', err);
});

// Static file service
app.use(express.static(path.join(__dirname, 'public')));

// API route to get all messages
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 'asc' }); // Sort by time
        res.json(messages); // Return message data
    } catch (err) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Handle Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Load historical messages when the user connects
    Message.find().sort({ createdAt: 'asc' }).then(messages => {
        socket.emit('load messages', messages); // Send historical messages to the client
    });

    // Listen for messages sent by the client
    socket.on('chat message', async (msg) => {
        console.log('Message received: ' + msg);

        // Save message to the database
        const message = new Message({ content: msg });
        await message.save();

        // Broadcast message to all clients
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

models/Message.js

```js
// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
```