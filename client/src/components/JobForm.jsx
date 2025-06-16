import { useState, useEffect } from 'react';
import api from '../api';

function JobForm({ fetchJobs, editJob, setEditJob, setIsFormVisible }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    salary_min: '',
    salary_max: '',
    job_type: 'full-time',
    company: '',
    posted_by: '',
  });

  useEffect(() => {
    if (editJob) {
      setForm(editJob);
    }
  }, [editJob]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editJob) {
      await api.put(`/${editJob._id}`, form);
      setEditJob(null);
    } else {
      await api.post('/', form);
    }

    setForm({
      title: '',
      description: '',
      location: '',
      salary_min: '',
      salary_max: '',
      job_type: 'full-time',
      company: '',
      posted_by: '',
    });

    fetchJobs();
    setIsFormVisible(false);
  };

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white transition-all duration-200";
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title field with icon */}
        <div className="md:col-span-2">
          <label htmlFor="title" className={labelClass}>Job Title</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <input 
              id="title"
              name="title" 
              placeholder="e.g. Senior React Developer" 
              value={form.title} 
              onChange={handleChange} 
              required 
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        
        {/* Description field */}
        <div className="md:col-span-2">
          <label htmlFor="description" className={labelClass}>Job Description</label>
          <textarea 
            id="description"
            name="description" 
            placeholder="Describe job responsibilities, requirements, and benefits..." 
            value={form.description} 
            onChange={handleChange} 
            required 
            className={`${inputClass} h-40 resize-y`}
          />
        </div>
        
        {/* Location field with icon */}
        <div>
          <label htmlFor="location" className={labelClass}>Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              id="location"
              name="location" 
              placeholder="e.g. New York, NY or Remote" 
              value={form.location} 
              onChange={handleChange} 
              required 
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        
        {/* Job Type field */}
        <div>
          <label htmlFor="job_type" className={labelClass}>Job Type</label>
          <select 
            id="job_type"
            name="job_type" 
            value={form.job_type} 
            onChange={handleChange}
            className={`${inputClass} appearance-none bg-no-repeat bg-right pr-10`}
            style={{backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundSize: "1.5em 1.5em"}}
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        
        {/* Salary fields */}
        <div>
          <label htmlFor="salary_min" className={labelClass}>Minimum Salary</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input 
              id="salary_min"
              name="salary_min" 
              placeholder="0" 
              type="number" 
              min="0"
              value={form.salary_min} 
              onChange={handleChange}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="salary_max" className={labelClass}>Maximum Salary</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input 
              id="salary_max"
              name="salary_max" 
              placeholder="100,000" 
              type="number"
              min="0" 
              value={form.salary_max} 
              onChange={handleChange}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
        
        {/* Company field with icon */}
        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              id="company"
              name="company" 
              placeholder="Company name" 
              value={form.company} 
              onChange={handleChange} 
              required 
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        
        {/* Posted By field with icon */}
        <div>
          <label htmlFor="posted_by" className={labelClass}>Posted By</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              id="posted_by"
              name="posted_by" 
              placeholder="Your name" 
              value={form.posted_by} 
              onChange={handleChange} 
              required 
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
      </div>

      {/* Form buttons with better styling */}
      <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
        {editJob && (
          <button 
            type="button" 
            onClick={() => {
              setEditJob(null);
              setForm({
                title: '',
                description: '',
                location: '',
                salary_min: '',
                salary_max: '',
                job_type: 'full-time',
                company: '',
                posted_by: '',
              });
            }}
            className="mr-3 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Cancel
          </button>
        )}
        <button 
          type="submit"
          className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
        >
          {editJob ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Update Job
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Post Job
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default JobForm;
