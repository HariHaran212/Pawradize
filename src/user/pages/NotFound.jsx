export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary transition">
        Back to Home
      </a>
    </div>
  );
}