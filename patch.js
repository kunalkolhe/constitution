const fs = require('fs');
let content = fs.readFileSync('src/data/states.ts', 'utf8');

const data = {
  'AP': { population: '49.5 Million', area: '162,975 sq km' },
  'AR': { population: '1.4 Million', area: '83,743 sq km' },
  'AS': { population: '31.2 Million', area: '78,438 sq km' },
  'BR': { population: '104.1 Million', area: '94,163 sq km' },
  'CT': { population: '25.5 Million', area: '135,192 sq km' },
  'GA': { population: '1.5 Million', area: '3,702 sq km' },
  'GJ': { population: '60.4 Million', area: '196,024 sq km' },
  'HR': { population: '25.3 Million', area: '44,212 sq km' },
  'HP': { population: '6.8 Million', area: '55,673 sq km' },
  'JH': { population: '32.9 Million', area: '79,716 sq km' },
  'KA': { population: '61.1 Million', area: '191,791 sq km' },
  'KL': { population: '33.4 Million', area: '38,863 sq km' },
  'MP': { population: '72.6 Million', area: '308,252 sq km' },
  'MH': { population: '112.3 Million', area: '307,713 sq km' },
  'MN': { population: '2.8 Million', area: '22,327 sq km' },
  'ML': { population: '2.9 Million', area: '22,429 sq km' },
  'MZ': { population: '1.1 Million', area: '21,081 sq km' },
  'NL': { population: '1.9 Million', area: '16,579 sq km' },
  'OR': { population: '41.9 Million', area: '155,707 sq km' },
  'PB': { population: '27.7 Million', area: '50,362 sq km' },
  'RJ': { population: '68.5 Million', area: '342,239 sq km' },
  'SK': { population: '0.6 Million', area: '7,096 sq km' },
  'TN': { population: '72.1 Million', area: '130,058 sq km' },
  'TG': { population: '35.0 Million', area: '112,077 sq km' },
  'TR': { population: '3.6 Million', area: '10,491 sq km' },
  'UP': { population: '199.8 Million', area: '240,928 sq km' },
  'UT': { population: '10.1 Million', area: '53,483 sq km' },
  'WB': { population: '91.3 Million', area: '88,752 sq km' },
  'AN': { population: '0.4 Million', area: '8,249 sq km' },
  'CH': { population: '1.1 Million', area: '114 sq km' },
  'DN': { population: '0.6 Million', area: '603 sq km' },
  'DL': { population: '16.8 Million', area: '1,484 sq km' },
  'JK': { population: '12.2 Million', area: '42,241 sq km' },
  'LA': { population: '0.3 Million', area: '59,146 sq km' },
  'LD': { population: '0.06 Million', area: '32 sq km' },
  'PY': { population: '1.2 Million', area: '490 sq km' }
};

// Add to type
content = content.replace('description: string;', 'description: string;\n  population?: string;\n  area?: string;');

// Inject into array
for (const [id, info] of Object.entries(data)) {
  const regex = new RegExp(`(id: "${id}",[\\s\\S]*?description: "[^"]+")`);
  content = content.replace(regex, `$1,\n    population: "${info.population}",\n    area: "${info.area}"`);
}

fs.writeFileSync('src/data/states.ts', content);
console.log('patched successfully');
