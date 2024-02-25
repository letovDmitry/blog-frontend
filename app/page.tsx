"use client";

import { Input, Card, Pagination, Button, Modal } from "antd";
import { useState } from "react";
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "./store/services/postApi";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "./store/services/commentsApi";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [commentTitle, setCommentTitle] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [changeCommentTitle, setChangeCommentTitle] = useState<string>("");
  const [changeCommentText, setChangeCommentText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<number | null>(null);
  const [changeComment, setChangeComment] = useState<number | null>(null);

  const { data: posts, refetch } = useGetPostsQuery(page);
  const [createPost] = useCreatePostMutation();
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const handleCreatePost = (): void => {
    createPost({
      title,
      text,
    })
      .unwrap()
      .then(() => {
        setTitle("");
        setText("");
      });
  };

  const handleCreateComment = (postId: number): void => {
    createComment({
      title: commentTitle,
      text: commentText,
      postId,
    })
      .unwrap()
      .then(() => {
        setCommentTitle("");
        setCommentText("");
        refetch();
      });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId)
      .unwrap()
      .then(() => {
        refetch();
      });
  };

  const handleUpdateComment = (commentId: number) => {
    updateComment({
      comment: {
        title: changeCommentTitle,
        text: changeCommentText,
      },
      commentId,
    })
      .unwrap()
      .then(() => {
        setChangeCommentText("");
        setChangeCommentTitle("");
        setChangeComment(null);
        refetch();
      });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mt-[20px]">
        <h1 className="text-[25px] font-bold text-center mb-[20px]">
          Создать статью
        </h1>
        <div className="m-auto  w-[50%]">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-[20px]"
            size="large"
            placeholder="Заголовок"
          />
          <Input.TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mb-[20px]"
            placeholder="Текст статьи"
          />
          <Button
            onClick={handleCreatePost}
            disabled={!(title && text)}
            className="mb-[20px]"
          >
            Отправить
          </Button>
          <Pagination
            className="mb-[20px]"
            defaultCurrent={1}
            onChange={(p) => setPage(p)}
            total={posts ? Math.ceil(posts?.count / 20) * 10 : 0}
          />
        </div>

        <div className="grid p-[20px] gap-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts &&
            posts.rows.map((p) => (
              <div className="overflow-hidden">
                <Card
                  actions={[
                    <a onClick={() => setModalOpen(p.id)}>Комментарии</a>,
                  ]}
                  extra={
                    <p>
                      {new Date(p.createdAt).toISOString().substring(0, 10)}
                    </p>
                  }
                  title={p.title}
                  bordered={true}
                >
                  <p className="text-ellipsis">{p.text}</p>
                </Card>
                <Modal
                  title={p.title}
                  onCancel={() => setModalOpen(null)}
                  footer={() => <></>}
                  open={modalOpen === p.id}
                >
                  <Input
                    value={commentTitle}
                    onChange={(e) => setCommentTitle(e.target.value)}
                    className="mb-[20px]"
                    size="large"
                    placeholder="Заголовок"
                  />
                  <Input.TextArea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="mb-[20px]"
                    placeholder="Текст комментария"
                  />
                  <Button
                    onClick={() => handleCreateComment(p.id)}
                    disabled={!(commentTitle && commentText)}
                    className="mb-[40px]"
                  >
                    Отправить
                  </Button>

                  {p.comments &&
                    p.comments.map((c) => (
                      <Card
                        className="mb-[20px]"
                        actions={[
                          changeComment === c.id ? (
                            <a onClick={() => handleUpdateComment(c.id)}>
                              Отправить
                            </a>
                          ) : (
                            <a onClick={() => setChangeComment(c.id)}>
                              Изменить
                            </a>
                          ),
                          <a onClick={() => handleDeleteComment(c.id)}>
                            Удалить
                          </a>,
                        ]}
                        extra={
                          <p>
                            {new Date(c.createdAt)
                              .toISOString()
                              .substring(0, 10)}
                          </p>
                        }
                        title={
                          changeComment === c.id ? (
                            <Input
                              value={changeCommentTitle}
                              onChange={(e) =>
                                setChangeCommentTitle(e.target.value)
                              }
                              className="w-[70%]"
                            />
                          ) : (
                            c.title
                          )
                        }
                        bordered={true}
                      >
                        {changeComment === c.id ? (
                          <Input.TextArea
                            value={changeCommentText}
                            onChange={(e) =>
                              setChangeCommentText(e.target.value)
                            }
                          />
                        ) : (
                          <p className="text-ellipsis">{c.text}</p>
                        )}
                      </Card>
                    ))}
                </Modal>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
