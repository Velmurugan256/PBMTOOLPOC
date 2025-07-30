import ClaimsDashboard from "./components/ClaimsDashboard"

export default function App() {
  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Claim Review Station
          </h1>
          <p className="text-gray-500 mt-1">Select a claim to view details and ask questions.</p>
        </header>
        <ClaimsDashboard />
      </div>
    </main>
  )
}
