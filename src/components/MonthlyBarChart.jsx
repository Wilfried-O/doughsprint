import { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { fmtMoneyCAD } from '../utils/formatters';
import { groupByMonth } from '../utils/chart';

export default function MonthlyBarChart({ expenses }) {
    const data = useMemo(() => groupByMonth(expenses), [expenses]);

    // use `style: 'compact' | 'full'`
    const formatYM = (ym, { style = 'compact' } = {}) => {
        const d = new Date(`${ym}-01T00:00:00`); // to turn YYYY-MM into a valid date
        return new Intl.DateTimeFormat('en-CA', {
            month: style === 'full' ? 'long' : 'short',
            year: style === 'full' ? 'numeric' : '2-digit',
        }).format(d);
    };

    return (
        <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 24, right: 8, bottom: 8, left: 8 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* compact tick: "Oct 25" (default) */}
                    <XAxis dataKey="month" tickFormatter={v => formatYM(v)} />
                    <YAxis tickFormatter={v => fmtMoneyCAD(v)} />
                    <Tooltip
                        formatter={v => [fmtMoneyCAD(v), 'Total']}
                        // full tooltip: "October 2025"
                        labelFormatter={label =>
                            formatYM(label, { style: 'full' })
                        }
                    />
                    <Bar dataKey="total" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
