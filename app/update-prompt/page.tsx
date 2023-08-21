"use client";

import Form from "@components/Form";
import { PromptAttr } from "@models/mongoose/Prompt";

import { FormEventHandler, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PromptAttr>({ prompt: "", tag: "" });
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      if (response.ok) {
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const body = JSON.stringify(post);

      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body,
      });
      if (response.ok) router.replace("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
