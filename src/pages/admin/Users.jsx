import { useState, useEffect, useRef } from 'react';
import { formatDate } from '../../utils/date';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Search, Edit2, Trash2, Shield, ShieldOff, Eye, UserPlus, AlertTriangle, Loader2, X, RefreshCw } from 'lucide-react';
import { api, useAuth } from '../../context/AuthContext';

export const AdminUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('http')) return url;
    const baseUrl = api?.defaults?.baseURL ? api.defaults.baseURL.replace('/api', '') : 'https://job-portal-backend-bx41.onrender.com';
    return `${baseUrl}${url}`;
  };
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modals state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteError, setDeleteError] = useState('');
  
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [activateModalOpen, setActivateModalOpen] = useState(false);
  const [userToActivate, setUserToActivate] = useState(null);
  const [suspendError, setSuspendError] = useState('');

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'seeker', status: 'Active', company_name: '' });
  const [newUserErrors, setNewUserErrors] = useState({});
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const modalTopRef = useRef(null);
  
  useEffect(() => {
    if (addUserModalOpen && (duplicateEmailError || Object.keys(newUserErrors).length > 0)) {
      if (modalTopRef.current) {
        modalTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [duplicateEmailError, newUserErrors, addUserModalOpen]);
  const [userToView, setUserToView] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  useEffect(() => {
    if (location.state?.openAddModal) {
      setAddUserModalOpen(true);
      // Clean up the state quietly without triggering a React Router re-render
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/users');
        // map db 'active' to 'Active' for UI
        setUsers(res.data.map(u => ({
          ...u,
          status: u.status.charAt(0).toUpperCase() + u.status.slice(1)
        })));
      } catch (err) {
        console.error('Failed to load users', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [refreshTrigger]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    let matchesStatus = false;
    if (statusFilter === 'all') {
      matchesStatus = true;
    } else if (statusFilter === 'unverified') {
      matchesStatus = user.is_verified === false;
    } else {
      matchesStatus = user.status.toLowerCase() === statusFilter && user.is_verified !== false;
    }
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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


  const confirmDelete = (user) => {
    setUserToDelete(user);
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
    if (userToDelete && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.delete(`/admin/users/${userToDelete.id}`, { data: { reason: deleteReason } });
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setDeleteModalOpen(false);
        setUserToDelete(null);
        showNotification('User account successfully deleted.', 'success');
      } catch (err) {
        console.error('Failed to delete user:', err);
        showNotification(err.response?.data?.error || err.message || 'Failed to delete user', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const confirmSuspend = (user) => {
    if (user.status === 'Suspended') {
      setUserToActivate(user);
      setActivateModalOpen(true);
      return;
    }
    setUserToSuspend(user);
    setSuspendReason('');
    setSuspendError('');
    setSuspendModalOpen(true);
  };

  const executeActivate = async (e) => {
    e.preventDefault();
    if (userToActivate && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.patch(`/admin/users/${userToActivate.id}/status`, { status: 'Active' });
        setUsers(users.map(u => u.id === userToActivate.id ? { ...u, status: 'Active' } : u));
        setActivateModalOpen(false);
        setUserToActivate(null);
        showNotification('User account successfully activated.', 'success');
      } catch (err) {
        console.error('Failed to activate user:', err);
        showNotification(err.response?.data?.error || err.message || 'Failed to activate user', 'error');
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
    if (userToSuspend && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await api.patch(`/admin/users/${userToSuspend.id}/status`, { 
          status: 'Suspended',
          reason: suspendReason 
        });
        setUsers(users.map(u => u.id === userToSuspend.id ? { ...u, status: 'Suspended' } : u));
        setSuspendModalOpen(false);
        setUserToSuspend(null);
        setSuspendReason('');
        showNotification('User account successfully suspended.', 'success');
      } catch (err) {
        console.error('Failed to suspend user:', err);
        showNotification(err.response?.data?.error || err.message || 'Failed to suspend user', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoogleAuth = () => {
    if (newUser.role === 'recruiter' && !newUser.company_name?.trim()) {
      setNewUserErrors({ ...newUserErrors, company_name: 'Company name is required for Google Sign-up.' });
      return;
    }
    
    const baseUrl = `${import.meta.env.VITE_API_URL || 'https://job-portal-backend-bx41.onrender.com/api'}/auth/google`;
    const params = new URLSearchParams();
    params.append('role', newUser.role);
    if (newUser.role === 'recruiter') {
      params.append('company_name', newUser.company_name);
    }
    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!newUser.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (newUser.name.trim().length < 3) {
      errors.name = 'Please enter a valid full name (minimum 3 characters).';
    }
    
    const email = newUser.email.trim();
    if (!email) {
      errors.email = 'Email is required.';
    } else {
      if (/\s/.test(email)) errors.email = 'Email must not contain whitespace.';
      else if ((email.match(/@/g) || []).length !== 1) errors.email = 'Email must contain exactly one @ symbol.';
      else if (/\.\./.test(email)) errors.email = 'Email must not contain consecutive dots.';
      else if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)) errors.email = 'Email must have a valid local part, domain, and top-level domain (at least 2 letters).';
    }

    const pass = newUser.password;
    if (!pass) {
      errors.password = 'Password is required.';
    } else {
      const passErrors = [];
      if (pass.length < 8) passErrors.push('at least 8 characters');
      if (!/[A-Z]/.test(pass)) passErrors.push('one uppercase letter');
      if (!/[a-z]/.test(pass)) passErrors.push('one lowercase letter');
      if (!/[0-9]/.test(pass)) passErrors.push('one number');
      if (!/[-@$!%*?&#^()_+=]/.test(pass)) passErrors.push('one special character');
      if (passErrors.length > 0) {
        errors.password = 'Password must include: ' + passErrors.join(', ') + '.';
      }
    }

    if (newUser.role === 'recruiter' && !newUser.company_name?.trim()) errors.company_name = 'Company name is required.';
    
    if (Object.keys(errors).length > 0) {
      setNewUserErrors(errors);
      return;
    }

    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const payload = {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role
      };
      if (newUser.role === 'recruiter') {
        payload.company_name = newUser.company_name;
      }
      
      const res = await api.post('/admin/users', payload);
      
      const createdUser = {
        ...res.data,
        status: res.data.status.charAt(0).toUpperCase() + res.data.status.slice(1),
        applications_count: 0,
        jobs_count: 0
      };
      
      setUsers([createdUser, ...users]);
      setAddUserModalOpen(false);
      setNewUser({ name: '', email: '', password: '', role: 'seeker', status: 'Active', company_name: '' });
      setNewUserErrors({});
      setDuplicateEmailError(false);
      showNotification('New user successfully created.', 'success');
    } catch (err) {
      if (err.response?.status === 409 || err.response?.data?.error === 'User already exists') {
        setDuplicateEmailError(true);
      } else {
        console.error('Failed to create user', err);
        showNotification(err.response?.data?.error || err.message || 'Failed to create user', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (e, newPage) => {
    e.preventDefault();
    if (newPage === currentPage) return;
    
    // Only apply the scroll anchoring fix when navigating backwards (to page 1) 
    // because the table grows and pushes the footer down, which visually feels like scrolling up.
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
      // For "Next" or navigating forwards (where the page shrinks), let the browser handle it naturally.
      setCurrentPage(newPage);
    }
  };

  const showNotification = (msg, type = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: '', type: 'success' }), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      {notification.message && (
        <div className={`fixed top-6 right-6 z-50 shadow-lg backdrop-blur-md px-4 py-3 rounded-md border flex items-center justify-between gap-4 min-w-[300px] animate-in fade-in slide-in-from-top-4 duration-300 ${
          notification.type === 'error' 
            ? 'bg-red-50/95 text-red-800 border-red-200' 
            : 'bg-green-50/95 text-green-800 border-green-200'
        }`}>
          <span className="font-medium text-sm">{notification.message}</span>
          <button 
            onClick={() => setNotification({ message: '', type: 'success' })}
            className={`p-1 rounded-md transition-colors ${
              notification.type === 'error' 
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
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-4 bg-gray-50/50">
          <div className="w-full md:w-96 flex items-center relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
            <select 
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-10"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="seeker">Job Seekers</option>
              <option value="recruiter">Recruiters</option>
              <option value="admin">Admins</option>
            </select>
            <select 
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-10"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="unverified">Unverified</option>
            </select>
            <button 
              type="button"
              onClick={() => setRefreshTrigger(prev => prev + 1)}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50 flex-shrink-0 rounded-md transition-colors"
              title="Refresh Users"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Button onClick={() => setAddUserModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 h-10">
              <UserPlus className="h-4 w-4" /> Add User
            </Button>
          </div>
        </div>
        
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Activity</th>
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
) : paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">No users found.</td>
                  </tr>
                ) : paginatedUsers.map(user => {
                  const isAdmin = user.role === 'admin';
                  const isSelf = user.id === currentUser?.id;
                  const isProtected = isAdmin || isSelf;

                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500 text-xs">{user.email}</div>
                      </td>
                      <td className="p-4 capitalize">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isAdmin ? 'bg-purple-100 text-purple-700' :
                          user.role === 'recruiter' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                        <td className="p-4">
                          {user.status === 'Suspended' ? (
                            <Badge variant="error">Suspended</Badge>
                          ) : !user.is_verified ? (
                            <Badge variant="warning">Unverified</Badge>
                          ) : (
                            <Badge variant={user.status === 'Active' ? 'success' : 'error'}>
                              {user.status}
                            </Badge>
                          )}
                        </td>
                      <td className="p-4 text-gray-500">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="p-4 text-gray-500 text-xs">
                        {user.role === 'seeker' && `${user.applications_count || 0} applications`}
                        {user.role === 'recruiter' && `${user.jobs_count || 0} jobs posted`}
                        {isAdmin && 'Platform Mgmt'}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setUserToView(user);
                              setDetailsModalOpen(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50" 
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isProtected) confirmSuspend(user);
                            }}
                            disabled={isProtected}
                            className={`p-1.5 rounded-md transition-colors ${
                              isProtected ? 'opacity-50 cursor-not-allowed text-gray-300' :
                              user.status === 'Active' 
                                ? 'text-gray-400 hover:text-orange-600 hover:bg-orange-50' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                            title={isProtected ? 'Admin accounts cannot be suspended or deleted' : (user.status === 'Active' ? 'Suspend User' : 'Activate User')}
                          >
                            {user.status === 'Active' ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isProtected) confirmDelete(user);
                            }}
                            disabled={isProtected}
                            className={`p-1.5 rounded-md transition-colors ${
                              isProtected ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                            title={isProtected ? 'Admin accounts cannot be suspended or deleted' : 'Delete User'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        {/* Pagination Footer */}
        {!loading && filteredUsers.length > 0 && (
          <div id="pagination-footer" className="border-t border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-b-lg">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredUsers.length)} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
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
                disabled={currentPage === totalPages}
                onClick={(e) => handlePageChange(e, Math.min(totalPages, currentPage + 1))}
                className="px-3"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete User">
          <form onSubmit={executeDelete} className="space-y-4" noValidate>
            <div>
              <p className="text-gray-700 text-base">
                Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone and will permanently remove all associated account data and records.
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
                placeholder="e.g., Terms violation, fraudulent activity, user request..."
                disabled={isSubmitting}
              ></textarea>
              {deleteError && <p className="text-red-500 text-sm mt-1">{deleteError}</p>}
              <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the deletion notification email sent to the user.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setDeleteModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Deleting...' : 'Delete User'}
              </Button>
            </div>
          </form>
        </Modal>
        
        {/* View Details Modal Mock */}
        <Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} title="User Details">
            {userToView && (
              <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-200 shrink-0">
                    {userToView.seeker_photo || userToView.recruiter_logo ? (
                      <img 
                        src={getImageUrl(userToView.seeker_photo || userToView.recruiter_logo)} 
                        alt={userToView.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      (userToView.company_name || userToView.name || 'U').charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{userToView.company_name || userToView.name}</h3>
                    <p className="text-gray-500">{userToView.email}</p>
                    {userToView.company_name && <p className="text-sm text-gray-400">Account: {userToView.name}</p>}
                  </div>
                </div>
                {userToView.status === 'Suspended' ? <Badge variant="error">Suspended</Badge> : !userToView.is_verified ? <Badge variant="warning">Unverified</Badge> : <Badge variant={userToView.status === 'Active' ? 'success' : 'error'}>{userToView.status}</Badge>}
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</span>
                  <span className="capitalize font-medium text-gray-900">{userToView.role}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Joined Date</span>
                  <span className="font-medium text-gray-900">{formatDate(userToView.created_at)}</span>
                </div>

                {userToView.role === 'recruiter' && (
                  <>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Industry</span>
                      <span className="font-medium text-gray-900">{userToView.industry || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Website</span>
                      {userToView.website ? (
                        <a href={userToView.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">{userToView.website.replace(/^https?:\/\//, '')}</a>
                      ) : (
                        <span className="font-medium text-gray-900">Not specified</span>
                      )}
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Activity</span>
                      <span className="font-medium text-gray-900">{userToView.jobs_count || 0} Jobs Posted</span>
                    </div>
                  </>
                )}

                {userToView.role === 'seeker' && (
                  <>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</span>
                      <span className="font-medium text-gray-900">{userToView.seeker_location || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</span>
                      <span className="font-medium text-gray-900">{userToView.seeker_phone || 'Not specified'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Activity</span>
                      <div className="flex gap-4">
                        <span className="font-medium text-gray-900">{userToView.applications_count || 0} Applications</span>
                        {userToView.seeker_resume_url && (
                          <a href={getImageUrl(userToView.seeker_resume_url)} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center">
                            <Eye className="h-3 w-3 mr-1" /> View Resume
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-3">
                  {userToView.role !== 'admin' && (
                    <>
                      {userToView.status === 'Active' ? (
                        <Button 
                          variant="ghost" 
                          onClick={() => { setDetailsModalOpen(false); confirmSuspend(userToView); }}
                          className="text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                        >
                          Suspend Account
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          onClick={() => { setDetailsModalOpen(false); confirmSuspend(userToView); }}
                          className="text-green-600 hover:bg-green-50 hover:text-green-700"
                        >
                          Reactivate Account
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        onClick={() => { setDetailsModalOpen(false); confirmDelete(userToView); }} 
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Delete User
                      </Button>
                    </>
                  )}
                </div>
                <div>
                  <Button variant="secondary" onClick={() => setDetailsModalOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </Modal>

        
        {/* Reactivate User Modal */}
        <Modal isOpen={activateModalOpen} onClose={() => setActivateModalOpen(false)} title="Reactivate Account">
          <form onSubmit={executeActivate} className="space-y-4">
            <p className="text-gray-700 text-base">
              Are you sure you want to restore access for <strong>{userToActivate?.name}</strong>?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setActivateModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Reactivating...' : 'Reactivate'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Suspend User Modal */}
        <Modal isOpen={suspendModalOpen} onClose={() => setSuspendModalOpen(false)} title="Suspend User">
          <form onSubmit={executeSuspend} className="space-y-4" noValidate>
            <div>
              <p className="text-gray-700 text-base">Are you sure you want to suspend <strong>{userToSuspend?.name}</strong>?</p>
              <p className="text-sm text-gray-500 mt-1">This will revoke active sessions and prevent the user from signing in until unsuspended.</p>
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
                placeholder="Violation of terms, abusive behavior, etc."
                disabled={isSubmitting}
              ></textarea>
              {suspendError && <p className="text-red-500 text-sm mt-1">{suspendError}</p>}
              <p className="text-xs text-slate-500 font-medium mt-2">This reason will be included in the automated notification email sent to the user.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setSuspendModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Suspending...' : 'Suspend User'}
              </Button>
            </div>
          </form>
        </Modal>

      {/* Add User Modal */}
      <Modal isOpen={addUserModalOpen} onClose={() => setAddUserModalOpen(false)} title="Add New User">
        {duplicateEmailError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm mb-4 flex items-start justify-between">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">
                  A user with this email address already exists.
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setDuplicateEmailError(false)} className="text-rose-400 hover:text-rose-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleAddUser} className="space-y-3" noValidate>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {['seeker', 'recruiter', 'admin'].map(r => (
                <button
                  key={r}
                  type="button"
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${newUser.role === r ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => {
                    setNewUser({ ...newUser, role: r });
                    if (duplicateEmailError) setDuplicateEmailError(false);
                  }}
                >
                  {r === 'seeker' ? 'Job Seeker' : r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <Input 
            label="Full Name"
            type="text" 
            placeholder="John Doe"
            value={newUser.name}
            onChange={(e) => {
              setNewUser({...newUser, name: e.target.value});
              if (newUserErrors.name) setNewUserErrors({...newUserErrors, name: ''});
            }}
            error={newUserErrors.name}
          />
          <Input 
            label="Email Address"
            type="email" 
            placeholder="john@example.com"
            value={newUser.email}
            onChange={(e) => {
              setNewUser({...newUser, email: e.target.value});
              if (newUserErrors.email) setNewUserErrors({...newUserErrors, email: ''});
              if (duplicateEmailError) setDuplicateEmailError(false);
            }}
            error={newUserErrors.email}
          />
          <Input 
            label="Password"
            type="password" 
            placeholder="••••••••"
            value={newUser.password}
            onChange={(e) => {
              setNewUser({...newUser, password: e.target.value});
              if (newUserErrors.password) setNewUserErrors({...newUserErrors, password: ''});
            }}
            error={newUserErrors.password}
          />
          
          {newUser.role === 'recruiter' && (
            <Input 
              label="Company Name"
              type="text" 
              placeholder="Acme Corp"
              value={newUser.company_name}
              onChange={(e) => {
                setNewUser({...newUser, company_name: e.target.value});
                if (newUserErrors.company_name) setNewUserErrors({...newUserErrors, company_name: ''});
              }}
              error={newUserErrors.company_name}
            />
          )}

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            <div className="flex justify-end gap-3">
              <Button variant="ghost" type="button" onClick={() => setAddUserModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create User'}
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full flex justify-center items-center gap-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              onClick={handleGoogleAuth}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
