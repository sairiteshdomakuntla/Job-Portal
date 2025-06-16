import { useState } from 'react';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import api from '../api';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);

  const fetchJobs = async () => {
    const res = await api.get('/');
    setJobs(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Job Portal</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editJob ? 'Edit Job' : 'Post a New Job'}
          </h2>
          <JobForm fetchJobs={fetchJobs} editJob={editJob} setEditJob={setEditJob} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <JobList jobs={jobs} fetchJobs={fetchJobs} setEditJob={setEditJob} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;