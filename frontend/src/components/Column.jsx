import Task from "./Task";
import TaskForm from "./TaskForm";

export default function Column({ title, tasks, refresh }) {
    return (
        <div className="column">
            <h2>{title}</h2>
            <TaskForm status={title} refresh={refresh} />
            {tasks.map(t => (
                <Task key={t.id} task={t} refresh={refresh} />
            ))}
        </div>
    );
}