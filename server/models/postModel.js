const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  text: {type: String, required: false},
  image: {type: String, required: false},
  likes: {type: Number, required: false, default: 0},
  comments: {type: Array, required: false, default: []}
}, {timestamps: true});

const Posts = mongoose.model("Post", PostSchema);

module.exports = Posts;