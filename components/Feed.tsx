"use client";
import React, { ChangeEventHandler, FC, useEffect, useState } from "react";
import PropmptCard from "./PropmptCard";
import PromptEntity from "@models/front/PromptEntity";
import useDebounce from "@hooks/useDebounce";
import { useSession } from "next-auth/react";

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setposts] = useState<PromptEntity[]>([]);

  const debouncedTextSearch = useDebounce(searchText, 500);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const value = event.target.value;
    setsearchText(value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const url = debouncedTextSearch
        ? `/api/prompt?term=${encodeURIComponent(debouncedTextSearch)}`
        : "/api/prompt";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setposts(data);
      }
    };

    fetchPosts();
  }, [debouncedTextSearch]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(tag: string) => {
          setsearchText(tag);
        }}
      />
    </section>
  );
};

const PromptCardList: FC<{
  data: PromptEntity[];
  handleTagClick: (tag: string) => void;
}> = ({ data, handleTagClick }) => {
  const { data: session } = useSession();
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PropmptCard
          key={post._id}
          post={post}
          session={session}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default Feed;
