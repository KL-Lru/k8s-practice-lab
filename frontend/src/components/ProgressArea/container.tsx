import Presenter from 'components/ProgressArea/presenter';
import React, {useState} from 'react';

const Container: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Presenter
      isOpen={open}
      onToggle={handleToggle}
    />
  );
};

export default Container;
