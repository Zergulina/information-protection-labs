import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './RetroNavLink.module.css'

type RetroNavLinkProps = {
    to: string,
    children: ReactNode,
    className?: string
}

const RetroNavLink = ({to, children, className} : RetroNavLinkProps) => {
    return (
        <NavLink className={({ isActive }) => (`${classes.RetroNavLink}  ${isActive ? classes.RetroNavLinkActive : ""} ${className}`)} to={to}>{children}</NavLink>
    );
};

export default RetroNavLink;