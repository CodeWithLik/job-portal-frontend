const fs = require('fs');
const path = require('path');

const applyReplacements = () => {
  const files = [
    {
      path: 'src/components/jobs/JobCard.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{job.created_at ? new Date(job.created_at).toLocaleDateString() : job.postedAt}", new: "{formatDate(job.created_at || job.postedAt)}" }
      ]
    },
    {
      path: 'src/pages/admin/Applications.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A'}", new: "{formatDate(app.applied_at)}" },
        { old: "{selectedApp.applied_at ? new Date(selectedApp.applied_at).toLocaleDateString() : 'N/A'}", new: "{formatDate(selectedApp.applied_at)}" }
      ]
    },
    {
      path: 'src/pages/admin/Jobs.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{new Date(job.created_at).toLocaleDateString()}", new: "{formatDate(job.created_at)}" },
        { old: "{jobToView.created_at ? new Date(jobToView.created_at).toLocaleDateString() : 'N/A'}", new: "{formatDate(jobToView.created_at)}" }
      ]
    },
    {
      path: 'src/pages/admin/Users.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{new Date(user.created_at).toLocaleDateString()}", new: "{formatDate(user.created_at)}" },
        { old: "{new Date(userToView.created_at).toLocaleDateString()}", new: "{formatDate(userToView.created_at)}" }
      ]
    },
    {
      path: 'src/pages/public/JobDetails.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{new Date(job.created_at).toLocaleDateString()}", new: "{formatDate(job.created_at)}" }
      ]
    },
    {
      path: 'src/pages/recruiter/Applicants.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A'}", new: "{formatDate(app.applied_at)}" }
      ]
    },
    {
      path: 'src/pages/recruiter/Dashboard.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{new Date(job.created_at).toLocaleDateString()}", new: "{formatDate(job.created_at)}" }
      ]
    },
    {
      path: 'src/pages/recruiter/ManageJobs.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{new Date(job.created_at).toLocaleDateString()}", new: "{formatDate(job.created_at)}" }
      ]
    },
    {
      path: 'src/pages/seeker/Applications.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{new Date(app.applied_at).toLocaleDateString()}", new: "{formatDate(app.applied_at)}" }
      ]
    },
    {
      path: 'src/pages/seeker/Dashboard.jsx',
      importStatement: "import { formatDate } from '../../utils/date';\n",
      replacements: [
        { old: "{new Date(app.applied_at).toLocaleDateString()}", new: "{formatDate(app.applied_at)}" }
      ]
    },
    {
      path: 'src/pages/admin/Activity.jsx',
      importStatement: "import { formatDateTime } from '../../utils/date';\n",
      replacements: [
        {
          regex: /\{new Date\(act\.timestamp\)\.toLocaleString\(undefined, \{\s*month: 'numeric', day: 'numeric', year: 'numeric',\s*hour: '2-digit', minute: '2-digit', second: '2-digit'\s*\}\)\}/g,
          new: "{formatDateTime(act.timestamp)}"
        }
      ]
    }
  ];

  files.forEach(f => {
    const fullPath = path.join('C:\\Users\\Henna\\Documents\\frontend', f.path);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (!content.includes('utils/date')) {
        content = content.replace(/(import .*?;?\n)/, "$1" + f.importStatement);
      }
      
      f.replacements.forEach(r => {
        if (r.regex) {
          content = content.replace(r.regex, r.new);
        } else {
          content = content.split(r.old).join(r.new);
        }
      });
      
      fs.writeFileSync(fullPath, content);
      console.log('Updated', f.path);
    }
  });
};

applyReplacements();
