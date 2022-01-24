import {
  Backdrop, Box, Button, Divider, Fade, Modal, TextField, Typography,
} from '@mui/material';
import {FormValue} from 'components/TaskFormModal/container';
import React from 'react';
import {UseFormRegister} from 'react-hook-form';

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
  isOpen: boolean;
  disabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
  register: UseFormRegister<FormValue>;
}

const Presenter: React.FC<Props> = ({register, isOpen, disabled, onClose, onSubmit}) => (
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
            Task Setting
          </Typography>
          <Divider />
          <div>
            <TextField
              {...register('title')}
              required
              label="Title"
              sx={{mt: 3, mb: 3}}
            />
          </div>
          <div>
            <TextField
              {...register('description')}
              required
              multiline
              rows={3}
              label="Description"
              sx={{mb: 3}}
            />
          </div>
          <div>
            <TextField
              {...register('deadline')}
              required
              label="Deadline"
              type='date'
              sx={{mb: 3}}
              InputLabelProps={{shrink: true}}
            />
          </div>
          <Box>
            <Button variant="contained" onClick={onSubmit} disabled={disabled}>
              登録
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
