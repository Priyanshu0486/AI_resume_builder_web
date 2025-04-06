import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { FileDown, Loader2 } from 'lucide-react';

function Dashboard() {
  const {user} = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data.data);
        setResumeList(resp.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching resumes:", err);
        setLoading(false);
      });
  }

  // Render skeleton loaders while fetching data
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="rounded-xl overflow-hidden shadow-md border border-gray-200 h-[280px] bg-white">
        <div className="h-32 bg-slate-200 animate-pulse"></div>
        <div className="p-5 space-y-3">
          <div className="h-5 bg-slate-200 rounded-md animate-pulse w-2/3 mx-auto"></div>
          <div className="h-4 bg-slate-200 rounded-md animate-pulse w-1/2 mx-auto"></div>
          <div className="h-4 bg-slate-200 rounded-md animate-pulse w-4/5 mt-6"></div>
          <div className="h-4 bg-slate-200 rounded-md animate-pulse w-3/4"></div>
        </div>
      </div>
    ));
  }

  return (
    <div className='px-6 py-8 md:px-12 lg:px-24 max-w-[1600px] mx-auto'>
      {/* Dashboard Header */}
      <div className="mb-10">
        <h2 className='font-bold text-3xl text-gray-800 mb-2'>My Resumes</h2>
        <p className='text-gray-500'>Create and manage your professional resumes with AI assistance</p>
      </div>

      {/* Resume Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8'>
        {/* Add Resume Card always comes first */}
        <AddResume refreshData={GetResumesList}/>
        
        {/* Show loading skeletons or resume cards */}
        {loading ? (
          renderSkeletons()
        ) : resumeList?.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          // Empty state when no resumes exist
          <div className="col-span-full flex flex-col items-center justify-center bg-gray-50 rounded-xl p-10 mt-4 border border-dashed border-gray-300">
            <FileDown className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No resumes yet</h3>
            <p className="text-gray-500 mt-2 text-center max-w-md">
              Click on "Create New Resume" to get started with your first professional resume
            </p>
          </div>
        )}
      </div>
      
      {/* If there's a reasonable number of resumes, show a helpful tip */}
      {resumeList?.length > 0 && resumeList?.length < 4 && (
        <div className="mt-12 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Pro tip:</span> Create multiple versions of your resume tailored to different job roles to increase your chances of getting hired.
          </p>
        </div>
      )}
    </div>
  )
}

export default Dashboard