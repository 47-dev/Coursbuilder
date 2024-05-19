import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi"; 
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from '../modal/Modal';

const Resources = ({ module, onDelete, onEdit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDots = () => {
        setIsOpen(!isOpen);
    };

    const toggleEditModule = () => {
        setIsModalOpen(!isModalOpen);
        setIsOpen(false); // Close the dots menu when opening the modal
    };

    const handleEdit = (newName) => {
        onEdit(module.id, newName);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='flex w-[858px] h-[56px] rounded-[8px] border border-gray-300 gap-[8px] items-center bg-white relative z-0'>
                <IoMdArrowDropdown className='cursor-pointer border rounded-[32px] bg-white ml-[8px]'/>
                <div className='flex-grow font-avenir ml-[10px]'>
                    <h5 className='font-semibold text-[14px]'>{module.name}</h5>
                    <p className='text-[12px] text-gray-500'>Add items to this module</p>
                </div>
                <div className={`absolute z-10 right-0 top-full mt-2 bg-white border border-gray-300 rounded-[4px] shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
                    <div className='p-2'>
                        <div className='flex items-center mb-2 cursor-pointer' onClick={toggleEditModule}>
                            <LuPencilLine />
                            <p className='ml-2'>Edit module name</p>
                        </div>
                        <div className='flex items-center cursor-pointer' onClick={() => onDelete(module.id)}>
                            <RiDeleteBinLine className='text-[#D33852]' />
                            <p className='ml-2 text-[#D33852]'>Delete</p>
                        </div>
                    </div>
                </div> 
                <div className='cursor-pointer bg-[#F2F2F2] p-[8px] mr-[8px] rounded-[4px]' onClick={toggleDots}>
                    <HiDotsVertical />
                </div>
            </div>
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={toggleEditModule} onSave={handleEdit} initialName={module.name} />}
        </>
    );
};

export default Resources;
