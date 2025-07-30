export default function PricingTable({ data }) {
  if (!data) {
    return <p className="text-gray-500">No pricing information available for this claim.</p>
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Pricing Details</h3>
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient ID
              </th>
              <th scope="col" className="px-6 py-3">
                Claim ID
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Cost of Claim
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Patient Pay
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Client Pay
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-6 py-4">{data.Patient_id}</td>
              <td className="px-6 py-4">{data.Claim_id}</td>
              <td className="px-6 py-4 text-right">{data.Cost_of_the_claim}</td>
              <td className="px-6 py-4 text-right">{data.Patient_pay}</td>
              <td className="px-6 py-4 text-right">{data.Client_pay}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
