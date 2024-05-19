// DocumentResources.js

import React, { useState } from 'react';
import { FaRegFilePdf } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi"; 
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import UploadDocumentModal from '../modal/UploadDocumentModal';
import { RiDownloadLine } from "react-icons/ri";

const DocumentResources = ({ document, onDelete, onEdit, onDragStart }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", document.id);
        onDragStart(document.id);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDots = () => {
        setIsOpen(!isOpen);
    };

    const toggleEditDocument = () => {
        setIsModalOpen(!isModalOpen);
        setIsOpen(false); // Close the dots menu when opening the modal
    };

    const handleEdit = (newDocument) => {
        onEdit(document.id, newDocument);
        setIsModalOpen(false);
    };

    return (
        <>
            <div draggable onDragStart={handleDragStart}>
                <div className='flex w-[858px] h-[56px] rounded-[8px] border border-gray-300 gap-[8px] items-center bg-white relative mt-7 z-0'>
                    <FaRegFilePdf className='text-[#F75961] ml-2 cursor-pointer'/>

                    <div className='flex-grow font-avenir ml-[10px] gap-[16px]'>
                        <h5 className='font-semibold text-[14px]'>{document.name}</h5>
                        <p className='text-[12px] text-gray-500'>Uploaded document</p>
                    </div>
                    <div className={`absolute z-10 right-0 top-full mt-2 bg-white border border-gray-300 rounded-[4px] shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
                        <div className='p-2'>
                            <div className='flex items-center mb-2 cursor-pointer' onClick={toggleEditDocument}>
                                <LuPencilLine />
                                <p className='ml-2'>Rename</p>
                            </div>
                            <div className='flex items-center mb-2 cursor-pointer' onClick={toggleEditDocument}>
                                <RiDownloadLine />
                                <p className='ml-2'>Download</p>
                            </div>
                            <div className='flex items-center cursor-pointer' onClick={() => onDelete(document.id)}>
                                <RiDeleteBinLine className='text-[#D33852]' />
                                <p className='ml-2 text-[#D33852]'>Delete</p>
                            </div>
                        </div>
                    </div> 
                    <div className='cursor-pointer bg-[#F2F2F2] p-[8px] mr-[8px] rounded-[4px]' onClick={toggleDots}>
                        <HiDotsVertical />
                    </div>
                </div>
                {isModalOpen && <UploadDocumentModal isOpen={isModalOpen} onClose={toggleEditDocument} onSave={handleEdit} initialName={document.name} />}
            </div>    
        </>
    );
};

export default DocumentResources;
