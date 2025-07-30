export function processClaimsData(rawData) {
  const claimsMap = new Map()

  // Group all data by Claim_id
  rawData.Pricing_Table.forEach((pricingItem) => {
    const claimId = pricingItem.Claim_id
    if (!claimsMap.has(claimId)) {
      claimsMap.set(claimId, {
        claimId: claimId,
        patientId: pricingItem.Patient_id,
        pricing: null,
        accumulator: [],
      })
    }
    claimsMap.get(claimId).pricing = pricingItem
  })

  rawData.Accumulator_Table.forEach((accumItem) => {
    const claimId = accumItem.Claim_id
    if (!claimsMap.has(claimId)) {
      claimsMap.set(claimId, {
        claimId: claimId,
        patientId: accumItem.Patient_id,
        pricing: null,
        accumulator: [],
      })
    }
    claimsMap.get(claimId).accumulator.push(accumItem)
  })

  return Array.from(claimsMap.values())
}
