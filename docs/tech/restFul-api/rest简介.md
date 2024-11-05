---
id: api-intro
slug: /api-intro
title: RestFul API 简介
date: 2024-11-04
authors: Hoo
tags: [rest-api]
keywords: [rest-api]
---

RESTful API（Representational State Transfer API）是一种基于 HTTP 协议的网络服务架构风格。RESTful API 设计用于简化网络应用程序间的通信，通常用于客户端与服务器之间的数据交换。它强调无状态、资源导向和标准化的请求方式，使得 Web 服务的交互变得高效和灵活。

RESTful API 的核心特点包括：

1. **资源导向**：RESTful API 将网络中的一切视为资源（Resource），每个资源都有一个唯一的标识符（URI）。通过对这些资源的操作，客户端可以轻松地与服务器进行交互。
2. **无状态通信**：RESTful API 的每个请求都是独立的，服务器不保留任何关于客户端的状态信息。每次请求中必须包含所有必要的信息，这种设计简化了服务器的实现和管理。
3. **使用标准 HTTP 方法**：RESTful API 使用标准的 HTTP 方法来定义操作，包括：
   - GET：获取资源
   - POST：创建资源
   - PUT：更新资源
   - DELETE：删除资源 这种方式使得 RESTful API 的使用变得直观和易于理解。
4. **支持多种数据格式**：虽然 RESTful API 通常使用 JSON 格式进行数据交换，但它也支持 XML、HTML 和纯文本等多种格式。这使得不同平台和客户端能够方便地处理数据。
5. **灵活性和可扩展性**：RESTful API 具有良好的扩展性，能够轻松支持多种客户端和设备。由于其无状态特性，可以根据需要横向扩展服务器，以处理更多的请求。
6. **良好的性能**：由于 RESTful API 使用简单的 HTTP 协议，并且允许缓存响应数据，从而提高了应用的性能和响应速度。