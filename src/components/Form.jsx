import React, { useContext, useState, useEffect } from 'react'
import { TasksContext } from '../Tasks Context/TasksContext';

const Form = () => {
  const { sendTask, taskEdit, updateTask } = useContext(TasksContext);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // If "taskEdit" is true, the current values of "text", "description" and "time" are automatically set to their respective previously saved values located on the server
    // These new values are immediately displayed on the screen
    if (taskEdit.edit === true) {
      setText(taskEdit.item.reminderText);
      setDescription(taskEdit.item.description);
      setTime(taskEdit.item.dueDate);
    }
  }, [taskEdit])


  const handleSubmit = e => {
    e.preventDefault();
    // The "reminderText", "description" and "dueDate"  values provided by the user are saved and assigned an "id" to. 
    // These values are all stored as an object "newTask"
    let newTask = {id: String(new Date().getMilliseconds()), reminderText: text, description: description, dueDate: time, isCompleted: false};
    // If there's a need for an update, the "updateTask" function is called while passing the "id" of selected task and the data with which it should be updated
    if (taskEdit.edit === true) {
      updateTask(taskEdit.item.id, newTask);
    } else {
      // If there's no update, the "newTask" created is sent to the server 
      sendTask(newTask);
    }
    // The imput fields are cleared-out after submission
    setText('');
    setDescription('');
    setTime('');
  };


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='form-field'>
                <label className="platypi-bold">What do you want to do?</label>
                <input type="text" 
                value={text} 
                onChange={e => setText(e.target.value)} 
                required
                placeholder="What's the task?" />
            </div>
            <div className="form-field">
              <label className="platypi-bold">Task Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe it here..." required name="task-description" id="task-description" cols="30" rows="10"></textarea>
            </div>
            <div className='form-field'>
                <label className="platypi-bold">When?</label>
                <input type="date"
                value={time}
                required
                onChange={e => setTime(e.target.value)} />
            </div>
            <button className="platypi-semibold" type="submit">Add Item</button>
        </form>
    </div>
  )
}

export default Form