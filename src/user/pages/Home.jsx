// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { PawPrint, ShoppingBag, BookOpen } from "lucide-react";
import IntroVideo from "../../assets/Intro_Video.mp4";

const samplePets = [
  { id: 1, name: "Buddy", type: "Dog", img: "/assets/dog1.jpg", age: "2 yrs", short: "A friendly, playful companion." },
  { id: 2, name: "Milo", type: "Cat", img: "/assets/cat1.jpg", age: "1 yr", short: "Curious and cuddly." },
  { id: 3, name: "Luna", type: "Rabbit", img: "/assets/rabbit1.jpg", age: "6 mo", short: "Soft and gentle." },
];

export default function Home() {
  const token = localStorage.getItem("authToken");
  // console.log("Auth Token:", token); // For debugging purposes
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center text-center">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={IntroVideo} type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-primary/90">Pawradise</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Find a furry friend, shop essentials, and explore trusted pet care
            resources - all in one place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/find-a-friend"
              className="bg-primary/90 hover:bg-primary/80 text-gray-900 px-6 py-3 rounded-2xl font-semibold shadow-lg transition"
            >
              Find a Friend
            </Link>
            <Link
              to="/shop"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-2xl font-semibold shadow-lg transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Everything Your Pet Needs
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            {/* Find a Friend */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <PawPrint className="mx-auto text-yellow-500 w-14 h-14 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Find a Friend</h3>
              <p className="text-gray-600 mb-4">
                Discover pets waiting for a loving home. Learn about our ethical
                adoption process and meet local shelter pets.
              </p>
              <Link
                to="/find-a-friend"
                className="text-yellow-500 font-medium hover:underline"
              >
                Explore →
              </Link>
            </div>

            {/* Shop Essentials */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <ShoppingBag className="mx-auto text-green-500 w-14 h-14 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Shop Essentials</h3>
              <p className="text-gray-600 mb-4">
                Food, toys, wellness, and more. Tailored products for dogs,
                cats, and all your small companions.
              </p>
              <Link
                to="/shop"
                className="text-green-500 font-medium hover:underline"
              >
                Shop Now →
              </Link>
            </div>

            {/* Pet Care Resources */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <BookOpen className="mx-auto text-blue-500 w-14 h-14 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Pet Care Resources
              </h3>
              <p className="text-gray-600 mb-4">
                Expert guides, nutrition tips, training advice, and a complete
                Coimbatore pet directory to support your journey.
              </p>
              <Link
                to="/pet-care-resources"
                className="text-blue-500 font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Visit Us in Coimbatore
          </h2>
          {/* Replace iframe src with Google Maps embed link */}
          <div className="relative w-full h-96 rounded-2xl shadow-lg overflow-hidden">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62684.545613433416!2d76.9278649486328!3d10.904006100000021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba851f3b90b30b9%3A0x9f369f0bf84a3f1f!2sGD%20Pets%20and%20Fish%20Spa!5e0!3m2!1sen!2sin!4v1758622537294!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
