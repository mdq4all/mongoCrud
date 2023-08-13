"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";


export default function FormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const updateTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (res.status === 200) {
        router.push("/");
        router.refresh();   
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function createTask() {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (res.status === 200) {
        router.push("/");
        router.refresh();

      }    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      await createTask();
    } else {
      updateTask()
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Desea eliminar?")) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "DELETE",
      });
      router.push("/");
      router.refresh();
    }
  };

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({
      title: data.title || "",
      description: data.description || "",
    });
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, [params.id]);

  return (
    <div className="h-[calc(100vh-100px)] flex justify-center items-center">
      <form
        className="bg-gray-500 p-6 rounded-lg w-[40%]"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black font-bold text-xl p-2">
            {!params.id ? "Add task" : "Update task"}
          </h1>
          {params.id && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 px-4 py-2 text-white rounded-lg"
            >
              Delete
            </button>
          )}
        </div>

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={newTask.title}
          className="block bg-transparent border-solid border-[2px] border-black rounded-lg p-3 mb-4 w-full"
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          rows={3}
          onChange={handleChange}
          value={newTask.description}
          className="block bg-transparent border-solid border-[2px] border-black rounded-lg p-3 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 p-4 rounded-lg duration-500"
        >
          {params.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}
