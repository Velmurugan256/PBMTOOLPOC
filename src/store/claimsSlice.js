import { createSlice } from "@reduxjs/toolkit"
import { claimsData } from "../lib/claimsData"

const initialState = {
  claims: claimsData.map((claim, index) => ({
    claimId: claim.claimId,
    isExpanded: index === 0,
    activeTab: "pricing",
    isChatOpen: false,
  })),
}

export const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    toggleExpansion: (state, action) => {
      const claimId = action.payload
      const claimState = state.claims.find((c) => c.claimId === claimId)
      if (claimState) {
        claimState.isExpanded = !claimState.isExpanded
      }
    },
    setActiveTab: (state, action) => {
      const { claimId, tab } = action.payload
      const claimState = state.claims.find((c) => c.claimId === claimId)
      if (claimState) {
        claimState.activeTab = tab
      }
    },
    toggleChat: (state, action) => {
      const claimId = action.payload
      const claimState = state.claims.find((c) => c.claimId === claimId)
      if (claimState) {
        claimState.isChatOpen = !claimState.isChatOpen
      }
    },
  },
})

export const { toggleExpansion, setActiveTab, toggleChat } = claimsSlice.actions

export default claimsSlice.reducer
