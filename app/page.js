"use client";
import Todo from "../components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [todoData, setTodoData] = useState([]);

  const onChangeHandler = (e) => {
    setFormData((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", { params: { mongoId: id } });
    toast.success(response.data.msg);
    await fetchTodos();
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.put("/api", {}, { params: { mongoId: id } });
      toast.success(response.data.msg);
      await fetchTodos(); // Refresh the list to reflect the new status
    } catch (error) {
      toast.error("Failed to toggle todo status.");
    }
  };

  const fetchTodos = async () => {
    const response = await axios("/api");
    setTodoData(response.data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-12 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter Title..."
          onChange={onChangeHandler}
          value={formData.title}
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Enter Description..."
          onChange={onChangeHandler}
          value={formData.description}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-warning">
          Add Todo
        </button>
      </form>

      <div className="overflow-y-scroll mt-8 mx-auto max-w-[1100px] w-screen">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => (
              <Todo
                key={index}
                id={index + 1}
                title={item.title}
                description={item.description}
                isCompleted={item.isCompleted}
                mongoId={item._id}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo} // New handler for toggling
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
