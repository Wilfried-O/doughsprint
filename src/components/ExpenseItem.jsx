import { fmtMoneyCAD, fmtDate } from '../utils/formatters';

export default function ExpenseItem({ item, onDelete }) {
    return (
        <li className="row">
            <div>
                <div className="strong">{fmtMoneyCAD(item.amount)}</div>
                <div className="muted">{fmtDate(item.date)}</div>
                {item.note && <div className="note">{item.note}</div>}
            </div>
            <button className="btn danger" onClick={() => onDelete(item.id)}>
                Delete
            </button>
        </li>
    );
}
