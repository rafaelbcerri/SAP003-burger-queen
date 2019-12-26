import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom';

const NavbarList = () => {    
    return (
        <div className={css(styles.navList, styles.big)} id="navbarNav">
                <ul className={css(styles.navbar)}>
                    <li className={css(styles.navItem, styles.bigItem)}>
                    <Link to='/novo-pedido' className={css(styles.link)}>Novo pedido</Link>
                    </li>
                    <li className={css(styles.navItem, styles.bigItem)}>
                    <Link to='/cozinha' className={css(styles.link)}>Cozinha</Link>
                    </li>
                    <li className={css(styles.navItem, styles.bigItem)}>
                    <Link to='/pedidos-prontos' className={css(styles.link)}>Pedidos prontos</Link>
                    </li>
                    <li className={css(styles.navItem, styles.bigItem)}>
                    <Link to='/pedidos-entregues' className={css(styles.link)}>Pedidos entregues</Link>
                    </li>
                </ul>
        </div>
    );
};

const styles = StyleSheet.create({
    navItem: {
        listStyle: 'none',
        marginTop: '0.7em',
        fontSize:'1.2em',
    },
    link:{
        textDecoration: 'none',
        color: 'white',
        transition: '0.2s linear',
        ':hover': {
            color: 'rgb(225, 116, 9)',
        }
    },
    big: {
        '@media (min-width: 1025px)': {
            display: 'block',
            width: 'max-content',
        }
    },
    bigItem: {
        '@media (min-width: 1025px)': {
            display: 'inline',
            marginRight: '15px',
        }
    },
    navList: {
        width: '80vw',
        color: 'white',
    }
})

export default NavbarList;