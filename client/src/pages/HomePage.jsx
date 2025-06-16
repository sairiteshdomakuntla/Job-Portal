import { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import api from '../api';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchJobs = async () => {
    const res = await api.get('/');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (editJob) {
      setIsFormVisible(true);
    }
  }, [editJob]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              <span className="inline-block transform -rotate-2 text-yellow-300">Job</span> Portal
            </h1>
            <button 
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg 
                         shadow-md transition-all duration-300 flex items-center gap-2 font-medium"
            >
              {isFormVisible ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Hide Form
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Post a Job
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Form Section with slide animation */}
        <div className={`transition-all duration-500 ease-in-out mb-8 ${isFormVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
              {editJob ? 'Edit Job Details' : 'Create New Job Listing'}
            </h2>
            <JobForm fetchJobs={fetchJobs} editJob={editJob} setEditJob={setEditJob} setIsFormVisible={setIsFormVisible} />
          </div>
        </div>
        
        {/* Job Listings Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <JobList jobs={jobs} fetchJobs={fetchJobs} setEditJob={setEditJob} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;