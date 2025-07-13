"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdMenu, MdStar, MdHeartBroken, MdEditCalendar } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Splash from "./component/splash";
import Sidebar from "./component/Sidebar";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function TodoPage() {
const { token, logout, loading } = useAuth();
const router = useRouter();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [tasks, setTasks] = useState([]);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [filter, setFilter] = useState("all");
const [dueDate, setDueDate] = useState(new Date());
const [showSplash, setShowSplash] = useState(true);
const [search, setSearch] = useState("");
const [sortOrder, setSortOrder] = useState("newest");
const [editingIndex, setEditingIndex] = useState(null);
const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (!loading && !token) router.push("/login");
  }, [token, loading]);

  useEffect(() => {
    if (!listening && transcript) {
      if (!title.trim()) setTitle(transcript);
      else setDescription((prev) => (prev ? prev + " " + transcript : transcript));
      resetTranscript();
    }
  }, [listening]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,{ title,description,favourite: false, completed: false, duedate: new Date(dueDate).toISOString(),},
    ]);
    setTitle("");
    setDescription("");
  };

  const deleteHandler = (idx) => {
    const copy = [...tasks];
    copy.splice(idx, 1);
    setTasks(copy);
  };

  const todayStr = new Date().toDateString();
  let visibleTasks = filter === "all" ? tasks : tasks.filter((t) => t.favourite);
  if (filter === "today") visibleTasks = tasks.filter((t) => new Date(t.duedate).toDateString() === todayStr);
  if (filter === "upcoming") visibleTasks = tasks.filter((t) => new Date(t.duedate) > new Date());
  if (filter === "missed") visibleTasks = tasks.filter((t) => new Date(t.duedate) < new Date());

  visibleTasks = visibleTasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  visibleTasks.sort((a, b) => {
    const dA = new Date(a.duedate);
    const dB = new Date(b.duedate);
    return sortOrder === "newest" ? dB - dA : dA - dB;
  });
  if (showSplash) return <Splash onFinish={() => setShowSplash(false)} />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <header className="w-full flex justify-end px-6 py-4">
        {token ? (
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-bold transition">Logout</button>
        ) : (
          <button onClick={() => router.push("/login")} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-bold transition">Login</button>
        )}
      </header>

      <button onClick={() => setSidebarOpen(true)} className="fixed left-4 top-4 z-50 text-white/80 text-3xl hover:text-white transition-all">
        <MdMenu />
      </button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} current={filter} setFilter={setFilter} />

      <h1 className="text-5xl font-extrabold text-center py-8 drop-shadow-lg">📝 Abdul Rehman’s MERN To-Do App (with Voice Support)</h1>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}  placeholder="🔍 Search tasks..." className="block w-full max-w-xl mx-auto bg-white/10 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
      />

      <div className="max-w-xl mx-auto mt-4 flex justify-between items-center px-4">
        <p className="text-white text-md">
          ✅ {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
        </p>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="bg-white/20 text-white p-2 rounded-md">
          <option value="newest">📅 Newest First</option>
          <option value="oldest">🕒 Oldest First</option>
        </select>
      </div>

      <form onSubmit={submitHandler} className="w-full max-w-xl mx-auto p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-md border border-white/20">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Task Title" required className="w-full text-lg p-3 my-3 rounded-md bg-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" required className="w-full text-lg p-3 my-3 rounded-md bg-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <div className="relative w-full my-3">
          <DatePicker selected={dueDate} onChange={setDueDate} minDate={new Date()} placeholderText="Due Date" className="w-full text-lg p-3 pr-12 rounded-md bg-white/20 text-white placeholder:text-white/60 focus:outline-none" />
          <MdEditCalendar size={24} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
        </div>
        <button type="button" onClick={() => { resetTranscript(); SpeechRecognition.startListening(); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-md transition">
          🎙 {listening ? "Listening…" : "Speak Task"}
        </button>
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 mt-4 rounded-lg transition-all">➕ Add Task</button>
      </form>

      <div className="w-full max-w-2xl mx-auto mt-10 px-6">
        <AnimatePresence>
          {visibleTasks.length === 0 ? (
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-2xl font-semibold text-white mt-8">
              No Task Available 😔
            </motion.h2>
          ) : (
            visibleTasks.map((task, idx) => (
              <motion.li  key={idx} initial={{ opacity: 0, scale: 0.95, y: 20 }}  animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 border border-white/30 shadow-xl rounded-xl p-6 my-4 backdrop-blur-md text-white flex justify-between items-center hover:scale-105 transition-all"   >
                <div className="flex items-start gap-3 w-full">
                  <input className="w-5 h-5 mt-1"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      const copy = [...tasks];
                      copy[idx].completed = !copy[idx].completed;
                      setTasks(copy);
                    }}
                   
                  />
                  <div className="flex-1">
                    {idx === editingIndex ? (
                      <>
                        <input  className="w-full bg-white/20 p-2 rounded text-white mb-1" value={editedTask.title}  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} placeholder="Edit title"
                        
                        />
                        <input  className="w-full bg-white/20 p-2 rounded text-white" value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} placeholder="Edit description"
                         />
                      </>
                    ) : (
                      <>
                        <h3 className={`text-xl font-bold ${task.completed ? "line-through text-green-400" : ""}`}>{task.title}</h3>
                        <p className="text-md text-gray-300">{task.description}</p>
                      </>
                    )}
                    <p className="text-sm text-emerald-400">Due: {new Date(task.duedate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {idx === editingIndex ? (
                    <button
                      onClick={() => {
                        const updated = [...tasks];
                        updated[idx] = { ...updated[idx], ...editedTask };
                        setTasks(updated);
                        setEditingIndex(null);
                        setEditedTask({ title: "", description: "" });
                      }}
                     className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg transition"
                    >✅ Save</button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingIndex(idx);
                        setEditedTask({ title: task.title, description: task.description });
                      }} 
                      className="text-yellow-400 font-bold bg-sky-500 hover:bg-sky-600 px-4 py-2  rounded-lg transition"
                    >✏️ Edit</button>
                  )}
                  <button onClick={() => deleteHandler(idx)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-white transition">❌ Delete</button>
                  <button className={`${task.favourite ? "text-yellow-400" : "text-white/60"} text-2xl`} onClick={() => {
                      const copy = [...tasks];
                      copy[idx].favourite = !copy[idx].favourite;
                      setTasks(copy);
                    }}
                    title="Favourite" >
                    <MdStar />
                  </button>
                </div>
              </motion.li>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}