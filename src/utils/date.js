export function todayLocalISO(d = new Date()) {
    const tz = d.getTimezoneOffset(); // minutes (positive for Eastern Time)
    const local = new Date(d.getTime() - tz * 60 * 1000);
    return local.toISOString().slice(0, 10); // YYYY-MM-DD (local)
}

export function timestampForFilename(d = new Date()) {
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}
