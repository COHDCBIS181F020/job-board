
import { useRouter } from 'next/router';
import { useJobContext } from '../../context/JobContext';

export default function JobDetailPage() {
  const { query } = useRouter();
  const { jobs } = useJobContext();
const jobId = Array.isArray(query.id) ? query.id[0] : query.id;
const job = jobs.find((j) => j.id === Number(jobId));
  if (!job) {
    return <div className="p-6 text-red-500">Job not found</div>;
  }

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="flex flex-wrap">
      <p className="text-lg text-gray-700 mb-2 border p-2 m-3 ms-0">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="text-lg text-gray-700 mb-2 border p-2 m-3 ms-0">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-lg text-gray-700 mb-2 border p-2 m-3 ms-0">
        <strong>Type:</strong> {job.jobType}
      </p>
      </div>
      <p className="text-gray-600 mt-4">{job.description}</p>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => alert('Apply feature is mocked for this demo.')}
      >
        Apply Now
      </button>
    </div>
  );
}
