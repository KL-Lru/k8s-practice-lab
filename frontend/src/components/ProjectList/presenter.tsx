import React from 'react';
import {Project} from 'types/projects';
import {ProjectPanel} from 'components/ProjectPanel';
import {Immutable} from 'immer';

type Props = {
  projects: Immutable<Array<Project>>;
}

const Presenter: React.FC<Props> = ({projects}) => (
  <>
    {projects.map((prj) => (
      <ProjectPanel
        key={prj.id}
        project={prj}
      />
    ))}
  </>
);


export default Presenter;
