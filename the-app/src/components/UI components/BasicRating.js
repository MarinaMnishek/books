import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { toAddRating } from '../../store/actions/getListOfBooksActions';
import { useDispatch } from 'react-redux';
import BasicModal from '../UI components/BasicModal';

export default function BasicRating({ authed, averageRating = 0, ratingsCount }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Рейтинг ({averageRating})</Typography>
      <Rating
        key="rating"
        name="simple-controlled"
        disabled={!authed}
        defaultValue={averageRating || 0}
        value={averageRating}
        onChange={(event, newValue) => {
          if (!authed) {
            navigate("/login");
            return
          }
          dispatch(toAddRating(newValue, averageRating, ratingsCount));
          handleOpen();
        }}
      />
      <BasicModal
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}