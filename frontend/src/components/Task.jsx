import API from "../services/api";

export default function Task({ task, refresh }) {

    const deleteTask = async () => {
        await API.delete(`/${task.id}`);
        refresh();
    };

    return (
        <div className="task" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p>{task.title}</p>
            <button className="delete-btn" onClick={deleteTask}>Eliminar</button>
        </div>
    );
}