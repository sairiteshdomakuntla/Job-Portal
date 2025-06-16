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

  const getJobTypeBadgeClass = (jobType) => {
    switch(jobType) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'internship':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
      
      {jobs.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-md text-center">
          <p className="text-gray-500">No jobs found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <h4 className="text-lg text-gray-700 mb-4">{job.company}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeBadgeClass(job.job_type)}`}>
                    {job.job_type.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{job.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span> {job.location}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Salary Range:</span> ₹{job.salary_min.toLocaleString()} – ₹{job.salary_max.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Posted By:</span> {job.posted_by}
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setEditJob(job)}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(job._id)} 
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
