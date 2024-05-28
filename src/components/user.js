import { useParams } from 'react-router-dom';
export default function User() {
  const { id } = useParams();

  return <div className="component">User Page {id}</div>;
}
