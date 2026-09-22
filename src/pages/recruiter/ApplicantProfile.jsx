import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge, AppStatusBadge } from '../../components/common/Badge';
import { ArrowLeft, User, FileText, CheckCircle, Briefcase, Mail, Phone, MapPin, Globe, Github, Linkedin, Brain, Download } from 'lucide-react';
import { api } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ApplicantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/recruiter/applications/${id}/profile`);
        setData(res.data);
      } catch (err) {
        console.error('Failed to load profile', err);
        setError('Failed to load candidate profile. You may not have permission to view this application.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center gap-6 mb-6">
          <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          </div>
        </div>
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => navigate('/recruiter/applicants')}>Back to Applicants</Button>
      </div>
    );
  }

  const { application, profile } = data;
  const skillsList = profile.skills ? profile.skills.split(',').map(s => s.trim()).filter(s => s) : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header / Navigation */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5 focus:outline-none font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Candidate Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Profile Photo & Headline Info */}
        <Card className="md:col-span-4 flex flex-col items-center p-6 text-center">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
            {profile.profile_photo ? (
              <img src={profile.profile_photo.startsWith('http') ? profile.profile_photo : `https://job-portal-backend-bx41.onrender.com${profile.profile_photo}`} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <User className="h-16 w-16 text-gray-400" />
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
          {profile.headline && <p className="text-sm font-medium text-blue-600 mt-1">{profile.headline}</p>}
          {profile.location && <p className="text-sm text-gray-500 mt-1">{profile.location}</p>}
          
          <div className="w-full mt-6 space-y-4 text-left border-t border-gray-100 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
            
            {profile.email && (
              <div className="flex flex-col text-sm text-gray-600">
                <span className="text-xs font-semibold text-gray-500 mb-1">Email:</span>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400 shrink-0" /> 
                  <a href={`mailto:${profile.email}`} className="hover:text-blue-600 hover:underline truncate" title={profile.email}>{profile.email}</a>
                </div>
              </div>
            )}
            
            {profile.phone && (
              <div className="flex flex-col text-sm text-gray-600">
                <span className="text-xs font-semibold text-gray-500 mb-1">Phone:</span>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400 shrink-0" /> 
                  <a href={`tel:${profile.phone.replace(/[\s-]/g, '')}`} className="hover:text-blue-600 hover:underline truncate" title={profile.phone}>
                    {profile.phone}
                  </a>
                </div>
              </div>
            )}

            {profile.portfolio_url && (
              <div className="flex flex-col text-sm text-gray-600">
                <span className="text-xs font-semibold text-gray-500 mb-1">Portfolio:</span>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-400 shrink-0" /> 
                  <a href={profile.portfolio_url} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline truncate" title={profile.portfolio_url}>
                    {profile.portfolio_url.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            )}

            {profile.github_url && (
              <div className="flex flex-col text-sm text-gray-600">
                <span className="text-xs font-semibold text-gray-500 mb-1">GitHub:</span>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-gray-400 shrink-0" /> 
                  <a href={profile.github_url} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline truncate" title={profile.github_url}>
                    {profile.github_url.replace(/^https?:\/\//, '').replace(/^github\.com\//, '')}
                  </a>
                </div>
              </div>
            )}

            {profile.linkedin_url && (
              <div className="flex flex-col text-sm text-gray-600">
                <span className="text-xs font-semibold text-gray-500 mb-1">LinkedIn:</span>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-gray-400 shrink-0" /> 
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline truncate" title={profile.linkedin_url}>
                    {profile.linkedin_url.replace(/^https?:\/\//, '').replace(/^www\.linkedin\.com\/in\//, '')}
                  </a>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Application Context & Summary */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Application Status */}
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50/50 border-b border-blue-100/50 py-3">
              <h2 className="text-sm font-bold flex items-center gap-2 text-blue-900 uppercase tracking-wider">
                <Briefcase className="h-4 w-4" /> Application Details
              </h2>
            </CardHeader>
            <CardBody className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Applied For</p>
                <p className="font-semibold text-gray-900">{application.job_title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <AppStatusBadge status={application.status} />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Resume</p>
                {profile.resume_url ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-900">{profile.resume_name || 'Profile Resume.pdf'}</span>
                    <div className="inline-flex shadow-sm" role="group">
                      <a 
                        href={profile.resume_url.startsWith('http') ? profile.resume_url : `https://job-portal-backend-bx41.onrender.com${profile.resume_url}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-600 rounded-l-md hover:bg-blue-50 focus:z-10 focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors duration-200"
                      >
                        <FileText className="h-4 w-4" /> View Resume
                      </a>
                      <a 
                        href={profile.resume_url.startsWith('http') ? profile.resume_url : `https://job-portal-backend-bx41.onrender.com${profile.resume_url}`} 
                        download={profile.name ? `${profile.name.replace(/\s+/g, '_')}_Profile_Resume.pdf` : 'Profile_Resume.pdf'}
                        className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-l-0 border-blue-600 rounded-r-md hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition-colors duration-200"
                        title="Download Resume"
                        onClick={(e) => {
                          // Prevent default cross-origin open behavior and force download
                          e.preventDefault();
                          const url = profile.resume_url.startsWith('http') ? profile.resume_url : `https://job-portal-backend-bx41.onrender.com${profile.resume_url}`;
                          fetch(url)
                            .then(response => response.blob())
                            .then(blob => {
                              const blobUrl = window.URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = blobUrl;
                              link.download = profile.name ? `${profile.name.replace(/\s+/g, '_')}_Profile_Resume.pdf` : 'Profile_Resume.pdf';
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
                  </div>
                ) : (
                  <span className="text-sm text-gray-400 italic">Not Provided</span>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Professional Summary</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 text-sm mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.length > 0 ? skillsList.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 bg-gray-100 text-gray-700">
                      {skill}
                    </Badge>
                  )) : (
                    <p className="text-gray-400 text-sm italic">No skills listed</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 text-sm mb-2">Bio</h3>
                {profile.bio ? (
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm italic">No bio provided</p>
                )}
              </div>
              
              {application.cover_letter && (
                <div>
                  <h3 className="font-medium text-gray-700 text-sm mb-2">Cover Letter</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed bg-blue-50/30 p-4 rounded-lg border border-blue-100/50 italic">
                    {application.cover_letter}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

        </div>
      </div>
    </div>
  );
};


