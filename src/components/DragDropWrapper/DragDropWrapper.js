import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DragDropWrapper = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {children}
      </div>
    </DndProvider>
  );
};

export default DragDropWrapper;
