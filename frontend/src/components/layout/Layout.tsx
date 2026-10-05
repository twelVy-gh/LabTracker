import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Header } from './Header';
import { Sidebar, DRAWER_WIDTH } from './Sidebar';

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {/* Toolbar-заглушка, чтобы контент не уезжал под фиксированный AppBar */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};