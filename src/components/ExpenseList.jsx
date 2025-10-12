import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ items, onDelete }) {
    if (!items.length) return <p className="muted">No expenses yet.</p>;

    return (
        <ul className="list">
            {items.map(item => (
                <ExpenseItem key={item.id} item={item} onDelete={onDelete} />
            ))}
        </ul>
    );
}
