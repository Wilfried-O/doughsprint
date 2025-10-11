import { useMemo, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { downloadCSVFromExpenses } from './utils/csv';

export default function App() {
    const [expenses, setExpenses] = useLocalStorage('doughsprint:expenses', []);
    const CATEGORIES = [
        'Food',
        'Transport',
        'Housing',
        'Entertainment',
        'Health',
        'Other',
    ];
    const [filteredCateg, setFilteredCateg] = useState('All');

    function addExpense(expense) {
        setExpenses(prev => [expense, ...prev]);
    }
    function deleteExpense(id) {
        setExpenses(prev => prev.filter(e => e.id !== id));
    }

    const filteredExpenses = useMemo(() => {
        if (filteredCateg === 'All') return expenses;
        return expenses.filter(e => e.category === filteredCateg);
    }, [expenses, filteredCateg]);

    // Total matches the filtered list
    const total = useMemo(
        () => filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0),
        [filteredExpenses]
    );

    // Export current (filtered) view
    function handleExport() {
        if (filteredExpenses.length === 0) return;
        const pad = n => String(n).padStart(2, '0');
        const now = new Date();
        const name =
            `doughsprint-` +
            `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-` +
            `${pad(now.getHours())}${pad(now.getMinutes())}.csv`;
        downloadCSVFromExpenses(filteredExpenses, name);
    }

    return (
        <div className="container">
            <header className="header">
                <h1>DoughSprint 💸</h1>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.5rem',
                    }}
                >
                    <div className="muted">
                        {`Total: `}
                        <strong>
                            {new Intl.NumberFormat('en-CA', {
                                style: 'currency',
                                currency: 'CAD',
                            }).format(total)}
                        </strong>
                    </div>
                    <button
                        className="btn"
                        onClick={handleExport}
                        disabled={filteredExpenses.length === 0}
                        title={
                            filteredExpenses.length
                                ? 'Export the currently filtered expenses'
                                : 'Nothing to export yet'
                        }
                    >
                        Export CSV
                    </button>
                </div>
            </header>

            <section className="card">
                <h2>Add expense</h2>
                <ExpenseForm onAdd={addExpense} categories={CATEGORIES} />
            </section>

            <section
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}
            >
                <CategoryFilter
                    categories={['All', ...CATEGORIES]}
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
