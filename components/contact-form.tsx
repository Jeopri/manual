"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // TODO: replace with your actual API route or email service (e.g. Resend, Nodemailer)
    try {
      await new Promise((res) => setTimeout(res, 1200)); // placeholder delay
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs text-muted-foreground tracking-wide uppercase">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:bg-card/80 transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs text-muted-foreground tracking-wide uppercase">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:bg-card/80 transition-all"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-xs text-muted-foreground tracking-wide uppercase">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:bg-card/80 transition-all"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs text-muted-foreground tracking-wide uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about the project, role, or idea..."
          className="bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:bg-card/80 transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl px-6 py-3.5 text-sm transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            Send message
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>

      {/* Feedback messages */}
      {status === "success" && (
        <p className="text-center text-sm text-muted-foreground">
          Message sent &mdash; I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-destructive">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}