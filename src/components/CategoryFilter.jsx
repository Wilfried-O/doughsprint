export default function CategoryFilter({ categories, value, onChange }) {
    return (
        <div className="filter">
            <label className="muted" style={{ marginRight: 8 }}>
                Category:
            </label>
            <select value={value} onChange={e => onChange(e.target.value)}>
                {categories.map(c => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
        </div>
    );
}
