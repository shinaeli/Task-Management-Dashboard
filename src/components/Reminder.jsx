import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TasksContext } from '../Tasks Context/TasksContext'

const Reminder = ({reminderText, id, isCompleted, description, dueDate }) => {
  const { editTask, deleteTask } = useContext(TasksContext);

  return (
    <div className="reminder">
      <section className="reminder-container">
        <p className='platypi-bold task'>{reminderText}</p>
        <p className='platypi-semibold due-date'>{dueDate}</p>
        <p className="platypi-semibold">{isCompleted ? 'Completed' : 'Pending'}</p>
        <img onClick={() => deleteTask(id)} src="/Icons/delete.svg" alt="delete-icon" />
        <img onClick={() => editTask({id, reminderText, description, dueDate, isCompleted})} src="/Icons/redo.svg" alt="redo-icon" />
      </section>
      <section className="description">
        <p className="platypi-regular">{description}</p>
      </section>
    </div>
  )
}

Reminder.propTypes = {
    reminderText: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

Reminder.defaultProps = {
    reminderText: "Read Books",
}

export default Reminder