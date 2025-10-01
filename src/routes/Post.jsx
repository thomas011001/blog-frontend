import { Link, useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import Avatar, { AvatarImg } from "../components/Avatar";
import formateDate from "../utils/formateDate";
import { Clock, Heart, MessageCircleMore, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { InputField, InputTitle, TextArea } from "../components/InputField";
import { Button } from "../components/Button";
import ConfirmOrder from "../components/confirmOrder";

export default function Post() {
  const id = useParams().id;
  const { user } = useAuth();
  const {
    data,
    loading,
    error,
    addComment,
    reomveComment,
    giveLike,
    removeLike,
  } = usePost(id);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!loading) {
      setLike(data?.likes?.some((like) => like.user.id === user?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const handleLoveClick = async () => {
    if (!like) {
      await giveLike();
      setLike(true);
    } else {
      await removeLike();
      setLike(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const text = comment;
    setComment("");
    await addComment({ text });
  };

  const handleRemoveComment = async (id) => {
    const deleteComment = async () => {
      await reomveComment(id);
    };
    ConfirmOrder(deleteComment, "Are You Sure To Delete The Comment?");
  };

  return (
    <div className="flex flex-col gap-5 my-5 max-w-200 mx-auto flex-1 w-full">
      {loading ? (
        "loading..."
      ) : (
        <>
          <header className="flex flex-col gap-3">
            <h1 className="font-extrabold font-serif text-5xl text-primary">
              {data.title}
            </h1>
            <p className="text-muted-foreground font-serif text-xl">
              {data.description}
            </p>
            <div className="flex gap-1 items-center ">
              <Avatar className="!border-0">
                <AvatarImg
                  src={data.author.avatarUrl}
                  className="size-8 border"
                />
              </Avatar>
              <h3 className="text-lg text-primary">
                <Link to={`/users/${data.author.id}`}>
                  {data.author.username}
                </Link>
              </h3>
            </div>
          </header>
          <hr />
          <div className="flex gap-4 flex-wrap">
            <p className="flex gap-2 items-center text-primary ">
              <Heart
                className={like ? "fill-black" : ""}
                onClick={handleLoveClick}
              />
              {data._count.likes}
            </p>
            <p className="flex gap-2 items-center text-primary">
              <MessageCircleMore />
              {data._count.comments}
            </p>
            <p className="flex gap-2 items-center text-primary">
              <Clock />
              {formateDate(data.createdAt)}
            </p>
          </div>
          <hr />
          <p className="text-lg flex-1  ">{data.text}</p>
          <hr />
          <div className="flex gap-3 flex-col">
            <form onSubmit={handleAddComment}>
              <InputField>
                <InputTitle>Add Comment:</InputTitle>
                <TextArea
                  value={comment}
                  handler={(e) => setComment(e.target.value)}
                  required
                  placeholder={"Add Comment"}
                />
              </InputField>
              <button className="hidden" type="submit"></button>
            </form>
            {data.comments.map((c) => (
              <div
                key={c.id}
                className="bg-input p-3 rounded border-border border-1 flex gap-2 flex-col"
              >
                <div className="flex flex-row gap-1 items-center w-full">
                  <Avatar className="!border-0">
                    <AvatarImg
                      src={c.user.avatarUrl}
                      className="size-5 border"
                    />
                  </Avatar>
                  <h3 className="text-sm  text-primary">{c.user.username}</h3>
                  {user?.id == c.user.id ? (
                    <Button
                      onClick={() => handleRemoveComment(c.id)}
                      className="!bg-destructive text-destructive-foreground !p-1 text-sm ml-auto h-fit"
                    >
                      <Trash2 className="size-5" />
                    </Button>
                  ) : null}
                </div>
                {c.text}
                <p className="text-sm text-muted-foreground">
                  {formateDate(c.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
