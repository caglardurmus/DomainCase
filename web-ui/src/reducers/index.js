import {combineReducers} from 'redux';
import FavoritesReducers from './FavoritesReducers';

export default combineReducers({
    FavoritesResponse: FavoritesReducers,
});