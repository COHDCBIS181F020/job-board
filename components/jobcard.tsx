import Link from 'next/link';
import { Job } from '../types/job';

type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job.id}`} className="block border p-4 rounded-md shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company} – {job.location}</p>
      <p className="text-sm mt-2 text-gray-700 line-clamp-2">{job.description}</p>
    </Link>
  );
}
