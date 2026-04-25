import { DndContext } from "@dnd-kit/core";
import Column from "./Column";

const columns = ["pendiente", "en_curso", "finalizado"];

export default function Board({ tasks, refresh }) {

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id;

        await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });

        refresh();
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", gap: "20px" }}>
                {columns.map(col => (
                    <Column
                        key={col}
                        columnId={col}
                        title={col}
                        tasks={tasks.filter(t => t.status === col)}
                        refresh={refresh}
                    />
                ))}
            </div>
        </DndContext>
    );
}