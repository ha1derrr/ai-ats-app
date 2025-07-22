import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-3xl mx-auto">
        <h2 className="text-[min(8vw,70px)] md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
          Simplify Hiring with Our AI-Powered ATS
        </h2>
        <p className="text-[min(3vw,50px)] text-gray-600 dark:text-gray-300 mb-8">
          Our Applicant Tracking System helps you manage, screen, and hire top
          candidates faster. Smart. Simple. Scalable.
        </p>
        <Link
          to="/signup"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        >
          Get Started for Free
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Choose HireSmart?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">
                ⚡
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">
                AI-Powered Resume Screening
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically filter and rank the best candidates using AI —
                save hours of manual effort.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">
                📊
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">
                Real-time Analytics
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Get insights into your hiring funnel, bottlenecks, and candidate
                quality — all in one place.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">
                🔒
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">
                Secure & Scalable
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Built with the latest tech stack and enterprise-grade security
                for growing teams.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
