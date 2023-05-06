import { ITask } from "@/types/tasks";
import Task from "./Task";


interface TodoListProps {
    tasks : ITask[]
}


const TodoList: React.FC<TodoListProps> = ({tasks}) =>{
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>할일</th>
        <th>행동</th>
      </tr>
    </thead>
    <tbody>
     {tasks.map(task => <Task task={task} key={task.id} />)}
    </tbody>
  </table>
</div>
        </div>
    );
}

export default TodoList;