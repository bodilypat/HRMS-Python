//src/features/rooms/store/roomSlice.js 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as roomApi from "./roomApi";

export const fetchRooms = createAsyncThunk(
    "rooms/fetchRooms",
    async () => {
        return await roomApi.getRoom();
    }
);

const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        rooms: [],
        loading: false,
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms  = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default roomSlice.reducer;



