import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import type { Store } from '../../api/mockData';

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={store.id}>
      <Link to={`/store/${store.id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            height="180"
            image={store.logo}
            alt={store.name}
          />
          <CardContent>
            <Typography variant="h6">{store.name}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default StoreCard;
