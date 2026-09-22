const fs = require('fs');
let content = fs.readFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', 'utf8');

content = content.replace(
`    </div>
    </div>
  );
};`,
`    </div>
  );
};`
);

fs.writeFileSync('C:\\Users\\Henna\\Documents\\frontend\\src\\pages\\public\\About.jsx', content);
console.log('Fixed div tags');
