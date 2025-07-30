export default function AccumulatorTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No accumulator information available for this claim.</p>
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Accumulator Details</h3>
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Accum Type
              </th>
              <th scope="col" className="px-6 py-3">
                Frame ID
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Starting Amount
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Approved Amount
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Applied Amount
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Remaining Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">{row.Accum_type}</td>
                <td className="px-6 py-4">{row.Frame_id}</td>
                <td className="px-6 py-4 text-right">{row.starting_amount}</td>
                <td className="px-6 py-4 text-right">{row.Approved_amount}</td>
                <td className="px-6 py-4 text-right">{row.Applied_amount}</td>
                <td className="px-6 py-4 text-right">{row.remaining_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
