import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        view: 'browse',
        modal: false,
        mode: 'new'
    },
    reducers:{
        setView: (state, action) =>{
            state.view = action.payload
        },
        setModal: (state, action) =>{
            const { modal, mode } = action.payload;
            state.modal = modal
            state.mode = mode
        }
    }
})


export const {setView, setModal} = uiSlice.actions
export default uiSlice.reducer;