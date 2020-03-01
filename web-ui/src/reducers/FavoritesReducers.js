import {INPUT_CHANGED, REMOVE_FAVORITES, ADD_FAVORITES} from '../actions/types';

const INITIAL_STATE = {
    favoritesList: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INPUT_CHANGED:
            return {...state, [action.payload.props]: action.payload.value};
        case ADD_FAVORITES:
            return {
                ...state,
                favoritesList: state.favoritesList.includes(action.item) ? state.favoritesList : state.favoritesList.concat(action.item)
            };
        case REMOVE_FAVORITES:
            return {...state, favoritesList: state.favoritesList.filter(x => !action.item.includes(x))};
        default:
            return state;
    }
};
