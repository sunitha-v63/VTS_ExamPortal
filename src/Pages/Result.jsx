import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
  { label: "Total Trainees", value: 15 },
  { label: "Total Marks", value: 100 },
  { label: "No of Student Present", value: 10 },
  { label: "No of Student Absent", value: 5 },
];

const Result = () => {
  const [rows, setRows] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('technicalExamResults'));
    return Array.isArray(stored) ? stored : [];
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('technicalExamResults', JSON.stringify(rows));
  }, [rows]);
  useEffect(() => {
    const savedName = localStorage.getItem('currentTraineeName') || '-';
    let updated = false;

    const patched = rows.map(entry => {
      const practical = entry.practical ?? Math.floor(Math.random() * 21) + 50;
      const score = entry.score ?? entry.tech ?? 0;
      const trainer = entry.trainer || '-';

      let name = entry.name && entry.name.toLowerCase() !== 'unknown'
        ? entry.name
        : savedName;

      if (!name.trim()) name = '-';

      const total = score + practical;

      if (entry.practical === undefined || entry.name?.toLowerCase() === 'unknown') {
        updated = true;
      }

      return { ...entry, name, trainer, score, practical, total };
    });

    if (updated) setRows(patched);
  }, []);

  const downloadCSV = () => {
    const header = ['S.No', 'Trainee Name', 'Trainer Name', 'Technical (30)', 'Practical (70)', 'Total (100)'];
    const csvRows = [
      header.join(','),
      ...rows.map((r, i) => [i + 1, r.name, r.trainer, r.score, r.practical, r.total].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: 'exam_scores.csv' });
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const Tablehead = { border: 'none', padding: '25px' };
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          {data.map((item, idx) => (
            <div key={idx} className="col-6 col-md-6 col-lg-3 mb-3">
              <div className="card text-center" style={{ backgroundColor: "#e7f98f", border: "none", borderRadius: "8px", padding: "10px", height: "100%" }}>
                <div className="card-body">
                  <p style={{ fontWeight: 500 }}>{item.label}</p>
                  <h5 style={{ fontWeight: 700, margin: 0 }}>{item.value}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container py-4">
        <div className="table-responsive table-responsive-sm mt-4">
          <table className="table text-center w-100 result-table" style={{ borderCollapse: 'collapse', border: 'none' }}>
            <thead>
              <tr style={{ backgroundColor: '#201F31', color: '#000' }}>
                <th style={Tablehead}>S.No</th>
                <th style={Tablehead}>Trainee's Name</th>
                <th style={Tablehead}>Trainer Name</th>
                <th style={Tablehead}>Technical Marks <br />(Out of 30)</th>
                <th style={Tablehead}>Practical Marks <br />(Out of 70)</th>
                <th style={Tablehead}>Total Marks</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#d7f96a", color: '#000' }}>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="6" style={Tablehead}>No data yet</td>
                </tr>
              ) : (
                rows.map((r, i) => (
                  <tr key={i}>
                    <td style={Tablehead}>{i + 1}</td>
                    <td style={Tablehead}>
                      {editMode ? (
                        <input
                          value={r.name}
                          onChange={(e) => handleRowChange(i, 'name', e.target.value)}
                          className="form-control form-control-sm text-center"
                        />
                      ) : (
                        r.name
                      )}
                    </td>
                    <td style={Tablehead}>
                      {editMode ? (
                        <input
                          value={r.trainer}
                          onChange={(e) => handleRowChange(i, 'trainer', e.target.value)}
                          className="form-control form-control-sm text-center"
                        />
                      ) : (
                        r.trainer
                      )}
                    </td>
                    <td style={Tablehead}>
                      {editMode ? (
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={r.score}
                          onChange={(e) => handleRowChange(i, 'score', e.target.value)}
                          className="form-control form-control-sm text-center"
                          style={{ maxWidth: 80 }}
                        />
                      ) : (
                        r.score
                      )}
                    </td>
                    <td style={Tablehead}>
                      {editMode ? (
                        <input
                          type="number"
                          min="0"
                          max="70"
                          value={r.practical}
                          onChange={(e) => handleRowChange(i, 'practical', e.target.value)}
                          className="form-control form-control-sm text-center"
                          style={{ maxWidth: 80 }}
                        />
                      ) : (
                        r.practical
                      )}
                    </td>
                    <td style={Tablehead}>{r.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center gap-4 mt-4">
          <button className="btn btn-dark" onClick={downloadCSV}>Download</button>
          <button
            className="btn btn-secondary text-dark"
            style={{ backgroundColor: '#d6ff63' }}
            onClick={() => {
              const confirmExit = window.confirm("Are you sure you want to exit?");
              if (confirmExit) {
                localStorage.removeItem('technicalExamResults');
                setRows([]);

                const role = localStorage.getItem('userRole');
                navigate(role === 'trainee' ? '/exam' : '/');
              }
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
