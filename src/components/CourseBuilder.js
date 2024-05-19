import React, { useState, useEffect } from 'react';
import './courseBuilder.css';
import { FiPlus } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { LiaDatabaseSolid } from "react-icons/lia";
import { IoIosLink } from "react-icons/io";
import { TfiUpload } from "react-icons/tfi";
import courseIcon from '../assets/Web.png';
import Modal from './modal/Modal';
import CreateLinkModal from './modal/CreateLinkModal';
import Resources from './Layout/Resources';
import LinkResources from './Layout/LinkResources';
import DocumentResources from './Layout/DocumentResources'; // Import the DocumentResources component
import UploadDocumentModal from './modal/UploadDocumentModal'; // Import the UploadDocumentModal component

const CourseBuilder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false); // New state for document modal
    const [modules, setModules] = useState([]);
    const [links, setLinks] = useState([]);
    const [documents, setDocuments] = useState([]); // New state for documents
    const [subgroups, setSubgroups] = useState([]); // New state for subgroups

    const toggleCreateModule = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleCreateLink = () => {
        setIsLinkModalOpen(!isLinkModalOpen);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleUploadDocumentModal = () => {
        setIsDocumentModalOpen(!isDocumentModalOpen);
    };

    const handleSaveModule = (moduleName) => {
        setModules([...modules, { id: modules.length, name: moduleName }]);
        setIsModalOpen(false);
    };

    const handleSaveLink = (link) => {
        setLinks([...links, { id: links.length, ...link }]);
        setIsLinkModalOpen(false);
    };

    const handleDeleteModule = (id) => {
        setModules(modules.filter(module => module.id !== id));
    };

    const handleEditModule = (id, newName) => {
        setModules(modules.map(module => module.id === id ? { ...module, name: newName } : module));
    };

    const handleDeleteLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
    };

    const handleEditLink = (id, newLink) => {
        setLinks(links.map(link => link.id === id ? { ...link, ...newLink } : link));
    };

    const handleSaveDocument = (documentName) => {
        setDocuments([...documents, { id: documents.length, name: documentName }]);
        setIsDocumentModalOpen(false);
    };

    const handleDragStart = (id) => {
        console.log("Drag started with id:", id);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const resourceId = e.dataTransfer.getData("text/plain");
        const draggedResource = documents.find(doc => doc.id === parseInt(resourceId));
        if (draggedResource) {
            // Create a new subgroup and add the dragged resource to it
            setSubgroups([...subgroups, [draggedResource]]);
        }
    };

    const allowDrop = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (isModalOpen === true || isLinkModalOpen === true || isDocumentModalOpen === true) {
            setIsOpen(false);
        }
    }, [isModalOpen, isLinkModalOpen, isDocumentModalOpen]);

    return (
        <div className="courseBuilder_container" onDrop={handleDrop} onDragOver={allowDrop}>
            <div className={`courseBuilder_header ${modules.length > 0 || links.length > 0 ? 'fixed' : ''}`}>
                <h5 className='courseBuilder_title'>Course Builder</h5>
                <div className='courseBuilder_header_add_component' onClick={toggleDropdown}>
                    <FiPlus />
                    <h5>Add</h5>
                    {isOpen ?
                        <IoMdArrowDropup onClick={toggleDropdown} /> :
                        <IoMdArrowDropdown onClick={toggleDropdown} />}
                </div>
                {isOpen && (
                    <div className='dropdown_menu_container'>
                        <div className='menue_details'>
                            <LiaDatabaseSolid />
                            <p onClick={toggleCreateModule}>Create module</p>
                        </div>
                        <div className='menue_details'>
                            <IoIosLink />
                            <p onClick={toggleCreateLink}>Add a link</p>
                        </div>
                        <div className='menue_details' onClick={toggleUploadDocumentModal}>
                            <TfiUpload />
                            <p>Upload</p>
                        </div>
                    </div>
                )}
            </div>
            {(modules.length === 0 && links.length === 0 && documents.length === 0) && (
                <div className='img_container'>
                    <img src={courseIcon} alt='web_Instruction' />
                </div>
            )}
            <div className='mb-[32px] z-50'><Modal isOpen={isModalOpen} onClose={toggleCreateModule} onSave={handleSaveModule} /></div>
            <div className='z-50'><CreateLinkModal isOpen={isLinkModalOpen} onClose={toggleCreateLink} onSave={handleSaveLink} /></div>
            <div className='z-50'><UploadDocumentModal isOpen={isDocumentModalOpen} onClose={toggleUploadDocumentModal} onSave={handleSaveDocument} /></div>
            <div className='modules_list mb-[-32px]'>
                {modules.map((module) => (
                    <Resources
                        key={module.id}
                        module={module}
                        onDelete={handleDeleteModule}
                        onEdit={handleEditModule}
                    />
                ))}
            </div>
            <div className='links_list'>
                {links.map((link) => (
                    <LinkResources
                        key={link.id}
                        link={link}
                        onDelete={handleDeleteLink}
                        onEdit={handleEditLink}
                    />
                ))}
            </div>
            <div className='documents_list'>
                {subgroups.map((subgroup, index) => (
                    <div key={index} className="subgroup">
                        {subgroup.map((document) => (
                            <DocumentResources
                                key={document.id}
                                document={document}
                                onDelete={(id) => setDocuments(documents.filter(doc => doc.id !== id))}
                                onEdit={(id,
                                    newDocument) => setDocuments(documents.map(doc => doc.id === id ? { ...doc, ...newDocument } : doc))}
                                    onDragStart={handleDragStart}
                                />
                            ))}
                        </div>
                    ))}
                    {documents.map((document) => (
                        <DocumentResources
                            key={document.id}
                            document={document}
                            onDelete={(id) => setDocuments(documents.filter(doc => doc.id !== id))}
                            onEdit={(id, newDocument) => setDocuments(documents.map(doc => doc.id === id ? { ...doc, ...newDocument } : doc))}
                            onDragStart={handleDragStart}
                        />
                    ))}
                </div>
            </div>
        );
    };
    
    export default CourseBuilder;
    