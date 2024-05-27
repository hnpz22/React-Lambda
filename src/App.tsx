import React from 'react';
import GetLegalCases from './components/crud/GetLegalCases';
import CreateLegalCase from './components/crud/PostLegalCases';
import '@aws-amplify/ui-react/styles.css';
import { Tabs } from '@aws-amplify/ui-react';


const App: React.FC = () => {
  return (
    <>
      <Tabs
        justifyContent="flex-start"
        defaultValue='create'
        items={[
          { label: 'CREATE', value: 'create', content: <CreateLegalCase /> },
          { label: 'READ', value: 'read', content: <GetLegalCases /> },
        ]}
      />
    </>
    );
};

export default App;