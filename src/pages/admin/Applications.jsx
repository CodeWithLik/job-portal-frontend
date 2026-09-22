import { useState, useEffect, useMemo } from 'react';
import { formatDate } from '../../utils/date';
import { Card } from '../../components/common/Card';
import { Badge, AppStatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Search, Eye, Loader2 } from 'lucide-react';
import { api } from '../../context/AuthContext';

export const AdminApplications = () => {
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}${url}`;
  };
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, jobFilter, companyFilter, statusFilter, sortOption]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get('/admin/applications');
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to load applications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  // Compute unique jobs and companies
  const { uniqueJobs, uniqueCompanies } = useMemo(() => {
    const jobs = new Set();
    const companies = new Set();
    applications.forEach(app => {
      if (app.job_title) jobs.add(app.job_title);
      if (app.company_name) companies.add(app.company_name);
    });
    return {
      uniqueJobs: Array.from(jobs).sort(),
      uniqueCompanies: Array.from(companies).sort()
    };
  }, [applications]);

  const filteredApps = useMemo(() => {
    let result = applications.filter(app => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (app.seeker_name || '').toLowerCase().includes(searchLower) || 
        (app.seeker_email || '').toLowerCase().includes(searchLower) ||
        (app.job_title || '').toLowerCase().includes(searchLower) ||
        (app.company_name || '').toLowerCase().includes(searchLower);
      
      const matchesJob = jobFilter === 'all' || app.job_title === jobFilter;
      const matchesCompany = companyFilter === 'all' || app.company_name === companyFilter;
      const matchesStatus = statusFilter === 'all' || (app.status || '').toLowerCase() === statusFilter;
      
      return matchesSearch && matchesJob && matchesCompany && matchesStatus;
    });

    if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.applied_at || 0) - new Date(a.applied_at || 0));
    } else if (sortOption === 'oldest') {
      result.sort((a, b) => new Date(a.applied_at || 0) - new Date(b.applied_at || 0));
    }

    return result;
  }, [applications, searchTerm, jobFilter, companyFilter, statusFilter, sortOption]);

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Application Management</h1>
        </div>
      </div>

      <Card>
        <div className="p-5 border-b border-gray-200 bg-gray-50/50 flex flex-col lg:flex-row gap-4 items-center">
          <div className="w-full lg:flex-1 relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
          >
            <option value="all">All Jobs</option>
            {uniqueJobs.map(job => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>

          <select 
            className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="all">All Companies</option>
            {uniqueCompanies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
          
          <select 
            className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>

          <select 
            className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest Applied</option>
            <option value="oldest">Oldest Applied</option>
          </select>
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
) : filteredApps.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                  <th className="p-4 font-medium">Candidate</th>
                  <th className="p-4 font-medium">Job Title & Company</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Applied Date</th>
                  <th className="p-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm bg-white">
                {paginatedApps.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50 group">
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{app.seeker_name}</div>
                      <div className="text-xs text-gray-500">{app.seeker_email}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{app.job_title}</div>
                      <div className="text-xs text-gray-500">{app.company_name}</div>
                    </td>
                    
                    <td className="p-4 whitespace-nowrap">
                      <AppStatusBadge status={app.status} />
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-500">
                      {formatDate(app.applied_at)}
                    </td>
                    <td className="p-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => { setSelectedApp(app); setViewModalOpen(true); }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors" 
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-b-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-500">Try changing your search or filters.</p>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && filteredApps.length > 0 && (
          <div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredApps.length)} to {Math.min(currentPage * itemsPerPage, filteredApps.length)} of {filteredApps.length} applications
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

      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Application Details">
        {selectedApp && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-200 shrink-0">
                  {selectedApp.seeker_photo ? (
                    <img 
                      src={getImageUrl(selectedApp.seeker_photo)} 
                      alt={selectedApp.seeker_name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    (selectedApp.seeker_name || 'U').charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedApp.seeker_name}</h3>
                  <p className="text-gray-500">{selectedApp.seeker_email}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <AppStatusBadge status={selectedApp.status} />
                <p className="text-xs text-gray-500 mt-2 whitespace-nowrap">Applied on: <span className="font-semibold text-gray-700">{formatDate(selectedApp.applied_at)}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 bg-gray-50 py-5 px-4 rounded-xl border border-gray-100 mt-2">
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Applied For</span>
                <span className="font-medium text-gray-900 block truncate" title={selectedApp.job_title}>{selectedApp.job_title}</span>
                <span className="text-sm text-gray-500 block mt-0.5">{selectedApp.company_name}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Application Assets</span>
                <div className="flex gap-4 mt-0.5">
                  {selectedApp.resume_url ? (
                    <a href={getImageUrl(selectedApp.resume_url)} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                      <Eye className="h-3 w-3 mr-1" /> View Resume
                    </a>
                  ) : (
                    <span className="font-medium text-gray-400">No resume attached</span>
                  )}
                </div>
              </div>
            </div>
            
            {selectedApp.cover_letter && (
              <div>
                <span className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</span>
                <div className="bg-white border border-gray-100 p-4 rounded-md text-sm text-gray-700 whitespace-pre-line max-h-48 overflow-y-auto shadow-inner">
                  {selectedApp.cover_letter}
                </div>
              </div>
            )}
            
            <div className="pt-4 shrink-0 border-t border-slate-100 flex items-center justify-end">
              <Button variant="secondary" onClick={() => setViewModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};


