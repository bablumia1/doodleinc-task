# API Documentation

## Introduction

Our task was to develop a web application that allows users to create, update, and delete blog posts and comments.

## Authentication

Before you can make requests to **create**, **update** and **delete** Blog, and also to **create** , **update** and **delete** Comment you need to authenticate.

- **Basic Authentication**: Generate personal access tokens for authentication.

#### Authentication Headers

For endpoints requiring authentication, you should include an authentication header in your HTTP requests.

# User Authentication

## Register User

Register a new user account.

- **URL**: `/api/v1/auth/register`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "name": "example_user",
    "email": "example_user@gmail.com",
    "password": "example_password"
  }
  ```

## Login User

Register a new user account.

- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**:
  ```json
  {
    "email": "example_user@gmail.com",
    "password": "example_password"
  }
  ```

# Blog Post

Create a new blog post.

- **URL**: `/api/v1/blogs/create`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer YOUR_ACCESS_TOKEN`
- **Body**:

  ```json
  {
    "title": "Example Title",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero euismod, congue quam vel, tincidunt purus."
  }
  ```

Get all blogs

- **URL**: `/api/v1/blogs`
- **Method**: `GET`
- **Headers**:

  - `Content-Type`: `application/json`

Get singel blog

- **URL**: `/api/v1/blogs/blogId`
- **Method**: `GET`
- **Headers**:
  - `Content-Type`: `application/json`

Update blog

- **URL**: `/api/v1/blogs/blogId`
- **Method**: `PATCH`
- **Headers**:

  - `Content-Type`: `application/json`\
  - `Authorization`: `Bearer YOUR_ACCESS_TOKEN`

- **Body**:

  ```json
  {
    "title": "Example Title",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero euismod, congue quam vel, tincidunt purus."
  }
  ```

Delete blog

- **URL**: `/api/v1/blogs/blogId`
- **Method**: `DELETE`
- **Headers**:

  - `Content-Type`: `application/json`\
  - `Authorization`: `Bearer YOUR_ACCESS_TOKEN`

# Comments

Create a new comments.

- **URL**: `/api/v1/comments/blogId/create`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer YOUR_ACCESS_TOKEN`
- **Body**:

  ```json
  {
    "body": "Example comment"
  }
  ```

Get all comments

- **URL**: `/api/v1/comments/blogId`
- **Method**: `GET`
- **Headers**:

  - `Content-Type`: `application/json`

Update comment

- **URL**: `/api/v1/comments/commentId`
- **Method**: `PATCH`
- **Headers**:

  - `Content-Type`: `application/json`\
  - `Authorization`: `Bearer YOUR_ACCESS_TOKEN`

- **Body**:

  ```json
  {
    "body": "Updated comment data"
  }
  ```

Delete blog

- **URL**: `/api/v1/comments/commentId`
- **Method**: `DELETE`
- **Headers**:

  - `Content-Type`: `application/json`\
  - `Authorization`: `Bearer YOUR_ACCESS_TOKEN`
