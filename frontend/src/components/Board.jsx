import Column from "./Column";

const columns = ["pendiente", "en_curso", "finalizado"];

export default function Board({ tasks, refresh }) {
    return (
        <div className="board" style={{ display: "flex", gap: "20px" }}>
            {columns.map(col => (
                <Column
                    key={col}
                    title={col}
                    tasks={tasks.filter(t => t.status === col)}
                    refresh={refresh}
                />
            ))}
        </div>
    );
}