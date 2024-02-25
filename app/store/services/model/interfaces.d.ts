export interface IComment {
  id: number;
  title: string;
  text: string;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  id: number;
  title: string;
  text: string;
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
