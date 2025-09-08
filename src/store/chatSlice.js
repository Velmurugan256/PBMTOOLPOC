import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios" // Make sure axios is imported

// The thunk now calls the live API via the Vite proxy.
export const submitQuery = createAsyncThunk(
  "chat/submitQuery",
  async ({ claimData, question }, { rejectWithValue }) => {
    try {
      const requestPayload = {
        claim: {
          ...claimData.pricing,
          Accumulator: claimData.accumulator,
        },
        question: question,
      }

      // --- LIVE API CALL ---
      // The request goes to our local proxy, which forwards it to the real API.

      const response = await axios.post("https://b7l2hzxwbg.execute-api.us-east-1.amazonaws.com/api/rag", requestPayload)

      // The API returns data in the format { "answer": "..." },
      // which is exactly what our component expects.
      return response.data
    } catch (error) {
      // Axios's robust error handling will catch non-2xx responses.
      if (error.response) {
        console.error("API Error:", error.response.data)
        return rejectWithValue(error.response.data)
      } else if (error.request) {
        console.error("Network Error:", error.request)
        return rejectWithValue("No response from server. Please check your network.")
      } else {
        console.error("Request Setup Error:", error.message)
        return rejectWithValue(error.message)
      }
    }
  },
)

const initialState = {
  messages: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initializeChat: (state, action) => {
      state.status = "idle"
      state.error = null
      state.messages = [
        {
          id: "welcome-message",
          role: "assistant",
          content: `Hi, how can I assist you with claim ${action.payload.claimId}?`,
        },
      ]
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now().toString(),
        role: "user",
        content: action.payload,
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.pending, (state) => {
        state.status = "loading"
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.messages.push({
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: action.payload.answer,
        })
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
        state.messages.push({
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, an error occurred. Please try again.",
        })
      })
  },
})

export const { initializeChat, addUserMessage } = chatSlice.actions
export default chatSlice.reducer
