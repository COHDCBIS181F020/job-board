import { useState } from 'react';
import { useRouter } from 'next/router';
import { useJobContext } from '../context/JobContext';

export default function AddJob() {
  const { addJob } = useJobContext();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.company.trim()) errs.company = 'Company is required';
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.jobType.trim()) errs.jobType = 'Job type is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addJob(form);
    router.push('/');
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Job</h1>

      <form onSubmit={onSubmit} noValidate>
        {[
          { label: 'Title', name: 'title', type: 'text' },
          { label: 'Company', name: 'company', type: 'text' },
          { label: 'Location', name: 'location', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block font-semibold mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={form[name as keyof typeof form]}
              onChange={onChange}
              className={`w-full p-2 border rounded ${
                errors[name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="jobType" className="block font-semibold mb-1">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={form.jobType}
            onChange={onChange}
            className={`w-full p-2 border rounded ${
              errors.jobType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={onChange}
            className={`w-full p-2 border rounded ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Job
        </button>
      </form>
    </main>
  );
}
