import React from 'react';
import LayoutMain from "./share/LayoutMain";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {connect} from 'react-redux';
import {addFavorites} from "../actions/FavoritesActions";

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

function Home(props) {
    const classes = useStyles();
    const [search, setSearch] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [domainName, setDomainName] = React.useState('');
    const [canBuy, setCanBuy] = React.useState(false);
    const [expirationDate, setExpirationDate] = React.useState('');
    const [spinner, setSpinner] = React.useState(false);

    const makeAlert = (title, message) => {
        setAlertMessage(message);
        setAlertTitle(title);
        setShowAlert(true);
    };

    const alertOnClose = () => {
        setShowAlert(false);
        setCanBuy(false)
    };

    const searchValue = async () => {
        if (search == '') {
            return makeAlert('Warning', 'Please type domain name to the search bar.');
        }
        if (!search.includes('.')) {
            return makeAlert('Warning', 'Please add *.com, *.net etc. to end of domain name.');
        } else if (search.endsWith('.')) {
            return makeAlert('Warning', 'Please add *.com, *.net etc. to end of domain name.');
        }
        await setSpinner(true);
        await fetch("https://localhost:44365/api/default/CheckDomain?domainName=" + search)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.Status == '1') {
                        if (result.Data) {
                            setCanBuy(false);
                            setDomainName(result.Data.DomainName);
                            setExpirationDate(result.Data.ExpirationDate);
                        } else {
                            setCanBuy(true);
                        }
                    } else {
                        makeAlert('Error!', result.Message)
                    }
                },
                (error) => {
                    makeAlert('Error!', error)
                }
            );
        await setTimeout(() => setSpinner(false), 500)
    };

    const renderSpinner = () => {
        if (!spinner) {
            return null;
        }
        return (
            <Grid container spacing={1}>
                <Paper className={classes.midContainer}>
                    <div className={classes.spinner}>
                        <CircularProgress/>
                    </div>
                </Paper>
            </Grid>)
    };

    function addToList() {
        props.addFavorites(search);
        makeAlert('Successful', `${search} add to your favorite list.`);
    }

    function renderMain() {
        if (spinner) {
            return null;
        }
        if (!canBuy && domainName != '' && expirationDate != '') {
            return (
                <Paper className={classes.midContainer}>
                    <ListItem>
                        <ListItemText primary="Domain Name:"/>
                        <ListItemText primary={domainName}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Expiration Date:"/>
                        <ListItemText primary={expirationDate}/>
                    </ListItem>
                </Paper>
            )
        }
        if (canBuy && domainName == '' && expirationDate == '') {
            return (
                <Paper className={classes.midContainer}>
                    <ListItem>
                        <ListItemText primary={search}/>
                        <ListItemIcon onClick={() => addToList()}>
                            <IconButton edge="end" aria-label="comments">
                                <AddShoppingCartIcon/>
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                </Paper>
            )
        }
    }

    return (
        <LayoutMain title={'Home'}
                    showAlert={showAlert}
                    alertTitle={alertTitle}
                    alertMessage={alertMessage}
                    alertOnClose={alertOnClose}

        >
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <TextField
                                    id="standard-full-width"
                                    label="Domain Name"
                                    style={{margin: 8}}
                                    placeholder="Search"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={search}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SearchIcon/>}
                                    onClick={searchValue}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                        {renderSpinner()}
                        {renderMain()}


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

export default connect(mapToStateProps, {addFavorites})(Home);