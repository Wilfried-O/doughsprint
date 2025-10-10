import { useMemo, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import { useLocalStorage } from './hooks/useLocalStorage';

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
    const [selectedCategory, setSelectedCategory] = useState('All');

    function addExpense(expense) {
        setExpenses(prev => [expense, ...prev]);
    }
    function deleteExpense(id) {
        setExpenses(prev => prev.filter(e => e.id !== id));
    }

    // Filter by category (treat missing category as "Other")
    const filteredExpenses = useMemo(() => {
        if (selectedCategory === 'All') return expenses;
        return expenses.filter(
            e => (e.category ?? 'Other') === selectedCategory
        );
    }, [expenses, selectedCategory]);

    // Total matches the filtered list
    const total = useMemo(
        () => filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0),
        [filteredExpenses]
    );

    return (
        <div className="container">
            <header className="header">
                <h1>DoughSprint 💸</h1>
                <div className="muted">
                    Total:{' '}
                    <strong>
                        {new Intl.NumberFormat('en-CA', {
                            style: 'currency',
                            currency: 'CAD',
                        }).format(total)}
                    </strong>
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
                    value={selectedCategory}
                    onChange={setSelectedCategory}
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
