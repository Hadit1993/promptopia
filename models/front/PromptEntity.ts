import UserEntity from "./UserEntity";

export default interface PromptEntity {
  _id: string;
  creator: UserEntity;
  prompt: string;
  tag: string;
}
