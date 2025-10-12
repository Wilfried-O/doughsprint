// Display name in the UI
export const APP_NAME = 'DoughSprint';

// LocalStorage keys (single source of truth)
export const STORAGE_KEYS = Object.freeze({
    expenses: 'doughsprint:expenses',
});

// Expense categories used across the app
export const CATEGORIES = Object.freeze([
    'Food',
    'Transport',
    'Housing',
    'Entertainment',
    'Health',
    'Other',
]);

// Filter special value for "all"
export const FILTER_ALL = 'All';

// CSV headers for consistent exports
export const CSV_HEADERS = Object.freeze([
    'id',
    'date',
    'amount',
    'category',
    'note',
]);
