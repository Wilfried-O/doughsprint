export function fmtMoneyCAD(n) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    }).format(Number(n || 0));
}

export function fmtDate(iso) {
    if (!iso) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso; // already a local day string
    try {
        // for true timestamps (e.g, "2025-10-11T14:23:00-04:00")
        return new Date(iso).toLocaleDateString('en-CA');
    } catch {
        return String(iso);
    }
}

// Converts text into a filename-friendly "slug"
export function toSlug(s) {
    return String(s).toLowerCase().replace(/\s+/g, '-');
}
