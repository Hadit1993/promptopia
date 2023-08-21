"use client";

import Profile from "@components/Profile";
import PromptEntity from "@models/front/PromptEntity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();

  const [posts, setposts] = useState<PromptEntity[]>([]);

  const router = useRouter();

  const handleEdit = async (post: PromptEntity) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PromptEntity) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setposts(posts.filter((val) => val._id !== post._id));
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(session?.user?.id);
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      if (response.ok) {
        const data = await response.json();
        setposts(data);
      }
    };

    if (session?.user) fetchPosts();
  }, [session?.user]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
