export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to FiverrClone</h1>
      <p className="text-lg mb-6">
        Discover the best services from freelancers around the world.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example service cards */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">Service Title {index + 1}</h2>
            <p className="text-gray-600">Service description goes here.</p>
          </div>
        ))}
      </div>
    </div>
  )
}