import { useEffect, useState } from "react";
import { useServerSendEvent } from "./useServerSendEvent";
import "./index.css";

export const App = () => {
  const [comments, setComments] = useState<
    { comment: string; height: number }[]
  >([]);
  useServerSendEvent("http://localhost:5100/events", (event) => {
    const c = JSON.parse(event.data).comment;
    setComments((comments) => [
      ...comments,
      { comment: c, height: Math.floor(Math.pow(Math.random(), 1.5) * 500) },
    ]);
  });

  const [isTransparent, setIsTransparent] = useState(false);
  useEffect(() => {
    (window as any).electronAPI.onMainTransparent((transparent: boolean) => {
      setIsTransparent(transparent);
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: isTransparent
          ? "transparent"
          : "rgba(100, 100, 255, 0.2)",
        transition: "height 0.5s",
      }}
    >
      {comments.map((comment, index) => (
        <div
          key={index}
          className="myElement"
          style={{
            top: `${comment.height}px`,
            width: "100%",
            position: "absolute",
          }}
        >
          {comment.comment}
        </div>
      ))}
    </div>
  );
};
