import { models, model, Schema } from "mongoose";
import { vv4 as uuidv4 } from "uuid";

const TaskSchema = new Schema(
  {
    taskId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    taskname: {
      type: String,
      required: true,
    },
    taskdesc: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["incomplete", "inprogress", "complete"],
      required: true,
    },
    seen: { type: Boolean, default: false }, // Track if seen

    // createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TaskList = models.TaskList || model("TaskList", TaskSchema);

export default TaskList;
