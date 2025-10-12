import { useMemo, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
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
        () => filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0),
        [filteredExpenses]
    );

    function handleExport() {
        if (filteredExpenses.length === 0) return;
        const categ =
            filteredCateg === FILTER_ALL ? 'all' : toSlug(filteredCateg);
        const name = `doughsprint-${categ}-${timestampForFilename()}.csv`;
        downloadCSVFromExpenses(filteredExpenses, name);
    }

    return (
        <div className="container">
            <header className="header">
                <h1>{APP_NAME} 💸</h1>
                <div className="hstack gap-050">
                    <div className="muted">
                        Total: <strong>{fmtMoneyCAD(total)}</strong>
                    </div>
                    <button
                        className="btn"
                        onClick={handleExport}
                        disabled={filteredExpenses.length === 0}
                        aria-label={`Export ${filteredExpenses.length} item(s) from "${filteredCateg}" as CSV`}
                        title={
                            filteredExpenses.length
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

            <section className="card hstack gap-075">
                <CategoryFilter
                    categories={[FILTER_ALL, ...CATEGORIES]}
                    value={filteredCateg}
                    onChange={setFilteredCateg}
                />
            </section>

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
