import { useMemo } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
    const [expenses, setExpenses] = useLocalStorage('doughsprint:expenses', []);

    function addExpense(expense) {
        setExpenses(prev => [expense, ...prev]);
    }
    function deleteExpense(id) {
        setExpenses(prev => prev.filter(e => e.id !== id));
    }

    const total = useMemo(
        () => expenses.reduce((sum, e) => sum + Number(e.amount), 0),
        [expenses]
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
                <ExpenseForm onAdd={addExpense} />
            </section>

            <section className="card">
                <h2>Expenses</h2>
                <ExpenseList items={expenses} onDelete={deleteExpense} />
            </section>
        </div>
    );
}
