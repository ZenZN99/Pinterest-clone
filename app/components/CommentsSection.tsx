"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentItem, { ICommentPopulated } from "./CommentItem";

export default function CommentsSection({
  comments,
  currentUser,
  onCreate,
  onUpdate,
  onDelete,
  refresh,
  imageId,
  token,
}: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text.trim()) return;

    if (editingId) {
      await onUpdate(token, text, imageId, editingId);
      setEditingId(null);
    } else {
      await onCreate(token, text, imageId);
    }

    setText("");
    refresh();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {currentUser && (
        <CommentForm
          user={currentUser}
          value={text}
          setValue={setText}
          onSubmit={submit}
          editing={!!editingId}
        />
      )}

      <div className="flex flex-col gap-4 mt-6">
        {comments.map((c: ICommentPopulated) => (
          <CommentItem
            key={c._id}
            comment={c}
            currentUser={currentUser}
            onEdit={() => {
              setText(c.content);
              setEditingId(c._id);
              scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            onDelete={async () => {
              await onDelete(token, c._id);
              refresh();
            }}
          />
        ))}
      </div>
    </div>
  );
}
