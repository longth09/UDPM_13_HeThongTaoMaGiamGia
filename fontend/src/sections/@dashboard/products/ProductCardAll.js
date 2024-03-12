import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// utils
// components
import Label from '../../../components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

function getGia(giaMin, giaMax) {
  return giaMin === giaMax
    ? formatCurrency(giaMin)
    : String(formatCurrency(giaMin)) + String(' - ') + String(formatCurrency(giaMax));
}

function formatCurrency(price) {
  if (!price) return '0';

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  return formatter.format(price);
}

export default function ShopProductCard({ product }) {
  const { idSp, tenSp, trangThai, url, giaMin, giaMax, giaThucTe } = product;

  const navigate = useNavigate();
  const hanldOpenDetail = async (id) => {
    navigate(`/client/detail/${id}`);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {trangThai === 1 && (
          <Label
            variant="filled"
            color="error"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Sale
          </Label>
        )}
        <StyledProductImg
          alt={tenSp}
          src={url}
          sx={{ height: '250px', cursor: 'pointer' }}
          onClick={() => hanldOpenDetail(idSp)}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap onClick={() => hanldOpenDetail(idSp)} sx={{ cursor: 'pointer' }}>
            {tenSp}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {trangThai === 1 ? (
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {formatCurrency(giaMin)}
              </Typography>
              <Typography component="span" variant="subtitle1">
                {' '}
                {formatCurrency(giaThucTe)}
              </Typography>
            </Typography>
          ) : (
            <Typography variant="subtitle1">{getGia(giaMin, giaMax)}</Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
