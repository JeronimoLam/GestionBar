import './Sidebar.css';
import { Link } from 'react-router-dom';
import { BarChart2, Package, DollarSign, Coffee, Menu } from 'react-feather';

const Sidebar = ({ isExpanded, toggleSidebar }: { isExpanded: boolean; toggleSidebar: () => void }) => {
  const menuItems = [
    { icon: BarChart2, label: 'Ver datos de mi negocio', href: '/datos' },
    { icon: Package, label: 'Ver stock', href: '/stock' },
    { icon: DollarSign, label: 'Ver balance', href: '/balance' },
    { icon: Coffee, label: 'Ver y editar productos', href: '/productos' },
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <Menu />
      </button>
      <ul className="menu-list">
        {menuItems.map(({ icon: Icon, label, href }, index) => (
          <li key={index} className="menu-item">
            <Link to={href} className="menu-link">
              <Icon className="menu-icon" />
              {isExpanded && <span className="menu-label">{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
