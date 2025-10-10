function fmtMoneyCAD(n) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    }).format(n);
}
function fmtDate(iso) {
    try {
        return new Date(iso).toLocaleDateString('en-CA');
    } catch {
        return iso;
    }
}

export default function ExpenseList({ items, onDelete }) {
    if (!items.length) return <p className="muted">No expenses yet.</p>;

    return (
        <ul className="list">
            {items.map(e => (
                <li key={e.id} className="row">
                    <div>
                        <div className="strong">{fmtMoneyCAD(e.amount)}</div>
                        <div className="muted">{fmtDate(e.date)}</div>
                        {e.note && <div className="note">{e.note}</div>}
                    </div>
                    <button
                        className="btn danger"
                        onClick={() => onDelete(e.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
