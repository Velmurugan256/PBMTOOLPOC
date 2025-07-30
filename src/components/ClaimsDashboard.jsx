import { claimsData } from "../lib/claimsData"
import ClaimDetail from "./ClaimDetail"

export default function ClaimsDashboard() {
  return (
    <div className="space-y-4">
      {claimsData.map((claim) => (
        <ClaimDetail key={claim.claimId} claim={claim} />
      ))}
    </div>
  )
}
