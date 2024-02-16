export interface TBlog {
  title: string;
  body: string;
}

export interface TBlogResponse extends TBlog {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TComment {
  _id: string;
  name: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  blogId: string;
  userId: string;
}
