import { useState } from 'react';

function safeId() {
    return (
        crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(16).slice(2)}`
    );
}

export default function ExpenseForm({ onAdd, categories }) {
    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        amount: '',
        category: categories?.[0],
        note: '',
    });

    const canSubmit = form.date && Number(form.amount) > 0;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!canSubmit) return;
        onAdd({
            id: safeId(),
            date: form.date,
            amount: Number(form.amount),
            category: form.category,
            note: form.note.trim(),
        });
        setForm(prev => ({ ...prev, amount: '', note: '' }));
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
            />
            <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount (CAD)"
                step="0.01"
                min="0"
            />
            <select
                name="category"
                value={form.category}
                onChange={handleChange}
            >
                {categories.map(c => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Note (optional)"
            />
            <button className="btn" type="submit" disabled={!canSubmit}>
                Add
            </button>
        </form>
    );
}
