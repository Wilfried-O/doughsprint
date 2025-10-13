import { useMemo } from 'react';
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
} from 'recharts';
import { fmtMoneyCAD } from '../utils/formatters';
import { groupByYear } from '../utils/chart';

const COLORS = [
    '#4F46E5',
    '#16A34A',
    '#DC2626',
    '#F59E0B',
    '#0EA5E9',
    '#9333EA',
    '#EA580C',
    '#059669',
];

export default function YearlyPieChart({ expenses }) {
    const data = useMemo(() => groupByYear(expenses), [expenses]);

    return (
        <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
                <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                    <Legend />
                    <Tooltip formatter={v => [fmtMoneyCAD(v), 'Total']} />
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
