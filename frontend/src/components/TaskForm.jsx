import { useState } from "react";
import API from "../services/api";

export default function TaskForm({ status, refresh }) {
    const [title, setTitle] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            setLoading(true);

            await API.post("/", {
                title,
                status
            });

            setTitle("");
            setIsOpen(false);
            refresh();
        } catch (error) {
            console.error("Error al crear tarea:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Vista cerrada (botón tipo Trello)
    if (!isOpen) {
        return (
            <div
                onClick={() => setIsOpen(true)}
                style={{
                    padding: "8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: "#555",
                    transition: "0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#e4e6ea"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
                ➕ Agregar tarea
            </div>
        );
    }

    // 🔹 Vista abierta (formulario)
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
            <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribí una tarea..."
                autoFocus
                style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "none",
                    padding: "10px",
                    resize: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    marginBottom: "8px"
                }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: "#0079bf",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Agregando..." : "Agregar"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setIsOpen(false);
                        setTitle("");
                    }}
                    style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "18px",
                        cursor: "pointer"
                    }}
                >
                    ✖
                </button>
            </div>
        </form>
    );
}