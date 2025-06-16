import { useState, useEffect } from 'react';
import api from '../api';

function JobForm({ fetchJobs, editJob, setEditJob }) {
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
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <input 
          name="title" 
          placeholder="Job Title" 
          value={form.title} 
          onChange={handleChange} 
          required 
          className={inputClass}
        />
      </div>
      
      <div className="md:col-span-2">
        <textarea 
          name="description" 
          placeholder="Description" 
          value={form.description} 
          onChange={handleChange} 
          required 
          className={`${inputClass} h-32`}
        />
      </div>
      
      <div>
        <input 
          name="location" 
          placeholder="Location" 
          value={form.location} 
          onChange={handleChange} 
          required 
          className={inputClass}
        />
      </div>
      
      <div>
        <select 
          name="job_type" 
          value={form.job_type} 
          onChange={handleChange}
          className={inputClass}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>
      </div>
      
      <div>
        <input 
          name="salary_min" 
          placeholder="Min Salary" 
          type="number" 
          value={form.salary_min} 
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      
      <div>
        <input 
          name="salary_max" 
          placeholder="Max Salary" 
          type="number" 
          value={form.salary_max} 
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      
      <div>
        <input 
          name="company" 
          placeholder="Company" 
          value={form.company} 
          onChange={handleChange} 
          required 
          className={inputClass}
        />
      </div>
      
      <div>
        <input 
          name="posted_by" 
          placeholder="Posted By" 
          value={form.posted_by} 
          onChange={handleChange} 
          required 
          className={inputClass}
        />
      </div>

      <div className="md:col-span-2 flex justify-end mt-2">
        {editJob && (
          <button 
            type="button" 
            onClick={() => setEditJob(null)}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          {editJob ? 'Update' : 'Create'} Job
        </button>
      </div>
    </form>
  );
}

export default JobForm;
