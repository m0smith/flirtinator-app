import { Typography, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function MoreFlirting() {
  return (
    <Typography variant="body1" style={{ marginTop: 20, color: '#e91e63' }}>
      Ready to take your flirting game to the next level? <FavoriteIcon style={{ verticalAlign: 'middle', color: '#e91e63' }} /> Discover more fun ways to flirt with your spouse at {' '}
      <Link href="http://ferociousflirting.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#e91e63' }}>
        Ferocious Flirting: Making Marriage Wonderful
      </Link>!
    </Typography>
  );
}
export default MoreFlirting