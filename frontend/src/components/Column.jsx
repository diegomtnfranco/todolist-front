import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";
import TaskForm from "./TaskForm";

export default function Column({ columnId, title, tasks, refresh }) {

    const { setNodeRef, isOver } = useDroppable({
        id: columnId
    });

    return (
        <div
            ref={setNodeRef}
            className="column"
            style={{
                background: isOver ? "#e3f2fd" : "#f4f5f7",
                padding: "12px",
                borderRadius: "12px",
                width: "300px",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                transition: "0.2s"
            }}
        >
            {/* Título */}
            <h3 style={{ textTransform: "capitalize", marginBottom: "10px" }}>
                {title.replace("_", " ")}
            </h3>

            {/* Formulario estilo Trello */}
            <TaskForm status={columnId} refresh={refresh} />

            {/* Lista de tareas */}
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        refresh={refresh}
                    />
                ))}
            </div>
        </div>
    );
}