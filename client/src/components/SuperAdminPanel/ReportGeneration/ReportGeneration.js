import React, { useState, useEffect } from 'react';
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
import Swal from 'sweetalert2';
import './ReportGeneration.css';
// import logo from '../assets/logo.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportGeneration = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState('');

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Tickets',
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)'],
      },
    ],
  };

  useEffect(() => {
    // Adding a fade-in effect to the graph on page load
    const graphSection = document.querySelector('.graph-section');
    if (graphSection) {
      graphSection.style.opacity = 0;
      setTimeout(() => {
        graphSection.style.transition = 'opacity 1s ease-in';
        graphSection.style.opacity = 1;
      }, 200);
    }
  }, []);

  const handleDownload = () => {
    if (!startDate || !endDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Date Range',
        text: 'Please select a valid date range before downloading the report.',
        confirmButtonText: 'OK',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Download Successful!',
      text: 'Your report has been downloaded successfully.',
      confirmButtonText: 'Great!',
    });
  };

  return (
    <div className="report-container">
      <div className="header-area">
        <h1>
          <span className="header-text">Report Generation</span>
          <span style={{ flexGrow: 1 }}></span>
          {/* <img src={logo} alt="Logo" className="header-logo" /> */}
        </h1>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label><strong>Status</strong></label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="styled-select"
          >
            <option value="" disabled>Select Ticket Status</option>
            <option value="OnHold">Ticket On Hold</option>
            <option value="Pending">Ticket Pending</option>
            <option value="Closed">Ticket Closing</option>
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
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="styled-select"
          >
            <option value="" disabled>Select Employee</option>
            <option value="emp1">Employee 1</option>
            <option value="emp2">Employee 2</option>
            <option value="emp3">Employee 3</option>
          </select>
        </div>

        <button onClick={handleDownload} className="download-btn animated-btn">
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
            plugins: {
              legend: {
                labels: {
                  color: '#333',
                },
              },
            },
          }}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
};

export default ReportGeneration;
