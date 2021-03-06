import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");

  const [todos, setTodos] = useState([]);

  // Reference to the collection in our db
  const todosCollectionRef = collection(db, "todos");

  const createTodo = async () => {
    await addDoc(todosCollectionRef, { task: newTask, completed: false });
  };

  const updateTodo = async (id, completed) => {
    const userDoc = doc(db, "todos", id);
    const newFields = { completed: !completed };
    await updateDoc(userDoc, newFields);
  };

  const deleteTodo = async (id) => {
    const userDoc = doc(db, "todos", id);
    await deleteDoc(userDoc);
  };

  // Function to populate the state with Task Items from db
  // Deprecated in fao
  const getTodos = async () => {
    const data = await getDocs(todosCollectionRef);
    //Looping through the awkward doc object returned by the db and setting the state value to DATA + ID
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // When the page first renders, populate the state with TODOS
  // Now using onSnapshot listene to detect changes across different instances :)
  useEffect(() => {
    onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <div
      className="App"
      onClick={() => {
        getTodos();
      }}
    >
      <input
        placeholder="Create Task"
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button onClick={createTodo}>Create Task</button>

      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {" "}
            <h1>Task: {todo.task}</h1>
            <h1>Completed: {todo.completed ? "Done" : "Not Done"}</h1>
            <button
              onClick={() => {
                updateTodo(todo.id, todo.completed);
              }}
            >
              CHECK
            </button>
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
            <p>------------</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
