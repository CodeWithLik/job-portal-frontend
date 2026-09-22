import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/date';
import { Card, CardBody } from '../../components/common/Card';
import { AppStatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Search, User, Calendar, FileText, Users, Download } from 'lucide-react';
import { api } from '../../context/AuthContext';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export const Applicants = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialJobId = queryParams.get('jobId') || 'all';

  const [selectedJob, setSelectedJob] = useState(initialJobId);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const [applicants, setApplicants] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    setSelectedJob(currentParams.get('jobId') || 'all');
  }, [location.search]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const [appRes, jobsRes] = await Promise.all([
          api.get('/recruiter/applications'),
          api.get('/jobs/recruiter/my-jobs')
        ]);
        setApplicants(appRes.data);
        setAllJobs(jobsRes.data);
      } catch (err) {
        console.error('Failed to load applicants', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      await api.put(`/applications/${applicantId}`, { status: newStatus });
      setApplicants(applicants.map(app => 
        app.id === applicantId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      console.error('Failed to update status', err);
      alert('Failed to update status');
    }
  };

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedJob, selectedStatus, sortBy]);

  const filteredApplicants = applicants.filter(app => {
    if (selectedJob !== 'all' && app.job_id.toString() !== selectedJob) return false;
    if (selectedStatus !== 'all' && app.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.applied_at) - new Date(b.applied_at);
    }
    return new Date(b.applied_at) - new Date(a.applied_at);
  });
  
  // Pagination logic
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  

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
const paginatedApplicants = filteredApplicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <h1 className="text-2xl font-bold text-gray-900">Manage Applicants</h1>
      </div>

      <div className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <select 
            value={selectedJob} 
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Jobs</option>
            {allJobs.map(job => (
              <option key={job.id} value={job.id.toString()}>{job.title}{job.is_deleted ? ' (Deleted)' : ''}</option>
            ))}
          </select>

          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="newest">Newest Applied</option>
            <option value="oldest">Oldest Applied</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
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
) : filteredApplicants.length === 0 ? (
          <Card>
            <CardBody className="p-8 text-center text-gray-500">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p>No applicants found matching your filters.</p>
            </CardBody>
          </Card>
        ) : paginatedApplicants.map(app => (
          <Card key={app.id} className="overflow-hidden">
            <CardBody className="p-6 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{app.seeker_name}</h3>
                  <p className="text-sm text-gray-500 font-medium">Applying for: {app.job_title}</p>
                  <p className="text-xs text-gray-400">{app.seeker_email}</p>
                </div>
                <AppStatusBadge status={app.status} />
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {app.skills ? app.skills.split(',').map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {skill.trim()}
                      </span>
                    )) : <span className="text-gray-400 text-xs">No skills listed</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-500 font-medium shrink-0 sm:ml-4 sm:mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>Applied on: {formatDate(app.applied_at)}</span>
                </div>
              </div>
              
              {app.cover_letter && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md italic border border-gray-100 whitespace-pre-wrap">
                    {app.cover_letter}
                  </p>
                </div>
              )}
              
              <div className="mt-6 flex flex-col md:flex-row gap-4 sm:items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full md:w-auto">
                  <button 
                    onClick={() => navigate(`/recruiter/applicants/${app.id}/profile`)}
                    className="w-full sm:w-auto justify-center px-4 py-2 text-sm font-medium rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 flex items-center gap-2 transition-colors duration-200"
                  >
                    <User className="h-4 w-4" /> View Profile
                  </button>
                  
                  {app.resume_url ? (
                    <div className="inline-flex shadow-sm w-full sm:w-auto" role="group">
                      <a 
                        href={app.resume_url.startsWith('http') ? app.resume_url : `https://job-portal-backend-bx41.onrender.com${app.resume_url}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-600 rounded-l-md hover:bg-blue-50 focus:z-10 focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-200"
                      >
                        <FileText className="h-4 w-4" /> View Resume
                      </a>
                      <a 
                        href={app.resume_url.startsWith('http') ? app.resume_url : `https://job-portal-backend-bx41.onrender.com${app.resume_url}`} 
                        download={app.seeker_name ? `${app.seeker_name.replace(/\s+/g, '_')}_Application_Resume.pdf` : 'Application_Resume.pdf'}
                        className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-l-0 border-blue-600 rounded-r-md hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition-colors duration-200"
                        title="Download Application Resume"
                        onClick={(e) => {
                          e.preventDefault();
                          const url = app.resume_url.startsWith('http') ? app.resume_url : `https://job-portal-backend-bx41.onrender.com${app.resume_url}`;
                          fetch(url)
                            .then(res => res.blob())
                            .then(blob => {
                              const blobUrl = window.URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = blobUrl;
                              link.download = app.seeker_name ? `${app.seeker_name.replace(/\s+/g, '_')}_Application_Resume.pdf` : 'Application_Resume.pdf';
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              window.URL.revokeObjectURL(blobUrl);
                            })
                            .catch(err => {
                              console.error('Download failed', err);
                              window.open(url, '_blank');
                            });
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  ) : (
                    <button 
                      disabled
                      className="w-full sm:w-auto justify-center px-4 py-2 text-sm font-medium rounded-md border border-blue-600 text-blue-700 bg-white opacity-50 cursor-not-allowed flex items-center gap-2 transition-colors duration-200"
                    >
                      <FileText className="h-4 w-4" /> No Resume
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full md:w-auto mt-2 sm:mt-0">
                  <p className="text-sm font-medium text-gray-700 whitespace-nowrap">Update Status:</p>
                  <select 
                    value={app.status} 
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      
      {/* Pagination Footer */}
      {!loading && filteredApplicants.length > 0 && (
        <div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-lg shadow-sm mt-4">
          <div className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredApplicants.length)} to {Math.min(currentPage * itemsPerPage, filteredApplicants.length)} of {filteredApplicants.length} applicants
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
  );
};
