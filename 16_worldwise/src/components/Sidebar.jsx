import { Outlet } from 'react-router-dom';

import AppNav from './AppNav';
import Logo from './Logo';
import styles from './Sidebar.module.css';


const Sidebar = () => {
    return (
      <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        {/*<p>List of  cities</p>*/}

        {/* call the nested routes:  // similar to  {children} props - for cities/countries/form */}
        <Outlet />

        <footer className={styles.footer}>
          <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
        </footer>
      </div>
  )
}

export default Sidebar;
