"use client";

import Profile from "@components/Profile";
import PromptEntity from "@models/front/PromptEntity";
import UserEntity from "@models/front/UserEntity";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfilePage = () => {
  const { id } = useParams();

  const [posts, setposts] = useState<PromptEntity[]>([]);

  const [user, setUser] = useState<UserEntity>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      if (response.ok) {
        const data = await response.json();
        setposts(data);
      }
    };

    const fetchUser = async () => {
      const response = await fetch(`/api/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };

    if (id) {
      fetchUser();
      fetchPosts();
    }
  }, [id]);

  return user ? (
    <Profile
      name={user.username}
      desc={`Welcome to ${user.username}'s profile page`}
      data={posts}
    />
  ) : (
    <></>
  );
};

export default UserProfilePage;
