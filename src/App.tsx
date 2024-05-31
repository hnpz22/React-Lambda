import React from 'react';
import '@aws-amplify/ui-react/styles.css'; // Import styles
import { Tabs } from '@aws-amplify/ui-react'; // Import Tabs component
import GetLegalCases from './components/crud/GetLegalCases';
import CreateLegalCase from './components/crud/PostLegalCases';

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
