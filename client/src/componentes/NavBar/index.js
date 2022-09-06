import React from 'react';
import styles from './navBar.module.css'
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function NavBar() {

  return (
    <nav>
      <div className={styles.navBar}>
        <h1>#HenryFood</h1>
        <div>
          <ul>
            <Link to='/recipes'>
              <li><a href="/recipes"></a>Crear Receta</li>
            </Link>
          </ul>
        </div>
          <SearchBar/>
      </div>
    </nav>
  )
}
