"use client"

import { useSelector, useDispatch } from "react-redux"
import { toggleExpansion, setActiveTab, toggleChat } from "../store/claimsSlice"
import { initializeChat } from "../store/chatSlice" 
import PricingTable from "./PricingTable"
import AccumulatorTable from "./AccumulatorTable"
import AiChatbot from "./AiChatbot"
import { Bot, ChevronDown } from "lucide-react"

export default function ClaimDetail({ claim }) {
  const dispatch = useDispatch()
  const claimState = useSelector((state) => state.claims.claims.find((c) => c.claimId === claim.claimId))

  if (!claimState) return null

  const { isExpanded, activeTab, isChatOpen } = claimState

  const handleToggleChat = () => {
    if (!isChatOpen) {
      dispatch(initializeChat({ claimId: claim.claimId }))
    }
    dispatch(toggleChat(claim.claimId))
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <button
        onClick={() => dispatch(toggleExpansion(claim.claimId))}
        className="w-full flex justify-between items-center p-4 text-lg font-medium text-left"
      >
        <span>Claim ID: {claim.claimId}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 md:p-6 relative">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => dispatch(setActiveTab({ claimId: claim.claimId, tab: "pricing" }))}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "pricing"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pricing Information
            </button>
            <button
              onClick={() => dispatch(setActiveTab({ claimId: claim.claimId, tab: "accumulator" }))}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "accumulator"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Accumulator Information
            </button>
          </div>

          <div>
            {activeTab === "pricing" && <PricingTable data={claim.pricing} />}
            {activeTab === "accumulator" && <AccumulatorTable data={claim.accumulator} />}
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleToggleChat}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Bot className="w-5 h-5" />
              <span>{isChatOpen ? "Close Assistant" : "AI Assistant"}</span>
            </button>
          </div>

          {isChatOpen && (
            <div className="mt-4">
              <AiChatbot claimData={claim} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
