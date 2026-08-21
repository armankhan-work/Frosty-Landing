// ─── Types ───────────────────────────────────────────────────────────────────────────────────
export type Region = 'IN' | 'INTL';
export type PlanFamily = 'core' | 'commerce' | 'addons';
export type CoreBillingTerm = 'annual' | 'biannual' | 'quarterly' | 'monthly';
export type CommerceBillingTerm = 'annual' | 'biannual' | 'trimonthly';
export type BillingTerm = CoreBillingTerm | CommerceBillingTerm;

export interface TierPricing {
    price: string;
    rawPrice: number;
    period: string;
    billingNote: string;
    savings?: string;
    totalBilled: number;
    strikethroughPrice: string;
}

export interface PlanDetails {
    tag: string;
    name: string;
    conversations: string;
    monthlyConvosNum: number;
    seats: string;
    seatsNum: number;
    webChannels: number;
    waChannels: number;
    overage: string;
    cta: string;
    ctaLink: string;
    highlighted?: boolean;
    strikethroughPrice: string;
    showLaunchBadge: boolean;
    pricing: Record<string, TierPricing>;
}

export interface AddonItem {
    id: string;
    tag: string;
    name: string;
    badge: string;
    price: string;
    period: string;
    billingNote: string;
    desc: string;
    bullets: string[];
    cta: string;
    ctaLink: string;
    strikethroughPrice: string;
    showLaunchBadge: boolean;
}

export interface BillingTermOption {
    id: string;
    label: string;
    months: number;
    discountBadge?: string | null;
}

// Raw CSV strings — populated at runtime from the API route
// (This makes every browser refresh read the latest CSV from disk)
export interface PricingCSVBundle {
    plans: string;
    discounts: string;
    addons: string;
}

// ─── Formatting Helpers ──────────────────────────────────────────────────────────────────────

export function formatCurrencyAmount(amount: number, region: Region): string {
    if (region === 'IN') {
        return `₹${Math.round(amount).toLocaleString('en-IN')}`;
    }
    return `$${Math.round(amount).toLocaleString('en-US')}`;
}

// ─── CSV Parser ──────────────────────────────────────────────────────────────────────────────

export function parseCSV(csvString: string): Record<string, string>[] {
    const lines = csvString.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values: string[] = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        const record: Record<string, string> = {};
        headers.forEach((h, idx) => { record[h] = values[idx] ?? ''; });
        return record;
    });
}

// ─── Computed Plan Builder ───────────────────────────────────────────────────────────────────

