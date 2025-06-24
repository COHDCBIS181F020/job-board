import { useJobContext } from '../context/JobContext';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const JOBS_PER_PAGE = 12;

export default function JobListings() {
  const { jobs } = useJobContext();

  const [filterJobType, setFilterJobType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const jobTypes = useMemo(() => [...new Set(jobs.map((job) => job.jobType))], [jobs]);
  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location))], [jobs]);
  const companies = useMemo(() => [...new Set(jobs.map((job) => job.company))], [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        (filterJobType === '' || job.jobType === filterJobType) &&
        (filterLocation === '' || job.location === filterLocation) &&
        (filterCompany === '' || job.company === filterCompany)
      );
    });
  }, [jobs, filterJobType, filterLocation, filterCompany]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  function handleFilterChange(setter: React.Dispatch<React.SetStateAction<string>>, value: string) {
    setter(value);
    setCurrentPage(1);
  }

  return (
    <main>
      <div className="flex flex-wrap gap-4 mt-6 justify-start sm:justify-between">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-start sm:justify-between">
        <select
          value={filterJobType}
          onChange={(e) => handleFilterChange(setFilterJobType, e.target.value)}
          className="border rounded p-3 bg-white"
        >
          <option value="">All Job Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={filterLocation}
          onChange={(e) => handleFilterChange(setFilterLocation, e.target.value)}
          className="border rounded p-3 bg-white"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={filterCompany}
          onChange={(e) => handleFilterChange(setFilterCompany, e.target.value)}
          className="border rounded p-3 bg-white"
        >
          <option value="">All Companies</option>
          {companies.map((comp) => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>
      </div>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedJobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block bg-white border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-700 mt-1">
              {job.company} • {job.location}
            </p>
            <p className="mt-2 text-gray-600 text-sm line-clamp-3">{job.description}</p>
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
              {job.jobType}
            </span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === idx + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
 