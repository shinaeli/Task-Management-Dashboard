import React from 'react'
import Reminder from './Reminder'
import PropTypes from 'prop-types'

const RemindersList = ({ filteredItems }) => {
  return (
    <div>
        {filteredItems.map(reminder => {
            const {reminderText, id, description, dueDate, isCompleted} = reminder;
            return <Reminder key={id} 
            id={id}
            reminderText={reminderText} 
            dueDate={dueDate} 
            description={description}
            isCompleted={isCompleted}  />
        })}
    </div>
  )
}

RemindersList.propTypes = {
   filteredItems: PropTypes.array.isRequired,
}

export default RemindersList