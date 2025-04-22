import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16">
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
                      <Button 
                        asChild 
                        size="lg" 
                        className="bg-idea-600 hover:bg-idea-700 flex items-center gap-2"
                      >
                        <Link to="/journey">
                          Explore Our Process <ArrowRight className="ml-2" />
                        </Link>
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

        {/* Why Startups Fail Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mb-10 lg:mb-0">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6 font-serif">
                  Why Most Startups Fail – and How to Avoid It
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  The majority of startups fail not because the idea is bad — but because there's no clear plan.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At IdeaForge, we help you structure your thoughts, validate your assumptions, and build with purpose.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Powered by design thinking and real-time AI feedback, our platform ensures you move forward step by step — with clarity and confidence.
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="mt-8 border-idea-600 text-idea-600 hover:bg-idea-50"
                >
                  <Link to="/journey">
                    Start Your Journey
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
                  alt="Team analyzing business strategy"
                  className="rounded-xl shadow-xl object-cover w-full h-[500px]"
                />
                <div className="absolute inset-0 bg-idea-600/10 rounded-xl"></div>
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
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-idea-100 flex items-center justify-center mb-5">
                  <span className="text-2xl text-idea-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Guided Journey
                </h3>
                <p className="text-gray-600">
                  Step-by-step progression through proven innovation methodologies, designed to help you succeed.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-idea-100 flex items-center justify-center mb-5">
                  <span className="text-2xl text-idea-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI Feedback
                </h3>
                <p className="text-gray-600">
                  Receive intelligent insights and suggestions to refine your ideas and make better decisions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-idea-100 flex items-center justify-center mb-5">
                  <span className="text-2xl text-idea-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Track Progress
                </h3>
                <p className="text-gray-600">
                  Monitor your development with clear milestones and achievements. Stay motivated and focused.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">How IdeaForge Works</h2>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-idea-100 flex items-center justify-center">
                    <span className="text-idea-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Define Your Challenge</h3>
                    <p className="text-gray-600">Start by clearly articulating the problem you want to solve.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-idea-100 flex items-center justify-center">
                    <span className="text-idea-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Generate Ideas</h3>
                    <p className="text-gray-600">Use our AI-powered tools to brainstorm and develop innovative solutions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-idea-100 flex items-center justify-center">
                    <span className="text-idea-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Validate & Refine</h3>
                    <p className="text-gray-600">Get feedback and iterate on your ideas to make them stronger.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Process visualization"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
