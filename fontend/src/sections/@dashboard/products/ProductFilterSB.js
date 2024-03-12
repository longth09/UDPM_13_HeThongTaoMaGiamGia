import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// import { ColorMultiPicker } from '../../../components/color-utils';

import { fetchLSP } from '../../../service/LoaiSPService';
import { fetchCL } from '../../../service/ChatLieuService';
import { fetchXX } from '../../../service/XuatXuService';
import { fetchTayAo } from '../../../service/OngTayAoService';
import { fetchCoAo } from '../../../service/LoaiCoAoService';
import { fetchMS } from '../../../service/MauSacService';
import { fetchSize } from '../../../service/SizeService';

// ----------------------------------------------------------------------

// export const SORT_BY_OPTIONS = [
//   { value: 'featured', label: 'Featured' },
//   { value: 'newest', label: 'Newest' },
//   { value: 'priceDesc', label: 'Price: High-Low' },
//   { value: 'priceAsc', label: 'Price: Low-High' },
// ];
// export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
// export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];
// export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
// export const FILTER_PRICE_OPTIONS = [
//   { value: 'below', label: 'Below $25' },
//   { value: 'between', label: 'Between $25 - $75' },
//   { value: 'above', label: 'Above $75' },
// ];
// export const FILTER_COLOR_OPTIONS = [
//   '#00AB55',
//   '#000000',
//   '#FFFFFF',
//   '#FFC0CB',
//   '#FF4842',
//   '#1890FF',
//   '#94D82D',
//   '#FFC107',
// ];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  onFilter: PropTypes.func,
  listSP: PropTypes.array,
  onClearAll: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter, onFilter, listSP, onClearAll }) {
  const [listCL, setListCL] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listSize, setListSize] = useState([]);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    const resCL = await fetchCL();
    setListCL(resCL);

    const resLSP = await fetchLSP();
    setListLSP(resLSP);

    const resXX = await fetchXX();
    setListXX(resXX);

    const resTayAo = await fetchTayAo();
    setListTayAo(resTayAo);

    const resCoAo = await fetchCoAo();
    setListCoAo(resCoAo);

    const resMS = await fetchMS();
    setListMS(resMS);

    const resSize = await fetchSize();
    setListSize(resSize);
  };

  // fiter

  const handleFilter = (filteredProducts) => {
    onFilter(filteredProducts);
  };

  const handleClear = () => {
    setListLocCL([]);
    setListLocXX([]);
    setListLocTayAo([]);
    setListLocCoAo([]);
    setListLocMS([]);
    setListLocSize([]);
    setLocLsp('all');
    setLocGia('all');
    onFilter(listSP);
    onClearAll(false);
  };

  // loc checkbox
  const [listLocCL, setListLocCL] = useState([]);
  const [listLocXX, setListLocXX] = useState([]);
  const [listLocTayAo, setListLocTayAo] = useState([]);
  const [listLocCoAo, setListLocCoAo] = useState([]);
  const [listLocMS, setListLocMS] = useState([]);
  const [listLocSize, setListLocSize] = useState([]);

  const handleCheckBox = (material, listCheck, setListCheck) => {
    const isSelected = listCheck.includes(material);
    setListCheck((prevMaterials) =>
      isSelected ? prevMaterials.filter((m) => m !== material) : [...prevMaterials, material]
    );
  };

  // loc radio
  const [locLsp, setLocLsp] = useState('all');
  const [locGia, setLocGia] = useState('all');
  const khoangGia = [
    { value: 'all', label: 'Tất cả' },
    { value: '0-249999', label: 'Dưới 250.000đ' },
    { value: '250000-750000', label: 'Từ 250.000đ đến 750.000đ' },
    { value: '750001+', label: 'Trên 750.000đ' },
  ];

  const listLoc = useMemo(() => {
    if (
      listLocCL.length === 0 &&
      listLocXX.length === 0 &&
      listLocTayAo.length === 0 &&
      listLocCoAo.length === 0 &&
      listLocMS.length === 0 &&
      listLocSize.length === 0 &&
      locLsp === 'all' &&
      locGia === 'all'
    ) {
      return listSP;
    }
    const parsePriceRange = (range) => {
      if (range.includes('+')) {
        const min = parseInt(range, 10);
        return { min };
      }

      const [min, max] = range.split('-').map(Number);
      return { min, max };
    };

    const isInPriceRange = (product, range) => {
      if (range === 'all') {
        return true;
      }
      const { min, max } = parsePriceRange(range);
      if (range.includes('+')) {
        return product.giaThucTe >= min || product.maxThucTe >= min;
      }
      return (
        (product.giaThucTe >= min && product.giaThucTe <= max) || (product.maxThucTe >= min && product.maxThucTe <= max)
      );
    };
    return listSP.filter((product) => {
      const chatLieuMatched = listLocCL.length === 0 || listLocCL.some((check) => product.chatLieus.includes(check));

      const xuatXuMatched = listLocXX.length === 0 || listLocXX.some((check) => product.xuatXus.includes(check));

      const tayAoMatched = listLocTayAo.length === 0 || listLocTayAo.some((check) => product.tayAos.includes(check));

      const coAoMatched = listLocCoAo.length === 0 || listLocCoAo.some((check) => product.coAos.includes(check));

      const mauSacMatched = listLocMS.length === 0 || listLocMS.some((check) => product.mauSacs.includes(check));

      const sizeMatched = listLocSize.length === 0 || listLocSize.some((check) => product.sizes.includes(check));

      const loaiSpMatched = locLsp === 'all' || product.loaiSPs.includes(locLsp);

      const giaMatched = locGia === 'all' || isInPriceRange(product, locGia);

      return (
        chatLieuMatched &&
        xuatXuMatched &&
        tayAoMatched &&
        coAoMatched &&
        mauSacMatched &&
        sizeMatched &&
        loaiSpMatched &&
        giaMatched
      );
    });
  }, [listLocCL, listLocXX, listLocTayAo, listLocCoAo, listLocMS, listLocSize, locLsp, locGia, listSP]);

  return (
    <>
      <Button disableRipple color="inherit" onClick={onOpenFilter}>
        <FilterListIcon />
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Lọc
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Loại sản phẩm
              </Typography>
              {listLSP.length > 0 && (
                <FormControl>
                  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                    <FormControlLabel
                      value={'all'}
                      control={<Radio />}
                      label="Tất cả"
                      checked={locLsp === 'all'}
                      onChange={() => setLocLsp('all')}
                    />
                    {listLSP.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item.idLoaisp}
                        control={<Radio />}
                        label={item.tenLsp}
                        checked={locLsp === item.idLoaisp}
                        onChange={() => setLocLsp(item.idLoaisp)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Chất liệu
              </Typography>

              {listCL.length > 0 && (
                <FormGroup>
                  {listCL.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.idCl}
                      control={<Checkbox />}
                      label={item.tenCl}
                      checked={listLocCL.includes(item.idCl)}
                      onChange={() => handleCheckBox(item.idCl, listLocCL, setListLocCL)}
                    />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Xuất xứ
              </Typography>

              {listXX.length > 0 && (
                <FormGroup>
                  {listXX.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.idXx}
                      control={<Checkbox />}
                      label={item.tenNuoc}
                      checked={listLocXX.includes(item.idXx)}
                      onChange={() => handleCheckBox(item.idXx, listLocXX, setListLocXX)}
                    />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Ống tay áo / Ống quần
              </Typography>

              {listTayAo.length > 0 && (
                <FormGroup>
                  {listTayAo.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.idTayAo}
                      control={<Checkbox />}
                      label={item.loaiTayAo}
                      checked={listLocTayAo.includes(item.idTayAo)}
                      onChange={() => handleCheckBox(item.idTayAo, listLocTayAo, setListLocTayAo)}
                    />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Loại cổ áo / Loại ống quần
              </Typography>

              {listCoAo.length > 0 && (
                <FormGroup>
                  {listCoAo.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.idCoAo}
                      control={<Checkbox />}
                      label={item.loaiCoAo}
                      checked={listLocCoAo.includes(item.idCoAo)}
                      onChange={() => handleCheckBox(item.idCoAo, listLocCoAo, setListLocCoAo)}
                    />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Màu sắc
              </Typography>

              {listMS.length > 0 && (
                <FormGroup>
                  {listMS.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.idMs}
                      control={<Checkbox />}
                      label={item.tenMs}
                      checked={listLocMS.includes(item.idMs)}
                      onChange={() => handleCheckBox(item.idMs, listLocMS, setListLocMS)}
                    />
                  ))}
                </FormGroup>
              )}
            </div>

            {/* Mau sac real :v */}
            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Colors
              </Typography>
              <ColorMultiPicker
                name="colors"
                selected={[]}
                colors={FILTER_COLOR_OPTIONS}
                onChangeColor={(color) => [].includes(color)}
                sx={{ maxWidth: 38 * 4 }}
              />
            </div> */}

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Size
              </Typography>

              {listSize.length > 0 && (
                <FormGroup>
                  {listSize.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.idSize}
                      control={<Checkbox />}
                      label={item.tenSize}
                      checked={listLocSize.includes(item.idSize)}
                      onChange={() => handleCheckBox(item.idSize, listLocSize, setListLocSize)}
                    />
                  ))}
                </FormGroup>
              )}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Giá
              </Typography>
              {khoangGia.length > 0 && (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  defaultValue="all"
                >
                  {khoangGia.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      checked={locGia === item.value}
                      onChange={() => setLocGia(item.value)}
                    />
                  ))}
                </RadioGroup>
              )}
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Button
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                startIcon={<FilterAltIcon />}
                onClick={() => handleFilter(listLoc)}
              >
                Lọc
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                startIcon={<Iconify icon="ic:round-clear-all" />}
                onClick={() => handleClear()}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
