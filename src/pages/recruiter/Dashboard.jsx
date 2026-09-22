import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/date';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Users, Briefcase, TrendingUp, Loader2, X, PlusCircle } from 'lucide-react';
import { api } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';

export const RecruiterDashboard = () => {
  const { user, systemSettings, fetchSystemSettings } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchSystemSettings();
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs/recruiter/my-jobs');
        setJobs(res.data.filter(j => !j.is_deleted));
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) { endPage = 4; }
    if (currentPage >= totalPages - 2) { startPage = totalPages - 3; }
    if (startPage > 2) { pages.push('...'); }
    for (let i = startPage; i <= endPage; i++) { pages.push(i); }
    if (endPage < totalPages - 1) { pages.push('...'); }
    pages.push(totalPages);
    return pages;
  };
const paginatedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (e, newPage) => {
    e.preventDefault();
    if (newPage === currentPage) return;
    if (newPage < currentPage) {
      const footer = document.getElementById('pagination-footer');
      const yBefore = footer ? footer.getBoundingClientRect().top : 0;
      setCurrentPage(newPage);
      setTimeout(() => {
        const footerAfter = document.getElementById('pagination-footer');
        if (footerAfter && yBefore) {
          const yAfter = footerAfter.getBoundingClientRect().top;
          window.scrollBy(0, yAfter - yBefore);
        }
      }, 0);
    } else {
      setCurrentPage(newPage);
    }
  };

  const nonDeletedJobs = jobs.filter(job => job.status !== 'deleted' && job.status !== 'Deleted');
  const totalJobsCount = nonDeletedJobs.length;
  const activeJobsCount = jobs.filter(job => (job.status || '').toLowerCase() === 'active').length;
  const totalApplicants = nonDeletedJobs.reduce((sum, job) => sum + parseInt(job.applications_count || 0), 0);

  

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name.split(' ')[0]}!</h1>
        {systemSettings?.allow_job_posting === false ? (
          <Button onClick={() => setNotification('Job postings are currently disabled by administration.')}>
            + Post New Job
          </Button>
        ) : (
          <Link to="/recruiter/post-job"><Button>+ Post New Job</Button></Link>
        )}
      </div>

      {notification && (
        <div className={`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium ${
          notification.includes('Failed') || notification.includes('disabled')
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }`}>
          <span>{notification}</span>
          <button 
            onClick={() => setNotification('')}
            className={`p-1 rounded-md transition-colors ${
              notification.includes('Failed') || notification.includes('disabled')
                ? 'hover:bg-red-100 text-red-600' 
                : 'hover:bg-green-100 text-green-600'
            }`}
            title="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Briefcase className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Jobs</p>
              <p className="text-2xl font-bold">{totalJobsCount}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="hover:border-emerald-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><TrendingUp className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Jobs</p>
              <p className="text-2xl font-bold">{activeJobsCount}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:border-indigo-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Users className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Applicants</p>
              <p className="text-2xl font-bold">{totalApplicants}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">All Job Postings</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                  <th className="px-6 py-3">
                      <div className="flex justify-end">
                        <div className="w-28 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Posted Date
                        </div>
                      </div>
                    </th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedJobs.map(job => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link to={`/recruiter/applicants?jobId=${job.id}`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer">
                          {job.applications_count || 0} {job.applications_count === 1 ? 'Candidate' : 'Candidates'}
                        </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-end">
                        <div className="w-28 text-left text-sm text-gray-500">
                          {formatDate(job.created_at)}
                        </div>
                      </div>
                    </td>
                  
                </tr>
              ))}
              {!loading && jobs.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                    <p className="mb-4">No jobs found. Post a job to get started!</p>
                    <Link 
                      to="/recruiter/post-job"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-colors shadow-sm"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Post Your First Job
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Footer */}
          {!loading && jobs.length > 0 && (
            <div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg">
              <div className="text-sm text-gray-500">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, jobs.length)} to {Math.min(currentPage * itemsPerPage, jobs.length)} of {jobs.length} jobs
              </div>
              <div className="flex flex-wrap justify-center gap-2 items-center w-full md:w-auto">
                <Button 
                  variant="ghost" 
                  disabled={currentPage === 1}
                  onClick={(e) => handlePageChange(e, Math.max(1, currentPage - 1))}
                  className="px-3"
                >
                  Previous
                </Button>
                <div className="flex flex-wrap items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={(e) => page !== '...' && handlePageChange(e, page)}
                      disabled={page === '...'}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${page === '...' ? 'cursor-default text-gray-400 hover:bg-transparent' : currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={(e) => handlePageChange(e, Math.min(totalPages, currentPage + 1))}
                  className="px-3"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


