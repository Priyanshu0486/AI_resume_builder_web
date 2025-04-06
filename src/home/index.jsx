import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import { Bot, FileEdit, Share2, Download, Check } from 'lucide-react'
import React from 'react'

function Home() {
  return (
    <div>
      <Header/>
      <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12 relative z-10">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
              Build Your Resume <span className='text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500'>With AI</span>
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48">
              Effortlessly craft a standout resume with our AI-powered builder. Get hired faster with professionally designed templates.
            </p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-primary to-indigo-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
                    Get Started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
            </div>
            
            {/* Resume Preview Image */}
            <div className="max-w-4xl mx-auto mt-12 relative">
              <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
                <img 
                  src="/resume-preview.png" 
                  alt="AI Resume Preview" 
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/800x500/f8fafc/4f46e5?text=AI+Resume+Builder&font=montserrat";
                  }}
                />
                <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">
                  AI-Powered
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="font-bold text-3xl text-center mb-12">Why Choose Our AI Resume Builder?</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="block rounded-xl border bg-white border-gray-100 p-8 shadow-sm hover:border-primary/20 hover:shadow-primary/10 transition">
              <Bot className='h-8 w-8 text-primary' />
              <h3 className="mt-4 text-xl font-bold text-gray-900">AI-Powered Content</h3>
              <p className="mt-2 text-sm text-gray-600">
                Our AI analyzes job descriptions and suggests tailored content to match requirements. Get personalized suggestions for skills, achievements, and job descriptions.
              </p>
            </div>

            <div className="block rounded-xl border bg-white border-gray-100 p-8 shadow-sm hover:border-primary/20 hover:shadow-primary/10 transition">
              <FileEdit className='h-8 w-8 text-primary' />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Professional Templates</h3>
              <p className="mt-2 text-sm text-gray-600">
                Choose from a variety of ATS-friendly templates designed by HR professionals. Customize colors, fonts, and layout to match your personal style.
              </p>
            </div>

            <div className="block rounded-xl border bg-white border-gray-100 p-8 shadow-sm hover:border-primary/20 hover:shadow-primary/10 transition">
              <Share2 className='h-8 w-8 text-primary' />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Easy Sharing</h3>
              <p className="mt-2 text-sm text-gray-600">
                Download your resume as a PDF or share a direct link to your online resume with potential employers. Track views and engagement with analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50">
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="font-bold text-3xl text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">Create your professional resume in three simple steps</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Enter Your Information</h3>
              <p className="text-gray-600">
                Fill in your work experience, education, and skills, or let our AI help you build content from scratch.
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Choose Your Design</h3>
              <p className="text-gray-600">
                Select from professional templates and customize with your preferred colors and layout options.
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Download & Share</h3>
              <p className="text-gray-600">
                Export your resume as a PDF, or share a direct link to your online resume with potential employers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/dashboard"
              className="inline-flex items-center py-3 px-6 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-700 transition"
            >
              <Download className="mr-2 h-5 w-5" />
              Start Building Your Resume
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "The AI suggestions were spot on. I received 3 interview calls within a week of sending out my new resume!"
              </p>
              <p className="font-bold">Sarah J.</p>
              <p className="text-sm text-gray-500">Software Engineer</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "This tool helped me quantify my achievements with compelling metrics. My resume now stands out from the crowd."
              </p>
              <p className="font-bold">Michael R.</p>
              <p className="text-sm text-gray-500">Marketing Manager</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "As a recent graduate with limited experience, this tool helped me create a professional resume that highlighted my potential."
              </p>
              <p className="font-bold">Jamie L.</p>
              <p className="text-sm text-gray-500">Recent Graduate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-indigo-600 text-white">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Professional Resume?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.</p>
          
          <a href="/dashboard" className="inline-flex items-center py-3 px-6 text-base font-medium text-primary bg-white rounded-lg hover:bg-gray-100 transition">
            <Check className="mr-2 h-5 w-5" />
            Get Started Now
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-100">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </div>
  )
}

export default Home