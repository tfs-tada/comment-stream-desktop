import { useEffect, useState } from "react";
import { useServerSendEvent } from "./useServerSendEvent";
import "./index.css";

export const App = () => {
  const [comments, setComments] = useState<
    { comment: string; height: number }[]
  >([]);
  const [isControlled, setIsControlled] = useState(true);
  useServerSendEvent("http://localhost:5100/events", (event) => {
    const c = JSON.parse(event.data).comment;
    setComments((comments) => [
      ...comments,
      { comment: c, height: Math.floor(Math.pow(Math.random(), 1.5) * 500) },
    ]);
  });

  useEffect(() => {
    const changeControl = () => {
      setIsControlled((isControlled) => !isControlled);
      (window as any).electronAPI.sendIgnoreMouseEvents(true);
    };
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        changeControl();
      }
    });
    return () => {
      window.removeEventListener("keydown", changeControl);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: isControlled
          ? "rgba(100, 100, 255, 0.3)"
          : "transparent",
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
