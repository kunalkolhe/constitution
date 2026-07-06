const fs = require('fs');
let content = fs.readFileSync('src/data/states.ts', 'utf8');

const data = {
  'AP': { ls: 25, rs: 11, as: '175', leg: 'Bicameral' },
  'AR': { ls: 2, rs: 1, as: '60', leg: 'Unicameral' },
  'AS': { ls: 14, rs: 7, as: '126', leg: 'Unicameral' },
  'BR': { ls: 40, rs: 16, as: '243', leg: 'Bicameral' },
  'CT': { ls: 11, rs: 5, as: '90', leg: 'Unicameral' },
  'GA': { ls: 2, rs: 1, as: '40', leg: 'Unicameral' },
  'GJ': { ls: 26, rs: 11, as: '182', leg: 'Unicameral' },
  'HR': { ls: 10, rs: 5, as: '90', leg: 'Unicameral' },
  'HP': { ls: 4, rs: 3, as: '68', leg: 'Unicameral' },
  'JH': { ls: 14, rs: 6, as: '81', leg: 'Unicameral' },
  'KA': { ls: 28, rs: 12, as: '224', leg: 'Bicameral' },
  'KL': { ls: 20, rs: 9, as: '140', leg: 'Unicameral' },
  'MP': { ls: 29, rs: 11, as: '230', leg: 'Unicameral' },
  'MH': { ls: 48, rs: 19, as: '288', leg: 'Bicameral' },
  'MN': { ls: 2, rs: 1, as: '60', leg: 'Unicameral' },
  'ML': { ls: 2, rs: 1, as: '60', leg: 'Unicameral' },
  'MZ': { ls: 1, rs: 1, as: '40', leg: 'Unicameral' },
  'NL': { ls: 1, rs: 1, as: '60', leg: 'Unicameral' },
  'OR': { ls: 21, rs: 10, as: '147', leg: 'Unicameral' },
  'PB': { ls: 13, rs: 7, as: '117', leg: 'Unicameral' },
  'RJ': { ls: 25, rs: 10, as: '200', leg: 'Unicameral' },
  'SK': { ls: 1, rs: 1, as: '32', leg: 'Unicameral' },
  'TN': { ls: 39, rs: 18, as: '234', leg: 'Unicameral' },
  'TG': { ls: 17, rs: 7, as: '119', leg: 'Bicameral' },
  'TR': { ls: 2, rs: 1, as: '60', leg: 'Unicameral' },
  'UP': { ls: 80, rs: 31, as: '403', leg: 'Bicameral' },
  'UT': { ls: 5, rs: 3, as: '70', leg: 'Unicameral' },
  'WB': { ls: 42, rs: 16, as: '294', leg: 'Unicameral' },
  'AN': { ls: 1, rs: 0, as: 'None', leg: 'None' },
  'CH': { ls: 1, rs: 0, as: 'None', leg: 'None' },
  'DN': { ls: 2, rs: 0, as: 'None', leg: 'None' },
  'DL': { ls: 7, rs: 3, as: '70', leg: 'Unicameral' },
  'JK': { ls: 5, rs: 4, as: '90', leg: 'Unicameral' },
  'LA': { ls: 1, rs: 0, as: 'None', leg: 'None' },
  'LD': { ls: 1, rs: 0, as: 'None', leg: 'None' },
  'PY': { ls: 1, rs: 1, as: '30', leg: 'Unicameral' }
};

// Add to type
content = content.replace('area?: string;', 'area?: string;\n  lokSabhaSeats?: number;\n  rajyaSabhaSeats?: number;\n  assemblySeats?: string;\n  legislatureType?: string;');

// Inject into array
for (const [id, info] of Object.entries(data)) {
  const regex = new RegExp(`(id: "${id}",[\\s\\S]*?area: "[^"]+")`);
  content = content.replace(regex, `$1,\n    lokSabhaSeats: ${info.ls},\n    rajyaSabhaSeats: ${info.rs},\n    assemblySeats: "${info.as}",\n    legislatureType: "${info.leg}"`);
}

fs.writeFileSync('src/data/states.ts', content);
console.log('patched constitutional data successfully');
