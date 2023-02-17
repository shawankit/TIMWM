import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, FundOutlined, MenuOutlined, StrikethroughOutlined, FileExcelOutlined, BarChartOutlined, PieChartOutlined, DatabaseOutlined, CustomerServiceOutlined, PayCircleOutlined, UsergroupAddOutlined, BankOutlined, OrderedListOutlined } from '@ant-design/icons';

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
      return ['fund-reports'];
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
      <Menu theme="dark" mode="inline" defaultOpenKeys={['reports', 'master-data']} defaultSelectedKeys={defaultSelectedKeys} subMenuOpenDelay={0.2}>
        <Menu.SubMenu key="reports" title={'Reports'} icon={<HomeOutlined />}>
          <Menu.Item  key="fund-reports" icon={<BarChartOutlined />}>
            <Link to="/">Fund Reports</Link>
          </Menu.Item>
          <Menu.Item  key="sales-reports" icon={<BarChartOutlined />}>
            <Link to="/sales-reports">Sales Report</Link>
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
        <Menu.SubMenu key="master-data" title={'Master Data'} icon={<DatabaseOutlined />}>
          <Menu.Item  key="customers" icon={<UsergroupAddOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item  key="vendors" icon={<PayCircleOutlined />}>
            <Link to="/vendors">Vendors</Link>
          </Menu.Item>
          <Menu.Item  key="divisions" icon={<BankOutlined />}>
            <Link to="/divisions">Divisions</Link>
          </Menu.Item>
          <Menu.Item  key="items" icon={<OrderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item  key="groups" icon={<OrderedListOutlined />}>
            <Link to="/groups">Groups</Link>
          </Menu.Item>
          <Menu.Item  key="ledgers" icon={<OrderedListOutlined />}>
            <Link to="/ledgers">Ledgers</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
