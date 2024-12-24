const { createSlice } = require('@reduxjs/toolkit');

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "₹",
        currencyName: "INR",
        currencyRate: 1 // Default to Indian Rupee
    },
    reducers: {
        setCurrency(state, action) {
            const currencyName = action.payload;

            if (currencyName === "USD") {
                state.currencySymbol = "$";
                state.currencyRate = 82.5; // Example conversion rate
                state.currencyName = currencyName;
            } else if (currencyName === "EUR") {
                state.currencySymbol = "€";
                state.currencyRate = 89.3; // Example conversion rate
                state.currencyName = currencyName;
            } else if (currencyName === "GBP") {
                state.currencySymbol = "£";
                state.currencyRate = 101.2; // Example conversion rate
                state.currencyName = currencyName;
            } else {
                state.currencySymbol = "₹";
                state.currencyRate = 1;
                state.currencyName = "INR";
            }
        }
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
