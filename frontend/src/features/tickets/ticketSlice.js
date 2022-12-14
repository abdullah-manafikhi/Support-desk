import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";


    const initialState = {
        tickets: [],
        ticket: {},
        isError: false,
        isSuccess: false,
        isLoading:false,
        message: ''
    }

    // Create new ticket
    export const createTicket = createAsyncThunk('tickets/create' , async (ticketData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticketData, token)
        }
        catch(error){
            console.log(error)
            const message  = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }} )


    // Get all tickets
    export const getTickets = createAsyncThunk('tickets/getAll' , async (_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTickets(token)
        }
        catch(error){
            console.log(error)
            const message  = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }} )

    // Get a single ticket
    export const getSingleTicket = createAsyncThunk('tickets/getsingleTicket' , async (ticketId, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getSingleTicket(ticketId, token)
        }
        catch(error){
            console.log(error)
            const message  = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }} )

        // Close a ticket
    export const closeTicket = createAsyncThunk('tickets/closeTicket' , async (ticketId, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.closeTicket(ticketId, token)
        }
        catch(error){
            console.log(error)
            const message  = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }} )


    export const ticketSlice = createSlice({
        name: 'ticket',
        initialState,
        reducers: {
            reset: (state) => initialState
        },
        extraReducers: (builder) => {
                builder
                    .addCase(createTicket.pending, (state) => {
                        state.isLoading = true
                    })
                    .addCase(createTicket.fulfilled, (state) => {
                        state.isLoading = false
                        state.isSuccess = true
                    })
                    .addCase(createTicket.rejected, (state, action) => {
                        state.isLoading = false
                        state.isError = true
                        state.message = action.payload
                    })
                    .addCase(getTickets.pending, (state) => {
                        state.isLoading = true
                    })
                    .addCase(getTickets.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.isSuccess = true
                        state.tickets = action.payload
                    })
                    .addCase(getTickets.rejected, (state, action) => {
                        state.isLoading = false
                        state.isError = true
                        state.message = action.payload
                    })
                    .addCase(getSingleTicket.pending, (state) => {
                        state.isLoading = true
                    })
                    .addCase(getSingleTicket.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.isSuccess = true
                        state.ticket = action.payload
                    })
                    .addCase(getSingleTicket.rejected, (state, action) => {
                        state.isLoading = false
                        state.isError = true
                        state.message = action.payload
                    })
                    .addCase(closeTicket.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.isSuccess = true
                        state.ticket.status = 'closed'
                    })
        }
    })

    export const {reset} = ticketSlice.actions
    export default ticketSlice.reducer