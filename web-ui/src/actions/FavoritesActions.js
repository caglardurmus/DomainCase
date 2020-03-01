import {ADD_FAVORITES, REMOVE_FAVORITES} from "./types";

export const addFavorites = (item) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_FAVORITES,
            item: item
        });
    };
};

export const removeFavorites = (item) => {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_FAVORITES,
            item: item
        });
    };
};