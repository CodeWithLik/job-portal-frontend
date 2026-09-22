const fs = require('fs');

const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\Profile.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /(<div className="flex justify-end gap-4 mt-8">\s*)<Button type="submit" disabled=\{saving\}>\{saving \? 'Saving\.\.\.' : 'Save Changes'\}<\/Button>(\s*)<Button type="button" variant="outline" onClick=\{handleCancel\}>Cancel<\/Button>(\s*<\/div>)/;

const newStr = '$1<Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>$2<Button type="submit" disabled={saving}>{saving ? \'Saving...\' : \'Save Changes\'}</Button>$3';

content = content.replace(regex, newStr);

fs.writeFileSync(path, content);
console.log('Swapped buttons with regex');
