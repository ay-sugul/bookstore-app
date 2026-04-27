import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { api } from '../api/client';

export default function DashboardPage() {
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    async function load() {
      const [monthlyRes, yearlyRes, topRes] = await Promise.all([
        api.get('/analytics/monthly-revenue'),
        api.get('/analytics/yearly-revenue'),
        api.get('/analytics/top-selling-books'),
      ]);

      setMonthly(
        monthlyRes.data.map((item) => ({
          period: `${item.year}-${item.month}`,
          revenue: Number(item.revenue),
        })),
      );
      setYearly(yearlyRes.data.map((item) => ({ year: item.year, revenue: Number(item.revenue) })));
      setTopBooks(topRes.data);
    }

    load();
  }, []);

  return (
    <section className="page dashboard-page">
      <div className="page-head">
        <h2>Store insights</h2>
        <p>Monthly revenue, yearly revenue, and top selling books.</p>
      </div>

      <div className="charts-grid">
        <article className="chart-card">
          <h3>Monthly revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#d66532" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="chart-card">
          <h3>Yearly revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={yearly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#2f6f8f" />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </div>

      <article className="chart-card">
        <h3>Top selling books</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Units sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.unitsSold}</td>
                  <td>${Number(book.revenue).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
