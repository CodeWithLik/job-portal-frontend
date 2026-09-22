const fs = require('fs');
const path = 'C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\seeker\\SavedJobs.jsx';
let content = fs.readFileSync(path, 'utf8');

// The problematic string is `        )\n        ) : (\n          <Card>` or similar
// Let's just fix the block right after the Pagination Footer
const regex = /(<\/div>\s*)\)\s*\)\s*:\s*\(\s*<Card>/; // Wait, let's just use string replacement on a known good chunk

// Let's replace the whole bottom part from `Next</Button></div></div>)}`
const badEnd = `              </Button>
            </div>
          </div>
        )}
        ) : (
          <Card>
            <CardBody className="p-8 text-center text-gray-500 flex flex-col items-center">
              <Bookmark className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-1">No Saved Jobs</p>
              <p className="mb-4">You haven't saved any jobs yet. Browse jobs and save them for later.</p>
              <Link to="/seeker/jobs">
                <Button>Browse Jobs</Button>
              </Link>
            </CardBody>
          </Card>
        )}
      </div>
    );
  };`;

const goodEnd = `              </Button>
            </div>
          </div>
        )}
        </div>
      ) : (
        <Card>
          <CardBody className="p-8 text-center text-gray-500 flex flex-col items-center">
            <Bookmark className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-1">No Saved Jobs</p>
            <p className="mb-4">You haven't saved any jobs yet. Browse jobs and save them for later.</p>
            <Link to="/seeker/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  );
};`;

// Try to use a regex because whitespace might be different
const endRegex = /<\/Button>\s*<\/div>\s*<\/div>\s*\)\}\s*\)\s*:\s*\(\s*<Card>[\s\S]*?<\/div>\s*\);\s*\};/m;
content = content.replace(endRegex, goodEnd.trim());

fs.writeFileSync(path, content);
console.log('Fixed SavedJobs.jsx bottom part');
