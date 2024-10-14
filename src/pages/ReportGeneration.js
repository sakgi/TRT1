import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/ReportGeneration/ReportGeneration.css'; // Make sure to add your CSS file

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportGeneration = () => {
  const [statusFilter, setStatusFilter] = useState('OnHold');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState('emp1');

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Tickets',
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range before downloading the report.");
      return;
    }
    alert("Graph Downloaded!");
  };

  return (
    <div className="report-container">
      <h1>Report Generation</h1>

      <div className="filter-section">
        <div className="filter-group">
          <label><strong>Status</strong></label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="OnHold">Ticket On Hold</option>
            <option value="Pending">Ticket Pending</option>
            <option value="CLosed">Ticket Closing</option>
            <option value="Solved">Ticket Solved</option>
            <option value="Work-Around">Ticket Work-Around</option>
          </select>
        </div>

        <div className="filter-group">
          <label><strong>Select Date Range</strong></label>
          <div className="date-picker-group">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              required
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              required
            />
          </div>
        </div>

        <div className="filter-group">
          <label><strong>Select Employee</strong></label>
          <select value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)}>
            <option value="emp1">Employee 1</option>
            <option value="emp2">Employee 2</option>
            <option value="emp3">Employee 3</option>
          </select>
        </div>

        <button onClick={handleDownload} className="download-btn">
          Download Report
        </button>
      </div>

      <div className="graph-section">
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          width={400}  // Adjusted width of the graph
          height={200}  // Adjusted height of the graph
        />
      </div>
    </div>
  );
};

export default ReportGeneration;
