import React, { useState } from 'react';
import { FileSpreadsheet, FileText, BarChart2 } from 'lucide-react';

export default function ReportsAndCompliance() {
  const [category, setCategory] = useState('mensWear');
  const [reportType, setReportType] = useState('sales');

  const reportRowKeys = ['rpt001', 'rpt002', 'rpt003'];

  const reportStatusStyles = {
    completed: 'bg-green-100 text-green-800 border-green-200',
    inProgress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  const categoryLabels = {
    mensWear: "Men's Wear",
    womensWear: "Women's Wear",
    kidsWear: "Kids Wear",
  };

  const reportTypeLabels = {
    sales: 'Sales',
    inventory: 'Inventory',
    returns: 'Returns',
  };

  const reportRows = {
    rpt001: { category: 'mensWear', date: '2025-08-01', type: 'sales', status: 'completed' },
    rpt002: { category: 'womensWear', date: '2025-08-05', type: 'inventory', status: 'completed' },
    rpt003: { category: 'kidsWear', date: '2025-08-10', type: 'returns', status: 'inProgress' },
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    console.log({ category, reportType });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 mt-11">

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-green-900 tracking-tight">
          Reports & Inventory
        </h2>

        {/* Card 1: Generate New Report Form */}
        <section className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/60 shadow-md">
          <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-4 sm:mb-6">
            Generate New Report
          </h3>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5 md:col-span-5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-sm sm:text-base text-slate-800 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%20%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%20%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
              >
                <option value="mensWear">Men's Wear</option>
                <option value="womensWear">Women's Wear</option>
                <option value="kidsWear">Kids Wear</option>
              </select>
            </div>

            {/* Report Type Dropdown */}
            <div className="flex flex-col gap-1.5 md:col-span-4">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-sm sm:text-base text-slate-800 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%20%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%20%22%20stroke%3D%22%23475569%22%20stroke-width%3D%222%22%20%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
              >
                <option value="sales">Sales</option>
                <option value="inventory">Inventory</option>
                <option value="returns">Returns</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-yellow-300 font-bold py-2.5 sm:py-3 px-6 rounded-xl shadow-md transform active:scale-95 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <BarChart2 className="w-4 h-4 sm:w-5 h-5" />
                Generate
              </button>
            </div>
          </form>
        </section>

        {/* Card 2: Generated Reports Table */}
        <section className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/60 shadow-md space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-green-800">
            Generated Reports
          </h3>

          {/* Responsive scrollable layout wrapper for tables */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="min-w-full table-auto text-left border-collapse bg-white whitespace-nowrap">
              <thead>
                <tr className="bg-green-800 text-yellow-300 uppercase text-xs tracking-wider">
                  <th className="px-4 sm:px-6 py-4 font-bold rounded-tl-xl">Report ID</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">Category</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">Date</th>
                  <th className="px-4 sm:px-6 py-4 font-bold">Type</th>
                  <th className="px-4 sm:px-6 py-4 font-bold rounded-tr-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
                {reportRowKeys.map((rowKey) => {
                  const row = reportRows[rowKey];
                  return (
                    <tr key={rowKey} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 sm:px-6 py-4 text-green-700 font-semibold">
                        {rowKey.toUpperCase()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-slate-900">
                        {categoryLabels[row.category]}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-slate-500">
                        {row.date}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-slate-600">
                        {reportTypeLabels[row.type]}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`px-2.5 py-1 rounded border text-[11px] sm:text-xs tracking-wide font-bold ${reportStatusStyles[row.status]}`}>
                          {row.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-yellow-300 font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 order-2 sm:order-1">
              <FileText className="w-4 h-4" />
              Download PDF
            </button>
            <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-green-950 font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 order-1 sm:order-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export Excel
            </button>
          </div>
        </section>
      </main>

    </div>
  );
}