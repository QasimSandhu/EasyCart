const INIT_STATE = {
    carts: []
};

export const cartreducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'ADD_CART':
            // Set carts data on store, state.carts (previous data), action.payload (new data)
            const itemIndex = state.carts.findIndex((iteam) => iteam.id === action.payload.id);
            if (itemIndex >= 0) {
                const updatedCarts = [...state.carts];
                updatedCarts[itemIndex].qnty += 1;
                return { ...state, carts: updatedCarts };
            } else {
                const temp = { ...action.payload, qnty: 1 };
                return { ...state, carts: [...state.carts, temp] };
            }

        case 'RMV_CART':
            const data = state.carts.filter((element) => element.id !== action.payload);
            return {
                ...state,
                carts: data
            }
        case "RMV_ONE":
            // Set carts data on store, state.carts (previous data), action.payload (new data)
            const itemIndex_dec = state.carts.findIndex((iteam) => iteam.id === action.payload.id);
            if (state.carts[itemIndex_dec].qnty >= 1) {
                const dltitem = state.carts[itemIndex_dec].qnty -= 1;
                console.log([...state.carts, dltitem]);
                return {
                    ...state,
                    carts: [...state.carts]
                }
            } else if (state.carts[itemIndex_dec].qnty === 1) {
                const data = state.carts.filter((element) => element.id !== action.payload)
                return {
                    ...state,
                    carts: data
                }
            }

        default:
            return state
    }
}