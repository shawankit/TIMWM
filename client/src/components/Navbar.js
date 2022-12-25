import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, FundOutlined, MenuOutlined, StrikethroughOutlined, FileExcelOutlined, BarChartOutlined, PieChartOutlined } from '@ant-design/icons';

const Navbar = ({ collapsed }) => {
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

  const defaultSelectedKeys = (() => {
    if(window.location.pathname === '/'){
      return ['sales-reports'];
    }
    return [window.location.pathname.replace('/', '')];
  })();

  return (
    <div className="nav-container  h-screen">
      <div className="logo-container">
        <Typography.Title level={2} className="logo"><Link to="/">TIMWM</Link></Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
      <Menu theme="dark" mode="inline" defaultOpenKeys={['reports']} defaultSelectedKeys={defaultSelectedKeys} subMenuOpenDelay={0.2}>
        <Menu.SubMenu key="reports" title={'Reports'} icon={<HomeOutlined />}>
          <Menu.Item  key="sales-reports" icon={<BarChartOutlined />}>
            <Link to="/">Sales Report</Link>
          </Menu.Item>
          <Menu.Item  key="purchase-reports" icon={<PieChartOutlined />}>
            <Link to="/purchase-reports">Purchase Report</Link>
          </Menu.Item>
        </Menu.SubMenu>
        
        <Menu.Item icon={<FileExcelOutlined />} key='sales'>
          <Link to="/sales">Sales</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />} key='purchases'>
          <Link to="/purchases">Purchases</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />} key='receipts'>
          <Link to="/receipts">Receipts</Link>
        </Menu.Item>
        <Menu.Item icon={<StrikethroughOutlined />} key='payments'>
          <Link to="/payments">Payments</Link>
        </Menu.Item>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
