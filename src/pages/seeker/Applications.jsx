import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/date';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardBody } from '../../components/common/Card';
import { Badge, AppStatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { FileText, Calendar, Loader2, Search } from 'lucide-react';
import { api } from '../../context/AuthContext';

export const Applications = () => {
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter and pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get('/seeker/applications');
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to fetch applications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, sortBy]);

  const getJobLink = (id) => `/seeker/jobs/${id}`;

  

  const filteredApplications = applications.filter(app => {
    const matchesSearch = (app.job_title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (app.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || (app.status || '').toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.applied_at) - new Date(b.applied_at);
    }
    return new Date(b.applied_at) - new Date(a.applied_at);
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  

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
const paginatedApplications = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
      </div>

      <div className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="relative flex-grow w-full md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications by job..."
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
) : filteredApplications.length > 0 ? (
        <>
          <div className="space-y-4">
            {paginatedApplications.map(app => (
              <Card key={app.id} className="hover:border-blue-200 transition-colors">
                <CardBody className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        {app.job_title}
                      </h2>
                      {(() => {
                        const isDeleted = app.job_is_deleted || app.job_status === 'Deleted' || app.job_status === 'deleted';
                        const appStatusLower = (app.status || '').toLowerCase();
                        
                        if (isDeleted && appStatusLower !== 'hired' && appStatusLower !== 'rejected') {
                          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/60">Position Cancelled</span>;
                        }
                        return <AppStatusBadge status={app.status} />;
                      })()}
                    </div>
                    <p className="text-gray-600 font-medium mb-3">{app.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex flex-wrap items-center gap-1">
                        <Calendar className="h-4 w-4" /> Applied on: {formatDate(app.applied_at)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link to={getJobLink(app.job_id)}>
                      <Button variant="outline">View Job</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          
          {/* Pagination Footer */}
          <div id="pagination-footer" className="border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-lg shadow-sm mt-4">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredApplications.length)} to {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length} applications
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
        </>
      ) : (
        <Card>
          <CardBody className="p-8 text-center text-gray-500 flex flex-col items-center">
            <FileText className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-1">No Applications Found</p>
            <p className="mb-4">No applications match your current filters.</p>
            {applications.length === 0 && (
              <Link to="/seeker/jobs">
                <Button>Browse Jobs</Button>
              </Link>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};
