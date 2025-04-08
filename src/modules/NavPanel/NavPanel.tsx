import React from 'react';
import RetroNavLink from '../../UI/RetroNavLink/RetroNavLink';
import { Outlet } from 'react-router-dom';
import classes from './NavPanel.module.css'
import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';

const NavPanel = () => {
    return (
        <div className ={classes.PageWrapper}>
            <RetroLabeledPanel label='Навигация' labelZIndex={0} className={classes.NavPanel}>
                <div className={classes.NavLinkContainer}>
                    <RetroNavLink to={'/'} className={classes.NavLink}>Лаба 2</RetroNavLink>
                    <RetroNavLink to={'/lab3'} className={classes.NavLink}>Лаба 3</RetroNavLink>
                    <RetroNavLink to={'/lab5'} className={classes.NavLink}>Лаба 5</RetroNavLink>
                    <RetroNavLink to={'/lab6'} className={classes.NavLink}>Лаба 6</RetroNavLink>
                </div>
            </RetroLabeledPanel>
            <Outlet/>
        </div>
    );
};

export default NavPanel;