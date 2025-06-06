import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function MessageItem({ item, onReplied }) {
  const [showReply, setShowReply] = useState(false);
  const [text, setText] = useState("");

  const sendReply = async () => {
    if (!text.trim()) return;

    await fetch(`http://localhost:5000/api/messages/${item.id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setShowReply(false);
    setText("");
    onReplied();
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <strong>{item.senderRole}</strong> • {item.senderName}
          <div className="text-muted small">{item.content}</div>
        </div>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => setShowReply(!showReply)}
        >
          Reply
        </Button>
      </div>

      {showReply && (
        <Form
          className="mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendReply();
          }}
        >
          <Form.Control
            placeholder="Type your reply…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mb-2"
          />
          <Button size="sm" type="submit">
            Send
          </Button>
        </Form>
      )}
    </li>
  );
}
