export function HomePage() {
  return (
    <>
      <div className="relative h-140 overflow-hidden mb-6 flex flex-col justify-end px-16">
        <div
          className="absolute inset-0 bg-right -z-10" 
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
        >
        </div>
          <h1 className="text-5xl text-white align-bottom font-bold mb-4">
              Hacemos realidad lo que imaginas.
            </h1>
            <p className="text-xl text-white align-bottom mb-6">
              Descubre todos los servicios que tenemos disponible.
            </p>
        </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Example service cards */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">
                Service Title {index + 1}
              </h2>
              <p className="text-gray-600">Service description goes here.</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
