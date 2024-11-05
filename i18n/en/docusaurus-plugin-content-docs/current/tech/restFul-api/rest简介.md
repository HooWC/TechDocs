---
id: api-intro
slug: /api-intro
title: RestFul API Introduction
date: 2024-11-04
authors: Hoo
tags: [rest-api]
keywords: [rest-api]
---

RESTful API (Representational State Transfer API) is a web service architecture style based on HTTP protocol. RESTful API is designed to simplify communication between web applications and is usually used for data exchange between clients and servers. It emphasizes statelessness, resource orientation and standardized request methods, making the interaction of web services efficient and flexible.

The core features of RESTful API include:

1. **Resource orientation**: RESTful API regards everything in the network as a resource, and each resource has a unique identifier (URI). By operating on these resources, clients can easily interact with the server.

2. **Stateless communication**: Each request of RESTful API is independent, and the server does not retain any state information about the client. Each request must contain all necessary information, and this design simplifies the implementation and management of the server.

3. **Use standard HTTP methods**: RESTful API uses standard HTTP methods to define operations, including:

- GET: Get resources

- POST: Create resources

- PUT: Update resources

- DELETE: Delete resources This approach makes the use of RESTful API intuitive and easy to understand.
4. **Support for multiple data formats**: Although RESTful APIs usually use JSON format for data exchange, it also supports multiple formats such as XML, HTML, and plain text. This allows different platforms and clients to easily process data.
5. **Flexibility and scalability**: RESTful APIs have good scalability and can easily support multiple clients and devices. Due to its stateless nature, servers can be scaled horizontally as needed to handle more requests.
6. **Good performance**: Because RESTful APIs use a simple HTTP protocol and allow caching of response data, the performance and response speed of the application are improved.