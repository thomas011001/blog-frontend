import { useEffect, useState } from "react";
import {
  InputField,
  InputTitle,
  TextArea,
  Input,
} from "../components/InputField";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [text, setText] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/signup");
    }
  }, [user, userLoading, navigate, isPublished]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      photoUrl,
      text,
    };

    if (isPublished) {
      body.isPublished = isPublished;
    }
    const res = await api.post("/posts", body);

    const id = res.data.data.id;
    navigate(`/posts/${id}`);
  };
  return (
    <div className="flex flex-col gap-5 my-5 max-w-200 mx-auto flex-1 w-full">
      <header className="flex flex-col sm:flex-row  gap-2 justify-between w-full">
        <h1 className="text-4xl sm:text-5xl text-foreground font-serif">
          Create New Article
        </h1>
      </header>
      <hr />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex gap-5 w-full flex-wrap">
          <InputField className="flex-1">
            <InputTitle>*Title:</InputTitle>
            <Input
              placeholder="Title"
              value={title}
              handler={(e) => setTitle(e.target.value)}
              required
            />
          </InputField>
          <InputField className="flex-1 flex-row items-center">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />
            <InputTitle>Publish?</InputTitle>
          </InputField>
        </div>
        <InputField>
          <InputTitle>Avatar Url:</InputTitle>
          <Input
            placeholder={"Photo Url"}
            type="url"
            value={photoUrl}
            handler={(e) => setPhotoUrl(e.target.value)}
          />
        </InputField>
        <InputField>
          <InputTitle>*Description:</InputTitle>
          <TextArea
            placeholder={"Description"}
            type="text"
            value={description}
            handler={(e) => setDescription(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <InputTitle>*Text:</InputTitle>
          <TextArea
            placeholder={"Text"}
            type="text"
            value={text}
            handler={(e) => setText(e.target.value)}
            rows={5}
            required
          />
        </InputField>
        <Button>Create</Button>
      </form>
    </div>
  );
}
