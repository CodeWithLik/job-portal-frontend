const fs = require('fs');
const path = 'src/pages/admin/Users.jsx';
let content = fs.readFileSync(path, 'utf8');

// Normalize line endings
content = content.replace(/\\r\\n/g, '\\n');

// 1. Add RefreshCw to lucide-react imports
content = content.replace(
  "import { Search, Edit2, Trash2, Shield, ShieldOff, Eye, UserPlus, AlertTriangle, Loader2, X } from 'lucide-react';",
  "import { Search, Edit2, Trash2, Shield, ShieldOff, Eye, UserPlus, AlertTriangle, Loader2, X, RefreshCw } from 'lucide-react';"
);

// 2. Add refreshTrigger state
content = content.replace(
  "const [loading, setLoading] = useState(true);",
  "const [loading, setLoading] = useState(true);\\n  const [refreshTrigger, setRefreshTrigger] = useState(0);"
);

// 3. Update useEffect to depend on refreshTrigger and set loading to true
const oldUseEffect = \`  useEffect(() => {
    const fetchUsers = async () => {
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
  }, []);\`;

const newUseEffect = \`  useEffect(() => {
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
  }, [refreshTrigger]);\`;

content = content.replace(oldUseEffect, newUseEffect);

// 4. Add the button
const oldButtons = \`              <option value="unverified">Unverified</option>
            </select>
            <Button onClick={() => setAddUserModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 h-10">\`;

const newButtons = \`              <option value="unverified">Unverified</option>
            </select>
            <Button 
              variant="outline"
              onClick={() => setRefreshTrigger(prev => prev + 1)}
              className="w-10 h-10 p-0 flex items-center justify-center border-gray-300 text-gray-600 hover:bg-gray-50 flex-shrink-0"
              title="Refresh Users"
            >
              <RefreshCw className={\`h-4 w-4 \${loading ? 'animate-spin' : ''}\`} />
            </Button>
            <Button onClick={() => setAddUserModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 h-10">\`;

content = content.replace(oldButtons, newButtons);

fs.writeFileSync(path, content);
console.log("Users.jsx refresh button patched.");
