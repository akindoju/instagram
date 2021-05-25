import { useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Timeline from '../components/Timeline';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <SideBar />
      </div>
    </div>
  );
};

export default Dashboard;
