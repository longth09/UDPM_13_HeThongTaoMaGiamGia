import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCardAll';
// import { findById } from '../../../service/BillSevice';
// import ModalDetailProduct from '../../../forms/Modal-Detail-SanPham';

// ----------------------------------------------------------------------

ProductListClient.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductListClient({ products, ...other }) {
  // const [listImages, setListImages] = useState([]);
  // const [dataDetail, setDataDetail] = useState([]);
  // const [showModalDetail, setShowModalDetail] = useState(false);

  const handleChoose = async (id, cover) => {
    console.log('HIHIHI', cover, id);
    // const getOneSP = await findById(id);
    // setListImages(cover);
    // setDataDetail(getOneSP);
    // setShowModalDetail(true);
  };
  // const handleCloseDetail = () => {
  //   setShowModalDetail(false);
  // };
  return (
    <>
      <Grid container spacing={3} {...other}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3} onClick={() => handleChoose(product.id, product.cover)}>
            <ShopProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {/* <ModalDetailProduct
        show={showModalDetail}
        handleCloseDetai={handleCloseDetail}
        dataDetail={dataDetail}
        // selectDataCart={products[0].selectDataCart}
        // DataCart={products[0].DataCart}
        listImages={listImages}
        // currentPage1={products[0].currentPage1}
      /> */}
    </>
  );
}
