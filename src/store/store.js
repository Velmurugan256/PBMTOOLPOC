import { configureStore } from "@reduxjs/toolkit"
import claimsReducer from "./claimsSlice"
import chatReducer from "./chatSlice" // Import the new reducer

export const store = configureStore({
  reducer: {
    claims: claimsReducer,
    chat: chatReducer, // Add the chat reducer
  },
})
