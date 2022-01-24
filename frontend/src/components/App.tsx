import {Container} from '@mui/material';
import * as React from 'react';
import {Header} from './Header/presenter';
import {ProjectList} from 'components/ProjectList';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorWelcome from 'components/ErrorWelcome/presenter';
import {ProjectFormModal} from 'components/ProjectFormModal';
import {ProjectHeader} from 'components/ProjectHeader';
import {ProjectProvider} from 'providers/projectProvider';
import {ProjectDeleteModal} from 'components/ProjectDeleteModal';


const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container >
        <ErrorBoundary FallbackComponent={ErrorWelcome}>
          <ProjectProvider>

            <ProjectHeader />
            <ProjectList />
            <ProjectFormModal />
            <ProjectDeleteModal />
          </ProjectProvider>
        </ErrorBoundary>
      </Container>
    </>
  );
};
export default App;
