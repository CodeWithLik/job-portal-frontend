import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/date';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Search, Loader2, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { api } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';

export const ManageJobs = () => {
  const { systemSettings, fetchSystemSettings } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(location.state?.message || '');
  const [jobToDelete, setJobToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSystemSettings();
  }, []);

  useEffect(() => {
    // Clear the location state so the message doesn't persist on reload
    if (location.state?.message) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && jobToDelete) {
        setJobToDelete(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jobToDelete]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs/recruiter/my-jobs');
        setJobs(res.data.filter(j => !j.is_deleted));
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const job = jobs.find(j => j.id === id);
      let res;

      if (status === 'Closed') {
        res = await api.patch(`/jobs/${id}/close`);
      } else {
        const payload = { ...job, status };
        if (status === 'Active' && job.expires_at && Math.ceil((new Date(job.expires_at) - new Date()) / (1000 * 60 * 60 * 24)) < 0) {
          // If reopening an expired job without editing, give it 30 days
          const newExpiry = new Date();
          newExpiry.setDate(newExpiry.getDate() + 30);
          payload.expires_at = newExpiry.toISOString();
        }
        res = await api.put(`/jobs/${id}`, payload);
      }
      
      setJobs(jobs.map(j => j.id === id ? { ...j, ...res.data } : j));
      setNotification(`Job ${status === 'Closed' ? 'closed' : 'reopened'} successfully.`);
    } catch (err) {
      console.error('Failed to change status', err);
      setNotification(`Failed to ${status === 'Closed' ? 'close' : 'reopen'} job. Please try again.`);
    }
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      await api.delete(`/jobs/${jobToDelete.id}`);
      setJobs(jobs.filter(job => job.id !== jobToDelete.id));
      setNotification('Job deleted successfully.');
    } catch (err) {
      console.error('Failed to delete job', err);
      setNotification('Failed to delete job. Please try again.');
    } finally {
      setJobToDelete(null);
    }
  };

  

  const filteredJobs = jobs.filter(job => {
    return (job.title || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  

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
const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Postings</h1>
        {systemSettings?.allow_job_posting === false ? (
          <button 
            onClick={() => setNotification('Job postings are currently disabled by administration.')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Post a New Job
          </button>
        ) : (
          <Link to="/recruiter/post-job" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
            Post a New Job
          </Link>
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

      <Card>
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <div className="w-full sm:w-96 flex items-center relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search your job postings..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">Job Title</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Applicants</th>
                <th className="p-4 font-medium">Posted Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-100 last:border-0">
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div></td>
                    </tr>
                  ))
) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No jobs found.
                  </td>
                </tr>
              ) : paginatedJobs.map(job => {
                const isExpired = (job.expires_at && new Date(job.expires_at) < new Date()) || job.status === 'Expired';
                const badgeVariant = job.status === 'Closed' ? 'sand' : job.status === 'Suspended' ? 'error' : isExpired ? 'danger' : job.status === 'Active' ? 'success' : 'warning';
                const badgeText = job.status === 'Closed' ? 'Closed' : job.status === 'Suspended' ? 'Suspended' : isExpired ? 'Expired' : job.status;
                
                return (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-gray-500 text-xs">{job.location} • {job.employment_type}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant={badgeVariant}>
                      {badgeText}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Link to={`/recruiter/applicants?jobId=${job.id}`} className="text-blue-600 hover:underline font-medium">
                      {job.applications_count || 0} Applicants
                    </Link>
                  </td>
                  <td className="p-4 text-gray-500">
                    {formatDate(job.created_at)}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {job.status === 'Suspended' ? (
                      <span className="text-gray-400 font-medium px-2 py-1 cursor-not-allowed" title="Suspended jobs cannot be edited">Edit</span>
                    ) : (
                      <Link to={`/recruiter/jobs/edit/${job.id}`} className="text-blue-600 hover:text-blue-900 font-medium px-2 py-1">Edit</Link>
                    )}
                    
                    {job.status === 'Active' ? (
                      <button onClick={() => handleStatusChange(job.id, 'Closed')} className="text-orange-600 hover:text-orange-900 font-medium px-2 py-1">Close</button>
                    ) : job.status === 'Suspended' ? (
                      <button disabled className="text-gray-400 font-medium px-2 py-1 cursor-not-allowed" title="Job suspended by admin">Reopen</button>
                    ) : (
                      <button onClick={() => handleStatusChange(job.id, 'Active')} className="text-green-600 hover:text-green-900 font-medium px-2 py-1">Reopen</button>
                    )}
                    
                    <button onClick={() => handleDeleteClick(job)} className="text-red-600 hover:text-red-900 font-medium px-2 py-1">Delete</button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
          {/* Pagination Footer */}
          {!loading && filteredJobs.length > 0 && (
            <div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg">
              <div className="text-sm text-gray-500">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredJobs.length)} to {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of {filteredJobs.length} jobs
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
      </Card>

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setJobToDelete(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Delete Job</h3>
                <button 
                  onClick={() => setJobToDelete(null)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 font-medium mb-1">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">"{jobToDelete.title}"</span>?
                </p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. Public listings will be removed, but your existing applicant records will remain accessible.
                </p>
              </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
              <Button variant="outline" onClick={() => setJobToDelete(null)}>
                Cancel
              </Button>
              <Button 
                variant="danger"
                onClick={confirmDelete}
              >
                Delete Job
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


