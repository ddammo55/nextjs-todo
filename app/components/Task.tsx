'use client';

import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from "./Modal";
import { deleteTodo, editTodo } from "@/api";
interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({task}) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit ] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const handleSubmitNewEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id : task.id,
            text: taskToEdit,
        });
        setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();
    }

    const haneleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
    }

    return (
 
            <tr key={task.id}>
                <td className="w-full">{task.text}</td>
               <td className="flex gap-5">
                    <FiEdit onClick={()=> setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>

                    <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                        <form onSubmit={handleSubmitNewEditTodo}>
                        <h3 className='font-bold text-lg'>Edit new task</h3>  
                        <div className='modal-action'>
                        <input value={taskToEdit}
                        onChange = {e => setTaskToEdit(e.target.value)}
                        type="text" placeholder="Type here" className="input input-bordered w-full" />
                        <button type="submit" className='btn'>Add</button>
                        </div>
                        </form>
                    </Modal>

                    <FiTrash2 onClick={()=> setOpenModalDeleted(true)} cursor="pointer" className="text-red-500" size={25}/>
                    <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                        <h3 className="text-lg">정말 삭제 하시겠습니까?</h3>
                        <div className="modal-action">
                            <button
                            onClick={() => haneleDeleteTask(task.id)}
                            className="btn"
                            >Yes</button>
                        </div>
                    </Modal>
               </td>
            </tr>
   
    );
}

export default Task;
