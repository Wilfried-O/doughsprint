export function groupByMonth(expenses) {
    const map = new Map();
    for (const e of expenses) {
        const key = String(e.date).slice(0, 7); // YYYY-MM
        map.set(key, (map.get(key) ?? 0) + Number(e.amount || 0));
    }

    // "YYYY-MM" → [{ month, total }]
    return [...map.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, total]) => ({ month, total: Number(total.toFixed(2)) }));
}

export function groupByYear(expenses) {
    const map = new Map();
    for (const e of expenses) {
        const year = String(e.date).slice(0, 4);
        map.set(year, (map.get(year) ?? 0) + Number(e.amount || 0));
    }

    // "YYYY" → [{ name, value }]
    return [...map.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));
}
