// src/utils/csv.js
import { downloadText } from './download';
import { CSV_HEADERS } from './constants';

/**
 * downloadCSVFromExpenses(expenses, filename, options)
 * - expenses: array of objects
 * - filename: string
 * - options: { delimiter: ',' }   // set delimiter: ';' for some locales
 */
export function downloadCSVFromExpenses(
    expenses,
    filename = 'expenses.csv',
    { delimiter = ',' } = {}
) {
    const headers = CSV_HEADERS;

    // Prevent CSV formula injection: if a string starts with =, +, -, or @,
    // prefix with a single quote so spreadsheet apps treat it as text.
    const sanitizeForCSV = s => (/^[=+\-@]/.test(s) ? `'${s}` : s);

    const escapeCSV = v => `"${sanitizeForCSV(v).replaceAll('"', '""')}"`;

    const headerLine = headers.join(delimiter);
    const bodyLines = expenses.map(e =>
        headers.map(h => escapeCSV(e[h])).join(delimiter)
    );

    // Excel-friendly: BOM + CRLF
    const csv = '\ufeff' + [headerLine, ...bodyLines].join('\r\n');

    downloadText(csv, filename, 'text/csv;charset=utf-8');
}
