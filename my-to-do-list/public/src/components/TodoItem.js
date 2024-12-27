import React, { useState } from 'react';

function TodoItem({ todo, onChange }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleToggleComplete = () => {
    const updatedTodo = { ...todo, completed: !isCompleted };
    onChange(updatedTodo); 
  };

  return (
    <li>
      <input 
        type="checkbox" 
        checked={isCompleted} 
        onChange={handleToggleComplete} 
      />
      {todo.title}
    </li>
  );
}

export default TodoItem;