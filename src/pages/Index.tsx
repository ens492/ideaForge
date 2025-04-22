
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
              <div className="mx-auto max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block">Turn Your Ideas</span>
                      <span className="block text-idea-600">Into Innovation</span>
                      <span className="block text-2xl sm:text-3xl mt-2 text-gray-700">One Step at a Time</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">
                      IdeaForge guides you through your entrepreneurial journey using AI and design thinking.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                      <Button asChild size="lg" className="bg-idea-600 hover:bg-idea-700">
                        <Link to="/signup">Get Started</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link to="/login">Already have an account?</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                      <img
                        className="w-full object-cover rounded-xl shadow-xl"
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                        alt="Team collaborating"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Transform Your Ideas with Design Thinking
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Follow a structured approach to innovation with expert AI guidance at every step.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Guided Journey
                </h3>
                <p className="text-gray-600">
                  Step-by-step progression through proven innovation methodologies.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Feedback
                </h3>
                <p className="text-gray-600">
                  Receive intelligent insights and suggestions to refine your ideas.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Track Progress
                </h3>
                <p className="text-gray-600">
                  Monitor your development with clear milestones and achievements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
