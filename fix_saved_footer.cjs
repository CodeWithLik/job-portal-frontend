const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// The block to replace is:
/*
        {/* Pagination Footer *\/}
        {savedJobs.length > itemsPerPage && (
          <div className="mt-6 p-4 border border-gray-200 flex flex-wrap gap-4 items-center justify-between bg-white rounded-lg">
*/

content = content.replace(
  '{savedJobs.length > itemsPerPage && (',
  ''
);

// We also need to remove the closing `)}` of that condition.
// The structure was:
/*
              </Button>
            </div>
          </div>
        )}
        </div>
      ) : (
*/
content = content.replace(
  '            </div>\n          </div>\n        )}\n        </div>',
  '            </div>\n          </div>\n        </div>'
);

fs.writeFileSync(path, content);
console.log('Removed conditional rendering for SavedJobs pagination footer');
