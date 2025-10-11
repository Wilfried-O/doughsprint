import { downloadText } from './download';

/* Exports raw numbers and ISO dates (better for spreadsheets),
   and safely escapes quotes
*/
export function downloadCSVFromExpenses(expenses, filename = 'expenses.csv') {
    const headers = ['id', 'date', 'amount', 'category', 'note'];

    const escapeCSV = v => `"${String(v).replaceAll('"', '""')}"`;

    const headerLine = headers.join(); // separated with a comma, by default
    const bodyLines = expenses.map(e =>
        headers.map(h => escapeCSV(e[h])).join()
    );

    const csv = [headerLine, ...bodyLines].join('\n');

    downloadText(csv, filename, 'text/csv;charset=utf-8;');
}
