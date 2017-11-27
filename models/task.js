/* this is the schema for when task are enter into the db */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Define your schema: what fields will one task document have
var taskSchema = new Schema( {
  text: String,
  completed: Boolean,
  
  /* Reference the user object who created the task
  Useful if we need to access info about the user from the task. */

  creator: { type: ObjectId, ref: 'User'}
  
});

// Compile taskSchema into Mongoose model object
var Task = mongoose.model('Task', taskSchema);

// And export the Task so our other code can use it
module.exports = Task;
