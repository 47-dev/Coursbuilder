// Modal.js
import React, { useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, onSave, initialName = '' }) => {
    const data = useRef();

    useEffect(() => {
        if (isOpen && initialName) {
            data.current.value = initialName;
        }
    }, [isOpen, initialName]);

    if (!isOpen) return null;

    const handleClick = () => {
        const moduleName = data.current.value;
        onSave(moduleName);
    };

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 font-avenir'>
            <div className='flex flex-col w-[480px] h-[292px] border-2 rounded-[12px] bg-white'>
                <div className='flex justify-between items-center h-[80px] p-6 border-b'>
                    <h5 className='font-bold text-[20px]'>{initialName ? 'Edit Module' : 'Create Module'}</h5>
                    <IoMdClose 
                        className='cursor-pointer w-[40px] h-[40px] p-[10px] text-[#717171]'
                        onClick={onClose}
                    />
                </div>
                <div className='flex flex-col p-6 gap-[16px]'>
                    <h5 className='font-semibold text-[16px]'>Module name</h5>
                    <input 
                        ref={data}
                        type='text'
                        placeholder='Introduction to Trigonometry'
                        className='h-[48px] w-full px-3 border-none focus:outline-none font-[500]'
                    />
                </div>
                <div className='flex justify-end items-center px-[24px] space-x-4 border-t'>
                    <button 
                        className='px-[13px] py-[16px] h-[48px] text-[#717171] cursor-pointer hover:text-gray-600'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className='bg-[#008392] text-white px-[13px] py-[16px] h-[48px] w-[134px] rounded-[8px] cursor-pointer hover:bg-[#007080]'
                        onClick={handleClick}    
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
