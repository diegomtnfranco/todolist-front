import { useEffect, useState } from "react";
import API from "./services/api";
import Board from "./components/Board";
import "../src/App.css";

function App() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const res = await API.get("/");
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Kanban App</h1>
            <Board tasks={tasks} refresh={fetchTasks} />
        </div>
    );
}

export default App;
