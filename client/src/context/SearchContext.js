import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
    city: undefined,   
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        rooms: undefined
    } 
};

const SearchReducer = (state, action) => {  
    switch (action.type) {
        case "NEW_SEARCH":
            return {
                ...state,
                dates: action.payload.date
            }
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const SearchContext = createContext(INITIAL_STATE);

const SearchContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
    const {city, dates, options} = state;

    const searchDates = (search) => {
        dispatch({
            type: "NEW_SEARCH",
            payload: search
        })
    }
    const SearchContextData = {
        searchDates,
        dates
    }
    
    return (
        <SearchContext.Provider value={SearchContextData}>
            {children}
        </SearchContext.Provider>
    )  
}

export default SearchContextProvider;