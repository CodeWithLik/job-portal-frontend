import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/date';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Search, Edit2, Trash2, Shield, ShieldOff, Eye, PlusCircle, AlertTriangle, CheckCircle, Ban, X, Loader2 } from 'lucide-react';
import { api } from '../../context/AuthContext';

export const AdminJobs = () => {
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'https://job-portal-backend-bx41.onrender.com';
    return `${baseUrl}${url}`;
  };
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [notification, setNotification] = useState('');
  
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [jobToView, setJobToView] = useState(null);

  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [jobToSuspend, setJobToSuspend] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [activateModalOpen, setActivateModalOpen] = useState(false);
  const [jobToActivate, setJobToActivate] = useState(null);
  const [suspendError, setSuspendError] = useState('');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/admin/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, statusFilter]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || job.employment_type.toLowerCase() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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

  const currentJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (e, newPage) => {
    e.preventDefault();
    if (newPage === currentPage) return;
    
    if (newPage < currentPage) {
      const footer = document.getElementById('jobs-pagination-footer');
      const yBefore = footer ? footer.getBoundingClientRect().top : 0;
      
      setCurrentPage(newPage);
      
      setTimeout(() => {
        const footerAfter = document.getElementById('jobs-pagination-footer');
        if (footerAfter && yBefore) {
          const yAfter = footerAfter.getBoundingClientRect().top;
          window.scrollBy(0, yAfter - yBefore);
        }
      }, 0);
    } else {
      setCurrentPage(newPage);
    }
  };

  const confirmSuspend = (job) => {
    if (job.status === 'Suspended') {
      setJobToActivate(job);
      setActivateModalOpen(true);
    } else {
      setJobToSuspend(job);
      setSuspendReason('');
      setSuspendError('');
      setSuspendModalOpen(true);
    }
  };

  const executeActivate = async (e) => {
    e.preventDefault();
    if (jobToActivate && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.patch(`/admin/jobs/${jobToActivate.id}`, { status: 'Active' });
        setJobs(jobs.map(j => j.id === jobToActivate.id ? { ...j, status: 'Active' } : j));
        setActivateModalOpen(false);
        setJobToActivate(null);
        showNotification('Job listing successfully activated.', 'success');
      } catch (err) {
        console.error('Failed to activate job:', err);
        showNotification('Failed to activate job', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const executeSuspend = async (e) => {
    e.preventDefault();
    if (!suspendReason.trim()) {
      setSuspendError('Please provide a reason for suspension.');
      return;
    }
    if (jobToSuspend && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.patch(`/admin/jobs/${jobToSuspend.id}`, { status: 'Suspended', reason: suspendReason });
        setJobs(jobs.map(j => j.id === jobToSuspend.id ? { ...j, status: 'Suspended' } : j));
        setSuspendModalOpen(false);
        setJobToSuspend(null);
        setSuspendReason('');
        showNotification('Job status updated to Suspended');
      } catch (err) {
        console.error('Failed to suspend job:', err);
        showNotification('Failed to suspend job');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const confirmDelete = (job) => {
    setJobToDelete(job);
    setDeleteReason('');
    setDeleteError('');
    setDeleteModalOpen(true);
  };

  const executeDelete = async (e) => {
    e.preventDefault();
    if (!deleteReason.trim()) {
      setDeleteError('Please provide a reason for deletion.');
      return;
    }
    if (jobToDelete && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.delete(`/admin/jobs/${jobToDelete.id}`, { data: { reason: deleteReason } });
        setJobs(jobs.filter(j => j.id !== jobToDelete.id));
        setDeleteModalOpen(false);
        setJobToDelete(null);
        showNotification('Job deleted successfully');
      } catch (err) {
        console.error('Failed to delete job:', err);
        showNotification('Failed to delete job');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Job Moderation</h1>
        </div>
      </div>

      {notification && (
        <div className={`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium ${
          notification.includes('Failed')
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }`}>
          <span>{notification}</span>
          <button 
            onClick={() => setNotification('')}
            title="Dismiss"
            className={`p-1 rounded-md transition-colors ${
              notification.includes('Failed')
                ? 'hover:bg-red-100 text-red-600' 
                : 'hover:bg-green-100 text-green-600'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <Card>
        <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row justify-between gap-4 bg-gray-50/50">
          <div className="w-full lg:w-96 flex items-center relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by title or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <select 
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <select 
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">Job Title & Company</th>
                <th className="p-4 font-medium">Recruiter</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Applicants</th>
                <th className="p-4 font-medium">Posted</th>
                <th className="p-4 font-medium text-center">Actions</th>
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
) : currentJobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">No jobs found matching your filters.</td>
                </tr>
              ) : currentJobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-gray-500 text-xs flex items-center gap-1">
                      {job.company_name} • {job.employment_type}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-900">{job.recruiter_name}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant={
                      job.status === 'Active' ? 'success' : 
                        job.status === 'Closed' ? 'sand' :
                        job.status === 'Suspended' ? 'error' : 'gray'
                    }>
                      {job.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-900">{job.application_count}</div>
                  </td>
                  <td className="p-4 text-gray-500">
                    {formatDate(job.created_at)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => { setJobToView(job); setDetailsModalOpen(true); }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50" 
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button 
                          onClick={() => confirmSuspend(job)} 
                          className={`p-1.5 rounded-md transition-colors ${
                            job.status !== 'Suspended' 
                              ? 'text-gray-400 hover:text-orange-600 hover:bg-orange-50' 
                              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }`}
                          title={job.status !== 'Suspended' ? 'Suspend Job' : 'Activate Job'}
                        >
                          {job.status !== 'Suspended' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                        </button>
                      
                      <button 
                        onClick={() => confirmDelete(job)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50" 
                        title="Delete Job"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!loading && filteredJobs.length > 0 && (
          <div id="jobs-pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg">
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
              <div className="flex items-center gap-1">
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
      </Card>

      <Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} title="Job Details">
        {jobToView && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-100 shrink-0">
                  {jobToView.company_logo ? (
                    <img 
                      src={getImageUrl(jobToView.company_logo)} 
                      alt={jobToView.company_name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    (jobToView.company_name || 'C').charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{jobToView.title}</h3>
                  <p className="text-gray-600 text-sm">{jobToView.company_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{jobToView.location}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge variant={
                  jobToView.status === 'Active' ? 'success' : 
                  jobToView.status === 'Suspended' ? 'error' : 'gray'
                }>
                  {jobToView.status}
                </Badge>
                <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">Posted: <span className="font-semibold text-gray-700">{formatDate(jobToView.created_at)}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Salary Range</span>
                <span className="text-sm font-medium text-gray-900">
                  {jobToView.salary_min && jobToView.salary_max 
                    ? `${jobToView.salary_min.toLocaleString()} - ${jobToView.salary_max.toLocaleString()}`
                    : 'Not specified'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Employment Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">{jobToView.employment_type || 'Not specified'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Category</span>
                <span className="text-sm font-medium text-gray-900">{jobToView.category || 'Not specified'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Total Applicants</span>
                <span className="text-sm font-medium text-blue-600">{jobToView.application_count || 0} applications</span>
              </div>
            </div>
            
            <div>
              <span className="block text-xs font-semibold text-gray-700 mb-1">Job Description</span>
              <div className="bg-white border border-gray-100 p-3 rounded-md text-sm text-gray-700 whitespace-pre-line max-h-32 overflow-y-auto shadow-inner">
                {jobToView.description}
              </div>
            </div>
            
            <div className="pt-3 shrink-0 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                {jobToView.status !== 'Suspended' ? (
                  <Button 
                    variant="ghost" 
                    onClick={() => { setDetailsModalOpen(false); confirmSuspend(jobToView); }}
                    className="text-orange-600 hover:bg-orange-50 hover:text-orange-700 text-sm px-3 py-1.5"
                  >
                    Suspend Job
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={() => { setDetailsModalOpen(false); confirmSuspend(jobToView); }}
                    className="text-green-600 hover:bg-green-50 hover:text-green-700 text-sm px-3 py-1.5"
                  >
                    Activate Job
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => { setDetailsModalOpen(false); confirmDelete(jobToView); }} 
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 text-sm px-3 py-1.5"
                >
                  Delete Job
                </Button>
              </div>
              <div>
                <Button variant="secondary" onClick={() => setDetailsModalOpen(false)} className="text-sm px-3 py-1.5">Close</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Job">
          <form onSubmit={executeDelete} className="space-y-4" noValidate>
            <div>
              <p className="text-gray-700 text-base">
                Are you sure you want to delete <strong>{jobToDelete?.title}</strong>?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone and will permanently remove all associated candidate applications.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for deletion *</label>
              <textarea 
                className={`w-full px-3 py-2 border ${deleteError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors`} 
                rows="3"
                value={deleteReason}
                onChange={(e) => {
                  setDeleteReason(e.target.value);
                  if (deleteError) setDeleteError('');
                }}
                placeholder="e.g., Spam posting, expired opening, policy violation..."
                disabled={isSubmitting}
              ></textarea>
              {deleteError && <p className="text-red-500 text-sm mt-1">{deleteError}</p>}
              <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the deletion notification email sent to the employer.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setDeleteModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Delete Job'}
              </Button>
            </div>
          </form>
        </Modal>

      
      {/* Reactivate Job Modal */}
      <Modal isOpen={activateModalOpen} onClose={() => setActivateModalOpen(false)} title="Reactivate Job">
        <form onSubmit={executeActivate} className="space-y-4">
          <p className="text-gray-700 text-base">
            Are you sure you want to restore access for <strong>{jobToActivate?.title}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setActivateModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
              {isSubmitting ? 'Reactivating...' : 'Reactivate'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Suspend Job Modal */}
      <Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend Job">
        <form onSubmit={executeSuspend} className="space-y-4" noValidate>
          <div>
            <p className="text-gray-700 text-base">Are you sure you want to suspend <strong>{jobToSuspend?.title}</strong>?</p>
            <p className="text-sm text-gray-500 mt-1">This will hide the listing and prevent job seekers from applying until unsuspended.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for suspension *</label>
            <textarea 
              className={`w-full px-3 py-2 border ${suspendError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors`} 
              rows="3"
              value={suspendReason}
              onChange={(e) => {
                setSuspendReason(e.target.value);
                if (suspendError) setSuspendError('');
              }}
              placeholder="e.g., Inaccurate job details, spam listing, policy violation..."
              disabled={isSubmitting}
            ></textarea>
            {suspendError && <p className="text-red-500 text-sm mt-1">{suspendError}</p>}
            <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the automated notification email sent to the employer.</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setSuspendModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
              {isSubmitting ? 'Suspending...' : 'Suspend Job'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
