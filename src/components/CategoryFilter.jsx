export default function CategoryFilter({ categories, value, onChange }) {
    const id = 'category-filter';

    return (
        <div className="filter hstack gap-050">
            <label className="muted mr-8" htmlFor={id}>
                Category:
            </label>
            <select
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                {categories.map(c => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
        </div>
    );
}
