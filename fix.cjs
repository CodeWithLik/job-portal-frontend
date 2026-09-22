const fs = require('fs');
const lines = fs.readFileSync('src/pages/seeker/Profile.jsx', 'utf8').split('\n');

const top = lines.slice(0, 144);
const bottom = lines.slice(344);

const middle = `  const handleCancel = () => {
    setProfile(originalProfile);
    setPhotoFile(null);
    setPhotoPreview(null);
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const handleRemoveResume = async () => {
    setIsDeletingResume(true);
    try {
      await api.delete('/profile/seeker/resume');
      setResumeUrl(null);
      setResumeName(null);
      setResumeAnalysis(null);
      setShowDeleteConfirm(false);
      showNotification('Resume removed successfully!');
    } catch (err) {
      console.error('Failed to remove resume', err);
      showNotification('Failed to remove resume.');
    } finally {
      setIsDeletingResume(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showNotification('Only PDF files are allowed.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post('/ai/parse-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResumeUrl(res.data.resume_url);
      setResumeAnalysis(res.data.analysis);
      setResumeName(res.data.resume_name);
      showNotification('Resume uploaded and analyzed successfully!');
    } catch (err) {
      console.error('Upload error', err);
      showNotification('Resume upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };`;

fs.writeFileSync('src/pages/seeker/Profile.jsx', [...top, middle, ...bottom].join('\n'));
