import {
  Model,
  HydratedDocument,
  Schema,
  models,
  model,
  Types,
} from "mongoose";

export interface PromptAttr {
  prompt: string;
  tag: string;
  userId?: string;
}

interface PromptDoc extends Document {
  prompt: string;
  tag: string;
  creator?: string;
}

interface PromptModel extends Model<PromptDoc> {
  build(attrs: PromptAttr): HydratedPromptDocument;
}

export type HydratedPromptDocument = HydratedDocument<PromptDoc>;

const PromptSchema = new Schema<PromptDoc, PromptModel>({
  creator: {
    type: Types.ObjectId,
    ref: "User",
  },

  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },

  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

PromptSchema.statics.build = (attrs: PromptAttr) => {
  return new Prompt({
    prompt: attrs.prompt,
    tag: attrs.tag,
    creator: attrs.userId,
  });
};

const Prompt =
  (models.Prompt as PromptModel) ??
  model<PromptDoc, PromptModel>("Prompt", PromptSchema);

export default Prompt;
