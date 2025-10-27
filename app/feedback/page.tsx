"use client";

import { useState, useEffect } from "react";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Fetch all feedback on load
  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedback(data));
  }, []);

  // Submit feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, comment }),
    });

    if (res.ok) {
      alert("Feedback submitted!");
      setName("");
      setComment("");
      const updated = await fetch("/api/feedback");
      setFeedback(await updated.json());
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Feedback Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Your feedback"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <h2>All Feedback</h2>
      <ul>
        {feedback.map((f, index) => (
          <li key={index}>
            <strong>{f.name}</strong>: {f.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
