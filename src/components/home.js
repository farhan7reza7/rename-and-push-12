import { Outlet } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <div className="component">Home Page</div>
      <Outlet />
    </div>
  );
}
