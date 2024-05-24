import React from 'react';
import GetLegalCases from './components/crud/GetLegalCases';
import CreateLegalCase from './components/crud/PostLegalCases';

const App: React.FC = () => {
  return (
    <>
    <GetLegalCases />
    <CreateLegalCase />
    </>
    );
};

export default App;