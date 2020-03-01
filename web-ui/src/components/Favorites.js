import React from 'react';
import LayoutMain from "./share/LayoutMain";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {removeFavorites} from "../actions/FavoritesActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
    spinner: {
        flexGrow: 1,
        padding: 50,
        alignItems: 'center',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    midContainer: {
        flexGrow: 1,
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'center',
    }
}));

function Favorites(props) {
    const classes = useStyles();

    return (
        <LayoutMain title={'Favorites'}>
            <div className={classes.root}><Grid item xs={12}>
                <Paper className={classes.midContainer}>
                    {
                        props.favoritesList.length == 0 ?
                            <Typography variant="h4">
                                There isn't any item in your list.
                        </Typography>  :
                            props.favoritesList.map((x) =>
                                <ListItem>
                                    <ListItemText primary={x}/>
                                    <ListItemIcon onClick={() => props.removeFavorites(x)}>
                                        <IconButton edge="end" aria-label="comments">
                                            <RemoveShoppingCartIcon/>
                                        </IconButton>
                                    </ListItemIcon>
                                </ListItem>
                            )
                    }

                </Paper>
            </Grid>
            </div>
        </LayoutMain>
    );
}

const mapToStateProps = ({FavoritesResponse}) => {
    const {
        favoritesList
    } = FavoritesResponse;

    return {
        favoritesList,
    };
};

export default connect(mapToStateProps, {removeFavorites})(Favorites);