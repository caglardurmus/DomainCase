import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={React.forwardRef((props, ref) => <Link to="/Home" {...props} ref={ref}/>)}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
        </ListItem>
        <ListItem button component={React.forwardRef((props, ref) => <Link to="/Favorites" {...props} ref={ref}/>)}>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Favorites"/>
        </ListItem>

    </div>
);