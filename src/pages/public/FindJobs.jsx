import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { JobCard } from '../../components/jobs/JobCard';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Search, Loader2 } from 'lucide-react';
import { api, useAuth } from '../../context/AuthContext';

export const FindJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user?.role === 'seeker' && location.pathname === '/jobs') {
      navigate('/seeker/jobs', { replace: true });
    }
  }, [user, location, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedJobTypes, minSalary, maxSalary]);

  const handleJobTypeChange = (type) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredJobs = jobs.filter(job => {
    if (job.status === 'Closed') return false;
    
    let isExpired = job.status === 'Expired';
    if (job.expires_at) {
      const daysLeft = Math.ceil((new Date(job.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
      isExpired = isExpired || daysLeft < 0;
    }
    
    if (isExpired) return false;

    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.employment_type);
    
    let matchesSalary = true;
    const filterMin = minSalary ? Number(minSalary) : null;
    const filterMax = maxSalary ? Number(maxSalary) : null;
    
    if (filterMin !== null || filterMax !== null) {
      if (job.salary_min == null && job.salary_max == null) {
        matchesSalary = false;
      } else {
        const jMin = job.salary_min != null ? Number(job.salary_min) : 0;
        const jMax = job.salary_max != null ? Number(job.salary_max) : Infinity;
        
        if (filterMin !== null && jMax < filterMin) matchesSalary = false;
        if (filterMax !== null && jMin > filterMax) matchesSalary = false;
      }
    }

    return matchesSearch && matchesType && matchesSalary;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Next Opportunity</h1>
        <div className="max-w-2xl mx-auto flex gap-2">
          <div className="flex-grow">
            <Input 
              id="search"
              placeholder="Search by job title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="h-[42px] px-6"><Search className="h-5 w-5" /></Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <div className="space-y-2">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                    <label key={type} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2" 
                        checked={selectedJobTypes.includes(type)}
                        onChange={() => handleJobTypeChange(type)}
                      /> 
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Salary Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Min Salary</label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      wrapperClassName="m-0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Max Salary</label>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(e.target.value)}
                      wrapperClassName="m-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              {paginatedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
              
              {/* Pagination Footer */}
              <div id="pagination-footer" className="border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-lg shadow-sm mt-4">
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
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
