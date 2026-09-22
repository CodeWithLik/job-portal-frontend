import { Link, useLocation } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Card, CardBody, CardFooter } from '../common/Card';
import { Badge } from '../common/Badge';

export const JobCard = ({ job, isSeeker = false }) => {
  const location = useLocation();
  const basePath = location.pathname.startsWith('/seeker') 
    ? '/seeker/jobs' 
    : location.pathname.startsWith('/recruiter') 
      ? '/recruiter/jobs-search' 
      : '/jobs';
      
  const jobLink = `${basePath}/${job.id}`;

  const formatSalary = (min, max, fallback) => {
    if (min == null && max == null) return fallback || 'Not specified';
    if (min === max) return `$${min.toLocaleString()}`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  let expirationBadge = null;
  
  if (job.status === 'Closed') {
    expirationBadge = <Badge variant="gray">Closed</Badge>;
  } else if (job.expires_at) {
    const daysLeft = Math.ceil((new Date(job.expires_at) - new Date()) / (1000 * 60 * 60 * 24));
    const isExpired = job.status === 'Expired' || daysLeft < 0;

    if (isExpired) {
      expirationBadge = <Badge variant="danger">Expired</Badge>;
    } else if (daysLeft === 0) {
      expirationBadge = <Badge variant="warning">Expires today</Badge>;
    } else if (daysLeft === 1) {
      expirationBadge = <Badge variant="warning">1 day left</Badge>;
    } else {
      expirationBadge = <Badge variant="primary">{daysLeft} days left</Badge>;
    }
  } else if (job.status === 'Expired') {
    expirationBadge = <Badge variant="danger">Expired</Badge>;
  } else {
    expirationBadge = <span className="text-sm text-gray-500">Actively hiring</span>;
  }

  return (
    <Card className="hover:border-blue-300 transition-colors">
      <CardBody>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              <Link to={jobLink} className="hover:text-blue-600">{job.title}</Link>
            </h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
          </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</div>
          <div className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.employment_type || job.type}</div>
          <div className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {formatSalary(job.salary_min, job.salary_max, job.salary)}</div>
          <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {formatDate(job.created_at || job.postedAt)}</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {job.requirements?.slice(0,3).map(req => (
            <Badge key={req} variant="gray">{req}</Badge>
          ))}
          {job.requirements?.length > 3 && <Badge variant="gray">+{job.requirements.length - 3}</Badge>}
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center bg-gray-50/50">
        {expirationBadge}
        <Link to={jobLink} className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View Details &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
};

