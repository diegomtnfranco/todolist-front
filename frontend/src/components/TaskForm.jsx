import { useState } from "react";
import API from "../services/api";

export default function TaskForm({ status, refresh }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("El título es obligatorio");
            return;
        }

        await API.post("/", { title, status });
        setTitle("");
        refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Nueva tarea"
            />
            <button>Agregar</button>
        </form>
    );
}