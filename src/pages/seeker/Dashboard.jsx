import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/date';
import { Card, CardBody } from '../../components/common/Card';
import { AppStatusBadge } from '../../components/common/Badge';
import { JobCard } from '../../components/jobs/JobCard';
import { FileText, CheckCircle, Clock, Loader2, MapPin, Briefcase, DollarSign, Calendar, Award } from 'lucide-react';
import { api, useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const SeekerDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appsRes, jobsRes] = await Promise.all([
          api.get('/seeker/applications'),
          api.get('/jobs')
        ]);
        setApplications(appsRes.data);
      } catch (err) {
        console.error('Failed to load seeker dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  

  const inReviewCount = applications.filter(a => ['Shortlisted'].includes(a.status)).length;
  const interviewCount = applications.filter(a => ['Interview'].includes(a.status)).length;
  const hiredCount = applications.filter(a => ['Hired'].includes(a.status)).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name.split(' ')[0]}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-gray-100 p-3 rounded-lg text-gray-800 group-hover:bg-blue-600 group-hover:text-white transition-colors"><FileText className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Applied Jobs</p>
              <p className="text-2xl font-bold">{applications.length}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800 group-hover:bg-yellow-600 group-hover:text-white transition-colors"><Clock className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">In Review</p>
              <p className="text-2xl font-bold">{inReviewCount}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><CheckCircle className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Interviews</p>
              <p className="text-2xl font-bold">{interviewCount}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CardBody className="flex items-center gap-4 p-6">
            <div className="bg-green-100 p-3 rounded-lg text-green-800 group-hover:bg-green-600 group-hover:text-white transition-colors"><Award className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Hired</p>
              <p className="text-2xl font-bold">{hiredCount}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {applications.slice(0, 6).map(app => (
              <Card key={app.id} className="p-0 overflow-hidden flex flex-col h-full border hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardBody className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="pr-2">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2" title={app.job_title}>{app.job_title}</h3>
                      <p className="text-sm font-medium text-blue-600 line-clamp-1">{app.job_company || app.company || 'Unknown Company'}</p>
                    </div>
                    <div className="shrink-0 ml-3">
                      <AppStatusBadge status={app.status} />
                    </div>
                  </div>

                  <div className="space-y-2 mt-auto mb-4">
                    {app.job_location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 shrink-0 text-gray-400" />
                        <span className="truncate">{app.job_location}</span>
                      </div>
                    )}
                    {app.job_type && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Briefcase className="h-4 w-4 mr-2 shrink-0 text-gray-400" />
                        <span className="truncate">{app.job_type}</span>
                      </div>
                    )}
                    {(app.job_salary_min || app.job_salary_max) && (
                      <div className="flex items-center text-sm text-gray-500">
                        <DollarSign className="h-4 w-4 mr-2 shrink-0 text-gray-400" />
                        <span className="truncate">
                          ${(app.job_salary_min || 0).toLocaleString()} - ${(app.job_salary_max || 0).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-auto flex items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="h-4 w-4" />
                      Applied: {formatDate(app.applied_at)}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
            {!loading && applications.length === 0 && (
              <div className="col-span-full py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-sm text-gray-500">You haven't applied to any jobs yet.</p>
                <Link to="/seeker/jobs" className="mt-3 inline-block text-sm text-blue-600 font-medium hover:underline">Browse open positions</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


