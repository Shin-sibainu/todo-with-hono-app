import { TodoType } from "../App";
import Todo from "./Todo";

interface TodoListProps {
  todos: TodoType[];
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}

const TodoList = ({ todos, onDelete, onEdit }: TodoListProps) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
