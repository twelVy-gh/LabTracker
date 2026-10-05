import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  AdminPanelSettings as AccessIcon,
  Notifications as NotificationsIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';

export const DRAWER_WIDTH = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Дашборд', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Задания', path: '/tasks', icon: <AssignmentIcon /> },
  { label: 'Уведомления', path: '/notifications', icon: <NotificationsIcon /> },
  { label: 'Управление доступом', path: '/access', icon: <AccessIcon /> },
];

const drawerContent = (
  <Box>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
      }}
    >
      <SchoolIcon color="primary" />
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
        Lab Tracker
      </Typography>
    </Toolbar>
    <Divider />
    <List>
      {navItems.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            component={NavLink}
            to={item.path}
            sx={{
              '&.active': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export const Sidebar = ({ mobileOpen, onMobileClose }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};