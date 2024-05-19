import React, { useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";

const UploadDocumentModal = ({ isOpen, onClose, onSave }) => {
    const documentNameRef = useRef();

    useEffect(() => {
        if (isOpen) {
            documentNameRef.current.value = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleUpload = () => {
        const documentName = documentNameRef.current.value;
        onSave(documentName);
    };

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 font-avenir'>
            <div className='flex flex-col w-[480px] h-[292px] border-2 rounded-[12px] bg-white'>
                <div className='flex justify-between items-center h-[80px] p-6 border-b'>
                    <h5 className='font-bold text-[20px]'>Upload Document</h5>
                    <IoMdClose 
                        className='cursor-pointer w-[40px] h-[40px] p-[10px] text-[#717171]'
                        onClick={onClose}
                    />
                </div>
                <div className='flex flex-col p-6 gap-[16px]'>
                    <h5 className='font-semibold text-[16px]'>Document name</h5>
                    <input 
                        ref={documentNameRef}
                        type='text'
                        placeholder='Document name'
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
                        onClick={handleUpload}    
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadDocumentModal;
