import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, FundOutlined, MenuOutlined, StrikethroughOutlined, FileExcelOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container  h-screen">
      <div className="logo-container">
        <Typography.Title level={2} className="logo"><Link to="/">TIMWM</Link></Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
      <Menu theme="dark" >
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Reports</Link>
        </Menu.Item>
        <Menu.Item icon={<FileExcelOutlined />}>
          <Link to="/sales">Sales</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/purchases">Purchases</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/receipts">Receipts</Link>
        </Menu.Item>
        <Menu.Item icon={<StrikethroughOutlined />}>
          <Link to="/payments">Payments</Link>
        </Menu.Item>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
