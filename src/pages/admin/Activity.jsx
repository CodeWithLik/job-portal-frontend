import { useState, useEffect, useMemo } from 'react';
import { formatDateTime } from '../../utils/date';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Search, Loader2 } from 'lucide-react';
import { api } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';

export const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Actions');
  const [dateFilter, setDateFilter] = useState('All Time');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await api.get('/admin/activity');
        setActivities(res.data);
      } catch (err) {
        console.error('Failed to load activity log:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, dateFilter]);

  const filteredActivities = useMemo(() => {
    let result = activities.filter(act => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (act.user_name || '').toLowerCase().includes(searchLower) || 
        (act.user_email || '').toLowerCase().includes(searchLower) ||
        (act.action || '').toLowerCase().includes(searchLower);
      
      const matchesType = typeFilter === 'All Actions' || act.type === typeFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'All Time') {
        const actDate = new Date(act.timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - actDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (dateFilter === 'Today') {
          matchesDate = diffDays <= 1;
        } else if (dateFilter === 'Last 7 Days') {
          matchesDate = diffDays <= 7;
        } else if (dateFilter === 'Last 30 Days') {
          matchesDate = diffDays <= 30;
        }
      }
      
      return matchesSearch && matchesType && matchesDate;
    });
    
    return result;
  }, [activities, searchTerm, typeFilter, dateFilter]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">System Activity</h1>
        </div>
      </div>

      <Card>
        <div className="p-5 border-b border-gray-200 bg-gray-50/50 flex flex-wrap gap-4 items-center">
          <div className="flex-grow min-w-[200px] relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All Actions">All Actions</option>
            <option value="User Signups">User Signups</option>
            <option value="User Status Changes">User Status Changes</option>
            <option value="User Deletions">User Deletions</option>
            <option value="Job Posts">Job Posts</option>
            <option value="Job Status Changes">Job Status Changes</option>
            <option value="Job Deletions">Job Deletions</option>
            <option value="Applications & Status Updates">Applications & Status Updates</option>
            <option value="Resume Analyses">Resume Analyses</option>
            <option value="Profile Updates">Profile Updates</option>
          </select>

          <select 
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="All Time">All Time</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
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
) : filteredActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                  <th className="p-4 font-medium text-left">User</th>
                  <th className="p-4 font-medium text-left">Action</th>
                  <th className="p-4 font-medium text-left">Category</th>
                  <th className="p-4 font-medium text-left">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm bg-white">
                {paginatedActivities.map((act, i) => (
                  <tr key={i} className="hover:bg-gray-50 group">
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{act.user_name}</div>
                      <div className="text-xs text-gray-500">{act.user_email}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-700">
                      {act.action}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <Badge variant={
                        act.module === 'Users' ? 'primary' : 
                        act.module === 'Jobs' ? 'success' : 
                        act.module === 'Resume Analyses' ? 'slate' :
                        act.module === 'Profile Updates' ? 'pink' :
                        'warning'
                      }>
                        {act.module}
                      </Badge>
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-500">
                      {formatDateTime(act.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-b-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No activity found</h3>
            <p className="text-gray-500">Try changing your search or filters.</p>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && filteredActivities.length > 0 && (
          <div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredActivities.length)} to {Math.min(currentPage * itemsPerPage, filteredActivities.length)} of {filteredActivities.length} activities
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
    </div>
  );
};
