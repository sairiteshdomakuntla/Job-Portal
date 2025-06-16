// filepath: d:\proj\job-portal\client\src\components\JobList.jsx
import { useEffect } from 'react';
import api from '../api';

function JobList({ jobs, fetchJobs, setEditJob }) {
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      await api.delete(`/${id}`);
      fetchJobs();
    }
  };

  const getJobTypeConfig = (jobType) => {
    switch(jobType) {
      case 'full-time':
        return {
          badgeClass: 'bg-green-100 text-green-800 border border-green-200',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'part-time':
        return {
          badgeClass: 'bg-blue-100 text-blue-800 border border-blue-200',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'internship':
        return {
          badgeClass: 'bg-purple-100 text-purple-800 border border-purple-200',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          )
        };
      case 'contract':
        return {
          badgeClass: 'bg-orange-100 text-orange-800 border border-orange-200',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          )
        };
      default:
        return {
          badgeClass: 'bg-gray-100 text-gray-800 border border-gray-200',
          icon: null
        };
    }
  };

  const formatSalary = (number) => {
    if (!number) return "0";
    
    // Convert to number if it's a string
    const num = typeof number === 'string' ? parseFloat(number) : number;
    
    // Format based on size
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + ' Lakh';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    } else {
      return num.toString();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center">
        <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </span>
        Job Listings
        <span className="ml-3 text-base font-normal text-gray-500">({jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found)</span>
      </h2>
      
      {jobs.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl py-12 px-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 text-lg">No job listings found</p>
          <p className="text-gray-400 mt-2">Create your first job posting to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => {
            const jobTypeConfig = getJobTypeConfig(job.job_type);
            return (
              <div 
                key={job._id} 
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white group"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-3 rounded-lg mr-4 text-gray-500 hidden sm:block">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{job.title}</h3>
                          <h4 className="text-md text-gray-600 mt-1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                            </svg>
                            {job.company}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center whitespace-nowrap ${jobTypeConfig.badgeClass}`}>
                      {jobTypeConfig.icon}
                      {job.job_type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">{job.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{job.location || "Location not specified"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <span>₹{formatSalary(job.salary_min)} - ₹{formatSalary(job.salary_max)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>Posted by {job.posted_by}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-100 gap-3">
                    <div className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditJob(job)}
                        className="px-4 py-2 text-blue-600 hover:text-white bg-white hover:bg-blue-600 border border-blue-600 
                                  rounded-lg transition-colors duration-200 flex items-center text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(job._id)} 
                        className="px-4 py-2 text-red-600 hover:text-white bg-white hover:bg-red-600 border border-red-600 
                                  rounded-lg transition-colors duration-200 flex items-center text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default JobList;