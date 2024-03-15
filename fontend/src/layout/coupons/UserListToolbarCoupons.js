import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import { useState } from 'react';
// component
import Iconify from '../../component/iconify';
import ModalDeleteAllCoupons from '../../forms/Modal-Delete-All-Coupons';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    // boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbarCoupons.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  information: PropTypes.array,
  getListData: PropTypes.func,
};

export default function UserListToolbarCoupons({ numSelected, filterName, onFilterName, information, getListData }) {
  const [openDelete, setOpenDelete] = useState(false);

  const [listFilters, setListFilters] = useState([]);

  const handleDelete = () => {
    setOpenDelete(true);
    setListFilters(information);
  };
  console.log(listFilters);

  const handleClose = () => {
    setOpenDelete(false);
    getListData();
  };

  return (
    <>
      <StyledRoot
        sx={{
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Tìm kiếm..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete()}>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              {/* <Iconify icon="ic:round-filter-list" /> */}
            </IconButton>
          </Tooltip>
        )}
      </StyledRoot>
      <ModalDeleteAllCoupons open={openDelete} handleClose={handleClose} information={listFilters} />
    </>
  );
}
