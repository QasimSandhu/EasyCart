// Get data on action

export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
}

// Remove data using id
export const DLT = (id) => {
    return {
        type: "RMV_CART",
        payload: id
    }
}

// Remove cart Item
export const REMOVE = (item) => {
    return {
        type: "RMV_ONE",
        payload: item
    }
}