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
        },
        setModalEdit: (state, action) =>{
            state.modal = action.payload
        }
    }
})


export const {setView, setModal, setModalEdit} = uiSlice.actions
export default uiSlice.reducer;
