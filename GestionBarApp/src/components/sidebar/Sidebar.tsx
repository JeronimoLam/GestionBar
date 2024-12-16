import './Sidebar.css';
import { Link } from 'react-router-dom';
import { BarChart2, Package, DollarSign, Coffee, Menu } from 'react-feather';
import { PiForkKnife  } from 'react-icons/pi'; // Import the icon


const Sidebar = ({ isExpanded, toggleSidebar }: { isExpanded: boolean; toggleSidebar: () => void }) => {
  const menuItems = [
    { icon: PiForkKnife , label: 'Mesas', href: '/mesas' },
    { icon: BarChart2, label: 'Datos de mi negocio', href: '/datos' },
    { icon: Package, label: 'Stock', href: '/stock' },
    { icon: DollarSign, label: 'Balance', href: '/balance' },
    { icon: Coffee, label: 'Productos', href: '/productos' },
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="icons-column">
          <Menu className="icon-list hamburguer" onClick={toggleSidebar}/>
        <ul className="icon-list">
          {menuItems.map(({ icon: Icon, href }, index) => (
            <li key={index} className="icon-item">
              <Link to={href}>
                <Icon className="menu-icon" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="labels-column">
        <div className="padding-texts"></div>
        <ul className="label-list">
          {menuItems.map(({ label, href }, index) => (
            <li key={index} className="label-item">
              <Link to={href} className="menu-label-link">
                <span className="menu-label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
