import React from "react";

const Todo = ({ id, title, description, isCompleted, mongoId, toggleTodo, deleteTodo }) => {
    return (
        <tr>
            <th>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleTodo(mongoId)}
                    />
                </label>
            </th>
            <td>
                <div className={`flex items-center gap-3 ${isCompleted ? "line-through" : ""}`}>
                    <div className="font-bold">{id}</div>
                </div>
            </td>
            <td>
                <div className={`flex items-center gap-3 ${isCompleted ? "line-through" : ""}`}>
                    <div className="font-bold">{title}</div>
                </div>
            </td>
            <td>
                <div className={`flex items-center gap-3 ${isCompleted ? "line-through" : ""}`}>
                    <div className="font-bold">{description}</div>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="font-bold">{isCompleted ? "Completed" : "Pending"}</div>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <button onClick={() => deleteTodo(mongoId)} className="btn btn-outline btn-error">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default Todo;
