/**
 * Pricing Preview & Pre-Push Verification CLI
 * Run: npm run pricing:preview
 */

const fs = require('fs');
const path = require('path');

function parseCSV(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else current += char;
        }
        values.push(current.trim());
        const record = {};
        headers.forEach((h, idx) => {
            record[h] = values[idx] ?? '';
        });
        return record;
    });
}

function formatINR(num) {
    return '₹' + Math.round(num).toLocaleString('en-IN');
}

function formatUSD(num) {
    return '$' + Math.round(num).toLocaleString('en-US');
}

const plansPath = path.join(__dirname, '..', 'src', 'data', 'pricing_plans.csv');
const plans = parseCSV(plansPath);

console.log('\n========================================================================================');
console.log('                        ❄️  FROSTY SAAS PRICING PREVIEW TABLE ❄️                         ');
console.log('========================================================================================\n');

['core', 'commerce'].forEach(category => {
    console.log(`\n▶ CATEGORY: ${category.toUpperCase()} PLANS\n` + '-'.repeat(88));
    
    ['IN', 'INTL'].forEach(region => {
        const isINR = region === 'IN';
        const curr = isINR ? '₹' : '$';
        const regionLabel = isINR ? '🇮🇳 INDIA (INR)' : '🌍 GLOBAL (USD)';
        
        console.log(`\n  Region: ${regionLabel}`);
        console.log('  ' + '-'.repeat(84));
        
        const catPlans = plans.filter(p => p.category === category);
        
        catPlans.forEach(p => {
            const base = parseFloat(isINR ? p.base_inr : p.base_usd);
            const annual = parseFloat(isINR ? p.inr_annual : p.usd_annual) || Math.round(base * 0.80);
            const biannual = parseFloat(isINR ? p.inr_biannual : p.usd_biannual) || Math.round(base * 0.85);
            const quarterly = parseFloat(isINR ? p.inr_quarterly : p.usd_quarterly) || Math.round(base * 0.955);
            
            // Strikethrough from CSV:
            const strikeRaw = isINR ? p.inr_strikethrough : p.usd_strikethrough;
            const strikeNum = parseFloat(strikeRaw);
            const standardRate = (!isNaN(strikeNum) && strikeNum > 0) ? (isINR ? formatINR(strikeNum) : formatUSD(strikeNum)) : '-';
            
            // Benchmark for total savings (Standard Price if present, otherwise Monthly Base)
            const benchmark = (!isNaN(strikeNum) && strikeNum > 0) ? strikeNum : base;

            const annualBilled = annual * 12;
            const annualSave = (benchmark * 12) - annualBilled;
            
            const popularTag = (p.is_popular === 'true' || p.is_popular === '1') ? ' [★ MOST POPULAR]' : '';
            
            console.log(`\n  • ${p.plan.toUpperCase()} PLAN${popularTag}`);
            console.log(`    Convos: ${p.convos} /mo (Extra: ${isINR ? p.overage_inr : p.overage_usd}) | Seats: ${p.seats} | Web: ${p.web_channels} | WA: ${p.wa_channels}`);
            console.log(`    Fixed Standard Strikethrough: ${standardRate}/mo`);
            console.log(`    ┌────────────────┬──────────────┬──────────────┬────────────────────────┬──────────────┐`);
            console.log(`    │ Billing Term   │ Rate /mo     │ Standard     │ Billed Note            │ Savings      │`);
            console.log(`    ├────────────────┼──────────────┼──────────────┼────────────────────────┼──────────────┤`);
            
            // Annual
            console.log(`    │ Annual (-20%)  │ ${(curr + (isINR ? annual.toLocaleString('en-IN') : annual)).padEnd(12)} │ ${(standardRate === '-' ? '-' : standardRate + '/mo').padEnd(12)} │ ${(isINR ? formatINR(annualBilled) : formatUSD(annualBilled)) + '/yr' + ' '.repeat(16 - (isINR ? formatINR(annualBilled).length : formatUSD(annualBilled).length))} │ ${(annualSave > 0 ? (isINR ? formatINR(annualSave) : formatUSD(annualSave)) : '-').padEnd(12)} │`);
            
            // Biannual
            const biannualBilled = biannual * 6;
            const biannualSave = (benchmark * 6) - biannualBilled;
            console.log(`    │ 6 Months       │ ${(curr + (isINR ? biannual.toLocaleString('en-IN') : biannual)).padEnd(12)} │ ${(standardRate === '-' ? '-' : standardRate + '/mo').padEnd(12)} │ ${(isINR ? formatINR(biannualBilled) : formatUSD(biannualBilled)) + '/6mo' + ' '.repeat(15 - (isINR ? formatINR(biannualBilled).length : formatUSD(biannualBilled).length))} │ ${(biannualSave > 0 ? (isINR ? formatINR(biannualSave) : formatUSD(biannualSave)) : '-').padEnd(12)} │`);
            
            if (category === 'core') {
                // Quarterly
                const qBilled = quarterly * 3;
                const qSave = (benchmark * 3) - qBilled;
                console.log(`    │ Quarterly      │ ${(curr + (isINR ? quarterly.toLocaleString('en-IN') : quarterly)).padEnd(12)} │ ${(standardRate === '-' ? '-' : standardRate + '/mo').padEnd(12)} │ ${(isINR ? formatINR(qBilled) : formatUSD(qBilled)) + '/3mo' + ' '.repeat(15 - (isINR ? formatINR(qBilled).length : formatUSD(qBilled).length))} │ ${(qSave > 0 ? (isINR ? formatINR(qSave) : formatUSD(qSave)) : '-').padEnd(12)} │`);
                
                // Monthly
                const mSave = (benchmark * 1) - base;
                console.log(`    │ Monthly (Base) │ ${(curr + (isINR ? base.toLocaleString('en-IN') : base)).padEnd(12)} │ ${(standardRate === '-' ? '-' : standardRate + '/mo').padEnd(12)} │ Billed monthly         │ ${(mSave > 0 ? (isINR ? formatINR(mSave) : formatUSD(mSave)) : '-').padEnd(12)} │`);
            } else {
                // Trimonthly min term
                const triBilled = base * 3;
                const triSave = (benchmark * 3) - triBilled;
                console.log(`    │ 3 Mo (Min Term)│ ${(curr + (isINR ? base.toLocaleString('en-IN') : base)).padEnd(12)} │ ${(standardRate === '-' ? '-' : standardRate + '/mo').padEnd(12)} │ ${(isINR ? formatINR(triBilled) : formatUSD(triBilled)) + '/3mo' + ' '.repeat(15 - (isINR ? formatINR(triBilled).length : formatUSD(triBilled).length))} │ ${(triSave > 0 ? (isINR ? formatINR(triSave) : formatUSD(triSave)) : '-').padEnd(12)} │`);
            }
            console.log(`    └────────────────┴──────────────┴──────────────┴────────────────────────┴──────────────┘`);
        });
    });
});

console.log('\n========================================================================================');
console.log('✔ To edit prices, update `src/data/pricing_plans.csv` and re-run this preview command.');
console.log('========================================================================================\n');
