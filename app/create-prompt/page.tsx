"use client";

import Form from "@components/Form";
import { PromptAttr } from "@models/mongoose/Prompt";
import { useSession } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PromptAttr>({ prompt: "", tag: "" });
  const router = useRouter();

  const { data: session } = useSession();

  const createPrompt: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const body = JSON.stringify({
        ...post,
        userId: session?.user?.id,
      });

      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body,
      });
      if (response.ok) router.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
