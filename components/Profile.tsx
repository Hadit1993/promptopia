import PromptEntity from "@models/front/PromptEntity";
import React, { FC } from "react";
import PropmptCard from "./PropmptCard";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

interface ProfileProps {
  name: string;
  desc: string;
  data: PromptEntity[];
  handleEdit?: (post: PromptEntity) => Promise<void>;
  handleDelete?: (post: PromptEntity) => Promise<void>;
}

const Profile: FC<ProfileProps> = ({
  name,
  desc,
  data,
  handleDelete,
  handleEdit,
}) => {
  const { data: session } = useSession();

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PropmptCard
            key={post._id}
            post={post}
            session={session}
            handleEdit={handleEdit ? () => handleEdit(post) : undefined}
            handleDelete={handleDelete ? () => handleDelete(post) : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
