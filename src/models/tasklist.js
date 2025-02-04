import { models, model, Schema } from "mongoose";
import { vv4 as uuidv4 } from "uuid";

const TaskSchema = new Schema({
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
});

const TaskList = models.TaskList || model("TaskList", TaskSchema);

export default TaskList;
