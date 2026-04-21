"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";





export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");



  // crud functions 
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Session expired, login again");
      router.push("/login");
    }
  };

  const addTask = async () => {
    try {
      if (!title) return;
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add task");
    }
  };





  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">TASK APP for primetrade.ai</div>
        <div className="logo">by Manas :)</div>
        <div className="nav-item">Dashboard</div>
        <div className="nav-item">My Tasks</div>
      </div>

      {/* Main */}
      <div className="main">
        <h2 style={{ marginBottom: "20px" }}>Your Tasks</h2>

        <input
          placeholder="Create new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>

        <div style={{ marginTop: "20px" }}>
          {tasks.map((t) => (
            <div key={t._id} className="card">
              <div>{t.title}</div>
              <button
                style={{ marginTop: "10px", background: "#ff4d4f" }}
                onClick={() => deleteTask(t._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}