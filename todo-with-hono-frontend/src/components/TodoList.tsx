import { TodoType } from "../App";
import Todo from "./Todo";

interface TodoListProps {
  todos: TodoType[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