export function getComputedPlans(rawPlansCsv: string, region: Region, category: 'core' | 'commerce'): PlanDetails[] {
    const records = parseCSV(rawPlansCsv).filter(r => r.category === category);

    return records.map(r => {
        const basePrice = region === 'IN' ? parseFloat(r.base_inr) : parseFloat(r.base_usd);
        const pricing: Record<string, TierPricing> = {};

        // Fixed Strikethrough from CSV:
        // For IN: comes from inr_strikethrough column (e.g. 9499 -> ₹9,499)
        // For INTL: comes from usd_strikethrough (empty by default for US clients -> no strikethrough, no launch badge)
        const strikethroughRaw = region === 'IN' ? r.inr_strikethrough : r.usd_strikethrough;
        const strikethroughNum = parseFloat(strikethroughRaw);
        const strikethroughPrice = (!isNaN(strikethroughNum) && strikethroughNum > 0) ? formatCurrencyAmount(strikethroughNum, region) : '';
        const showLaunchBadge = region === 'IN' && Boolean(strikethroughPrice);

        // Savings Benchmark: If fixed strikethrough standard price is given, savings is calculated against the standard price;
        // otherwise (e.g. USD) savings is calculated against the monthly base list price.
        const benchmarkPrice = (!isNaN(strikethroughNum) && strikethroughNum > 0) ? strikethroughNum : basePrice;

        if (category === 'core') {
            // Core Terms: annual, biannual, quarterly, monthly
            const annualPrice = parseFloat(region === 'IN' ? r.inr_annual : r.usd_annual) || Math.round(basePrice * 0.80);
            const biannualPrice = parseFloat(region === 'IN' ? r.inr_biannual : r.usd_biannual) || Math.round(basePrice * 0.85);
            const quarterlyPrice = parseFloat(region === 'IN' ? r.inr_quarterly : r.usd_quarterly) || Math.round(basePrice * 0.955);
            const monthlyPrice = basePrice;

            // Annualized Savings: (benchmark - termPrice) × 12
            const annualBilled = annualPrice * 12;
            const annualSavings = (benchmarkPrice - annualPrice) * 12;
            pricing['annual'] = {
                price: formatCurrencyAmount(annualPrice, region),
                rawPrice: annualPrice,
                period: '/mo',
                billingNote: `Billed annually (${formatCurrencyAmount(annualBilled, region)})`,
                savings: annualSavings > 0 ? `Save ${formatCurrencyAmount(annualSavings, region)}/yr` : undefined,
                totalBilled: annualBilled,
                strikethroughPrice
            };

            const biannualBilled = biannualPrice * 6;
            const biannualSavings = (benchmarkPrice - biannualPrice) * 12;
            pricing['biannual'] = {
                price: formatCurrencyAmount(biannualPrice, region),
                rawPrice: biannualPrice,
                period: '/mo',
                billingNote: `Billed 6 months (${formatCurrencyAmount(biannualBilled, region)})`,
                savings: biannualSavings > 0 ? `Save ${formatCurrencyAmount(biannualSavings, region)}/yr` : undefined,
                totalBilled: biannualBilled,
                strikethroughPrice
            };

            const quarterlyBilled = quarterlyPrice * 3;
            const quarterlySavings = (benchmarkPrice - quarterlyPrice) * 12;
            pricing['quarterly'] = {
                price: formatCurrencyAmount(quarterlyPrice, region),
                rawPrice: quarterlyPrice,
                period: '/mo',
                billingNote: `Billed quarterly (${formatCurrencyAmount(quarterlyBilled, region)})`,
                savings: quarterlySavings > 0 ? `Save ${formatCurrencyAmount(quarterlySavings, region)}/yr` : undefined,
                totalBilled: quarterlyBilled,
                strikethroughPrice
            };

            const monthlySavings = (benchmarkPrice - monthlyPrice) * 12;
            pricing['monthly'] = {
                price: formatCurrencyAmount(monthlyPrice, region),
                rawPrice: monthlyPrice,
                period: '/mo',
                billingNote: 'Billed monthly',
                savings: monthlySavings > 0 ? `Save ${formatCurrencyAmount(monthlySavings, region)}/yr` : undefined,
                totalBilled: monthlyPrice,
                strikethroughPrice
            };

        } else {
            // Commerce: annual, biannual, trimonthly (min 3 months = base price)
            const annualPrice = parseFloat(region === 'IN' ? r.inr_annual : r.usd_annual) || Math.round(basePrice * 0.80);
            const biannualPrice = parseFloat(region === 'IN' ? r.inr_biannual : r.usd_biannual) || Math.round(basePrice * 0.90);
            const trimonthlyPrice = basePrice;

            // Annualized Savings: (benchmark - termPrice) × 12
            const annualBilled = annualPrice * 12;
            const annualSavings = (benchmarkPrice - annualPrice) * 12;
            pricing['annual'] = {
                price: formatCurrencyAmount(annualPrice, region),
                rawPrice: annualPrice,
                period: '/mo',
                billingNote: `Billed annually (${formatCurrencyAmount(annualBilled, region)})`,
                savings: annualSavings > 0 ? `Save ${formatCurrencyAmount(annualSavings, region)}/yr` : undefined,
                totalBilled: annualBilled,
                strikethroughPrice
            };

            const biannualBilled = biannualPrice * 6;
            const biannualSavings = (benchmarkPrice - biannualPrice) * 12;
            pricing['biannual'] = {
                price: formatCurrencyAmount(biannualPrice, region),
                rawPrice: biannualPrice,
                period: '/mo',
                billingNote: `Billed 6 months (${formatCurrencyAmount(biannualBilled, region)})`,
                savings: biannualSavings > 0 ? `Save ${formatCurrencyAmount(biannualSavings, region)}/yr` : undefined,
                totalBilled: biannualBilled,
                strikethroughPrice
            };

            const trimonthlyBilled = trimonthlyPrice * 3;
            const trimonthlySavings = (benchmarkPrice - trimonthlyPrice) * 12;
            pricing['trimonthly'] = {
                price: formatCurrencyAmount(trimonthlyPrice, region),
                rawPrice: trimonthlyPrice,
                period: '/mo',
                billingNote: `Billed 3 months (${formatCurrencyAmount(trimonthlyBilled, region)}) · Min Term`,
                savings: trimonthlySavings > 0 ? `Save ${formatCurrencyAmount(trimonthlySavings, region)}/yr` : undefined,
                totalBilled: trimonthlyBilled,
                strikethroughPrice
            };
        }

        return {
            tag: r.plan.toUpperCase(),
            name: r.plan,
            conversations: `${(parseInt(r.convos, 10) || 0).toLocaleString()} conversations`,
            monthlyConvosNum: parseInt(r.convos, 10) || 0,
            seats: `${parseInt(r.seats, 10) || 1} team seats`,
            seatsNum: parseInt(r.seats, 10) || 1,
            webChannels: parseInt(r.web_channels, 10) || 1,
            waChannels: parseInt(r.wa_channels, 10) || 1,
            overage: region === 'IN' ? r.overage_inr : r.overage_usd,
            cta: 'Start 7-Day Free Trial',
            ctaLink: '/login?mode=register',
            highlighted: r.is_popular === 'true' || r.is_popular === '1',
            strikethroughPrice,
            showLaunchBadge,
            pricing
        };
    });
}

