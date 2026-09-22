import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { Card, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Bookmark, MapPin, Briefcase, Loader2, Trash2, X, Calendar } from 'lucide-react';
import { api } from '../../context/AuthContext';

export const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.max(1, Math.ceil(savedJobs.length / itemsPerPage));
  const paginatedJobs = savedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const handlePageChange = (e, newPage) => {
    e.preventDefault();
    if (newPage === currentPage) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await api.get('/jobs/seeker/saved-jobs');
        // The API returns job details joined with saved_jobs table
        setSavedJobs(res.data);
      } catch (err) {
        console.error('Failed to load saved jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/jobs/${id}/save`);
      setSavedJobs(savedJobs.filter(job => job.id !== id));
      setNotification({ type: 'success', text: 'Job removed from saved list.' });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error('Failed to remove saved job', err);
      setNotification({ type: 'error', text: 'Failed to remove job.' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getJobLink = (id) => `/seeker/jobs/${id}`;

  

  return (
    <div className="space-y-6 max-w-5xl">
      {notification && (
        <div className={`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-medium ${
          notification.type === 'error'
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }`}>
          <span>{notification.text}</span>
          <button 
            onClick={() => setNotification(null)}
            className={`p-1 rounded-md transition-colors ${
              notification.type === 'error'
                ? 'hover:bg-red-100 text-red-600'
                : 'hover:bg-green-100 text-green-600'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-3 mb-6">
        <Bookmark className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
      </div>

      {loading ? (
          <div className="grid grid-cols-1 gap-4 w-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse w-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-1/2">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
) : savedJobs.length > 0 ? (
        <div className="flex flex-col w-full">
          <div className="space-y-4">
          {paginatedJobs.map(job => {
            const isDeleted = job.is_deleted || job.status === 'Deleted' || job.status === 'deleted';
            const isClosed = job.status === 'Closed' || job.status === 'closed';
            const isSuspended = job.status === 'Suspended' || job.status === 'suspended';
            
            let isExpired = job.status === 'Expired' || isDeleted;
            if (job.expires_at) {
              const daysLeft = Math.ceil((new Date(job.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
              isExpired = isExpired || daysLeft < 0;
            }

            const appStatusLower = (job.application_status || '').toLowerCase();
            let badge = null;

            const bColors = {
              applied: "bg-gray-100 text-gray-800",
              shortlisted: "bg-yellow-100 text-yellow-800",
              interview: "bg-indigo-100 text-indigo-800",
              hired: "bg-green-100 text-green-800",
              rejected: "bg-red-100 text-red-800",
              closed: "bg-amber-50 text-amber-700 border border-amber-200/60",
              cancelled: "bg-rose-50 text-rose-700 border border-rose-200/60",
            };

            const makeBadge = (text, cls) => (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 ${cls}`}>
                {text}
              </span>
            );

            if (job.application_status) {
              const displayStatus = job.application_status.charAt(0).toUpperCase() + job.application_status.slice(1);
              if (appStatusLower === 'hired') {
                badge = makeBadge(`My Status: Hired`, bColors.hired);
              } else if (appStatusLower === 'rejected') {
                badge = makeBadge(`My Status: Rejected`, bColors.rejected);
              } else if (isDeleted) {
                badge = makeBadge(`Position Cancelled`, bColors.cancelled);
              } else if (appStatusLower === 'interview') {
                badge = makeBadge(`My Status: Interview`, bColors.interview);
              } else if (appStatusLower === 'shortlisted') {
                badge = makeBadge(`My Status: Shortlisted`, bColors.shortlisted);
              } else {
                badge = makeBadge(`My Status: ${displayStatus}`, bColors.applied);
              }
            } else {
              // Not applied
              if (isDeleted) {
                badge = makeBadge(`Position Cancelled`, bColors.cancelled);
              } else if (isClosed) {
                badge = makeBadge(`Closed`, bColors.closed);
              } else if (isSuspended) {
                badge = makeBadge(`Suspended`, "bg-red-100 text-red-700");
              } else if (isExpired) {
                badge = makeBadge(`Expired`, "bg-red-100 text-red-700");
              }
            }

            return (
              <Card key={job.id} className="hover:border-blue-200 transition-colors">
                <CardBody className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        <Link to={getJobLink(job.id)} className="hover:text-blue-600">{job.title}</Link>
                      </h2>
                      {badge}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-600 font-medium">{job.company}</p>
                      {job.saved_at && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4" /> Saved on: {formatDate(job.saved_at)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 items-center mt-4 md:mt-0">
                    <Link to={getJobLink(job.id)}>
                      <Button variant="outline">View Job</Button>
                    </Link>
                    <button 
                      onClick={() => handleRemove(job.id)} 
                      className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50" 
                      title="Remove from saved jobs"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Pagination Footer */}
        
          <div className="mt-6 p-4 border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-lg">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, savedJobs.length)} to {Math.min(currentPage * itemsPerPage, savedJobs.length)} of {savedJobs.length} jobs
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
                disabled={currentPage === totalPages}
                onClick={(e) => handlePageChange(e, Math.min(totalPages, currentPage + 1))}
                className="px-3"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardBody className="p-8 text-center text-gray-500 flex flex-col items-center">
            <Bookmark className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-1">No Saved Jobs</p>
            <p className="mb-4">You haven't saved any jobs yet. Browse jobs and save them for later.</p>
            <Link to="/seeker/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
