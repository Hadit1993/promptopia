import { HydratedDocument, Model, Schema, model, models } from "mongoose";

interface UserAttrs {
  email: string;
  username: string;
  image?: string;
}

interface UserDoc extends Document {
  email: string;
  username: string;
  image?: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): HydratedUserDocument;
  findByEmail(email: string): Promise<HydratedUserDocument | null>;
}

export type HydratedUserDocument = HydratedDocument<UserDoc>;

const UserSchema = new Schema<UserDoc, UserModel>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },

  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },

  image: String,
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

UserSchema.statics.findByEmail = function (
  email: string
): Promise<HydratedUserDocument | null> {
  return this.findOne({
    email: {
      $regex: new RegExp(`^${email}$`, "i"),
    },
  });
};

const User =
  (models.User as UserModel) ?? model<UserDoc, UserModel>("User", UserSchema);

export default User;