// ─── Addons ──────────────────────────────────────────────────────────────────────────────────

export function getComputedAddons(rawAddonsCsv: string, region: Region): AddonItem[] {
    const records = parseCSV(rawAddonsCsv);
    return records.map(r => {
        const rawNumeric = region === 'IN' ? parseFloat(r.inr_price) : parseFloat(r.usd_price);
        const formattedPrice = isNaN(rawNumeric) ? '' : formatCurrencyAmount(rawNumeric, region);

        const strikethroughRaw = region === 'IN' ? r.inr_strikethrough : r.usd_strikethrough;
        const strikethroughNum = parseFloat(strikethroughRaw);
        const strikethroughPrice = (!isNaN(strikethroughNum) && strikethroughNum > 0) ? formatCurrencyAmount(strikethroughNum, region) : '';
        const showLaunchBadge = region === 'IN' && Boolean(strikethroughPrice);

        return {
            id: r.id,
            tag: r.tag,
            name: r.name,
            badge: r.badge,
            price: formattedPrice,
            period: r.period,
            billingNote: r.billing_note,
            desc: r.desc,
            bullets: [r.bullet1, r.bullet2, r.bullet3].filter(Boolean),
            cta: r.cta,
            ctaLink: r.cta_link,
            strikethroughPrice,
            showLaunchBadge
        };
    });
}

// ─── Billing Toggle Options ───────────────────────────────────────────────────────────────────

export function getBillingDiscounts(rawDiscountsCsv: string, category: 'core' | 'commerce'): BillingTermOption[] {
    const records = parseCSV(rawDiscountsCsv).filter(r => r.category === category);
    return records.map(r => ({
        id: r.term,
        label: r.label,
        months: parseInt(r.months, 10) || 1,
        discountBadge: r.badge || null
    }));
}
