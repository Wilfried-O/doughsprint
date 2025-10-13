// App.jsx
import { useMemo, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import MonthlyBarChart from './components/MonthlyBarChart';
import YearlyPieChart from './components/YearlyPieChart';
import { useLocalStorage } from './hooks/useLocalStorage';
import { downloadCSVFromExpenses } from './utils/csv';
import { fmtMoneyCAD, toSlug } from './utils/formatters';
import { timestampForFilename } from './utils/date';
import {
    APP_NAME,
    CATEGORIES,
    FILTER_ALL,
    STORAGE_KEYS,
} from './utils/constants';

export default function App() {
    const [expenses, setExpenses] = useLocalStorage(STORAGE_KEYS.expenses, []);
    const [filteredCateg, setFilteredCateg] = useState(FILTER_ALL);

    const [showCharts, setShowCharts] = useState(true);

    function addExpense(expense) {
        setExpenses(prev => [expense, ...prev]);
    }
    function deleteExpense(id) {
        setExpenses(prev => prev.filter(e => e.id !== id));
    }

    const filteredExpenses = useMemo(() => {
        if (filteredCateg === FILTER_ALL) return expenses;
        return expenses.filter(e => e.category === filteredCateg);
    }, [expenses, filteredCateg]);

    const total = useMemo(
        () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
        [filteredExpenses]
    );

    const hasExpenses = filteredExpenses.length > 0;

    function handleExport() {
        if (!hasExpenses) return;
        const categ =
            filteredCateg === FILTER_ALL ? 'all' : toSlug(filteredCateg);
        const name = `doughsprint-${categ}-${timestampForFilename()}.csv`;
        downloadCSVFromExpenses(filteredExpenses, name);
    }

    return (
        <div className="container">
            <header className="header">
                <h1>{APP_NAME} 💸</h1>
                <div className="hstack gap-050 align-baseline">
                    <div className="muted">
                        Total:&nbsp;<strong>{fmtMoneyCAD(total)}</strong>
                    </div>

                    <button
                        className="btn"
                        onClick={handleExport}
                        disabled={!hasExpenses}
                        aria-label={`Export ${filteredExpenses.length} item(s) from "${filteredCateg}" as CSV`}
                        title={
                            hasExpenses
                                ? `Export ${filteredExpenses.length} item(s) from "${filteredCateg}"`
                                : 'Nothing to export yet'
                        }
                        type="button"
                    >
                        Export CSV
                    </button>
                </div>
            </header>

            <section className="card">
                <h2>Add expense</h2>
                <ExpenseForm onAdd={addExpense} categories={CATEGORIES} />
            </section>

            <section className="card hstack space-between gap-075">
                <CategoryFilter
                    categories={[FILTER_ALL, ...CATEGORIES]}
                    value={filteredCateg}
                    onChange={setFilteredCateg}
                />

                {hasExpenses && (
                    <button
                        className="btn"
                        type="button"
                        onClick={() => setShowCharts(v => !v)}
                        aria-pressed={showCharts}
                        title={showCharts ? 'Hide charts' : 'Show charts'}
                    >
                        {showCharts ? 'Hide charts' : 'Show charts'}
                    </button>
                )}
            </section>

            {hasExpenses && showCharts && (
                <section className="card">
                    <h2>Monthly breakdown</h2>
                    <MonthlyBarChart expenses={filteredExpenses} />
                </section>
            )}

            {hasExpenses && showCharts && (
                <section className="card">
                    <h2>Yearly breakdown</h2>
                    <YearlyPieChart expenses={filteredExpenses} />
                </section>
            )}

            <section className="card">
                <h2>Expenses</h2>
                <ExpenseList
                    items={filteredExpenses}
                    onDelete={deleteExpense}
                />
            </section>
        </div>
    );
}
