const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\admin\\Settings.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add CheckCircle2 to imports
content = content.replace(
  "import { Save, RotateCcw, Loader2, X } from 'lucide-react';",
  "import { Save, RotateCcw, Loader2, X, CheckCircle2 } from 'lucide-react';"
);

// 2. Remove isResetting state
content = content.replace(
  'const [isResetting, setIsResetting] = useState(false);',
  ''
);

// 3. Remove handleSave and handleReset
const methodsToRemove = `  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/admin/settings', settings);
      showNotification('System settings updated successfully.');
    } catch (error) {
      console.error('Failed to save settings:', error);
      showNotification('Failed to save settings.', true);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    await fetchSettings(false);
    setIsResetting(false);
    showNotification('Changes reverted to current settings.');
  };`;

content = content.replace(methodsToRemove, '');

// 4. Replace the bottom buttons with the auto-save message
const oldButtons = `      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 text-gray-600" disabled={saving || isResetting}>
          {isResetting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />} Reset Changes
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2" disabled={saving || isResetting}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </div>`;

const newFooter = `      <div className="flex justify-end gap-2 pt-6 border-t border-gray-200 text-sm text-gray-500 items-center">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <span>All settings are automatically saved when changed</span>
      </div>`;

if (content.includes('Save Changes')) {
  content = content.replace(oldButtons, newFooter);
  fs.writeFileSync(path, content);
  console.log('Successfully replaced buttons with auto-save footer');
} else {
  console.log('Buttons not found in expected format');
}
