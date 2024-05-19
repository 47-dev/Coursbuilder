import React from 'react';
import DragDropWrapper from './components/DragDropWrapper/DragDropWrapper';
import CourseBuilder from './components/CourseBuilder';
function App() {
  return (
    <div className="App">
        <DragDropWrapper>
          <CourseBuilder />
        </DragDropWrapper>
    </div>
  );
}

export default App;
