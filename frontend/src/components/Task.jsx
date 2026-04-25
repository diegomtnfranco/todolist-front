import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import API from "../services/api";

export default function Task({ task, refresh }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id
    });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        padding: "10px",
        marginBottom: "10px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
    };

    // 🟡 eliminar
    const handleDelete = async () => {
        if (!confirm("¿Eliminar tarea?")) return;

        await API.delete(`/${task.id}`);
        refresh();
    };

    // 🟡 editar
    const handleUpdate = async () => {
        if (!newTitle.trim()) return;

        await API.put(`/${task.id}`, {
            title: newTitle,
            status: task.status
        });

        setIsEditing(false);
        refresh();
    };

    return (
        <div ref={setNodeRef} style={style}>
            
            {/* 🔵 MODO EDICIÓN */}
            {isEditing ? (
                <div>
                    <input
                         value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            e.preventDefault();
                            handleUpdate();
                             }
                if (e.key === "Escape") {
                setIsEditing(false);
        }
    }}
/>

                    <button onClick={handleUpdate}>💾</button>
                    <button onClick={() => setIsEditing(false)}>❌</button>
                </div>
            ) : (
                
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    
                    {/* 🔵 TEXTO + DRAG */}
                    <span
                        {...listeners}
                        {...attributes}
                        style={{ cursor: "grab", flex: 1 }}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.title}
                    </span>

                    {/* 🔵 ACCIONES */}
                    <div style={{ display: "flex", gap: "5px" }}>
                        <button onClick={() => setIsEditing(true)}>✏️</button>
                        <button onClick={handleDelete}>🗑️</button>
                    </div>
                </div>
            )}
        </div>
    );
}