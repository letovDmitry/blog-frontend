import { Input, Button } from "antd";
import { useState } from "react";
import { useCreatePostMutation } from "../store/services/postApi";

export default function CreatePostForm() {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [createPost] = useCreatePostMutation();

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

  return (
    <>
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
        </div>
      </div>
    </>
  );
}
