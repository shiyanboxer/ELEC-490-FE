// @mui
import { styled, alpha } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 52,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  marginBottom: 0,
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  boxSizing: 'border-box',
  gap: theme.spacing(2),
  '&.active': {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 32,
  height: 32,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 0,
});
