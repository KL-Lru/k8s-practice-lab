import {
  Backdrop, Box, Button, Divider, Fade, Modal, Typography,
} from '@mui/material';
import {Immutable} from 'immer';
import React from 'react';
import {Project} from 'types/projects';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 720,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  project: Immutable<Project>;
  isOpen: boolean;
  disabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const Presenter: React.FC<Props> = ({project, isOpen, disabled, onClose, onSubmit}) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{timeout: 500}}
  >
    <Fade in={isOpen}>
      <Box sx={style}>
        <div>
          <Typography variant="h5">
            Delete Project
          </Typography>
          <Divider />
          <Typography sx={{mt: 3, mb: 3}}>
            Project {project.name}を削除します. この操作を取り消すことは出来ません.
          </Typography>
          <Box>
            <Button color="error" variant="contained" onClick={onSubmit} disabled={disabled}>
              削除
            </Button>
            <Button onClick={onClose} sx={{ml: 3}} disabled={disabled}>
              キャンセル
            </Button>
          </Box>
        </div>
      </Box>
    </Fade>
  </Modal>
);

export default Presenter;
