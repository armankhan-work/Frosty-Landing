import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This API route reads CSV files fresh from disk on every request.
// Cache-Control: no-store ensures browser never caches this — save CSV → refresh → done.
export async function GET() {
    try {
        const dataDir = path.join(process.cwd(), 'src', 'data');
        const plans = fs.readFileSync(path.join(dataDir, 'pricing_plans.csv'), 'utf-8');
        const discounts = fs.readFileSync(path.join(dataDir, 'pricing_discounts.csv'), 'utf-8');
        const addons = fs.readFileSync(path.join(dataDir, 'pricing_addons.csv'), 'utf-8');

        return NextResponse.json(
            { plans, discounts, addons },
            { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
        );
    } catch (err) {
        return NextResponse.json({ error: 'Failed to read pricing CSV files' }, { status: 500 });
    }
}
