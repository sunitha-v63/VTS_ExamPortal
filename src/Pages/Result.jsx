import React, { useEffect, useState } from 'react';

 const data = [
    { label: "Total Trainees", value: 15 },
    { label: "Total Marks", value: 100 },
    { label: "No of Student Present", value: 10 },
    { label: "No of Student Absent", value: 5 },
  ];

const staticData = [
  { name: 'Kavya', trainer: 'Priya', tech: 20, practical: 40 },
  { name: 'Diya', trainer: 'Priya', tech: 10, practical: 50 },
  { name: 'Geetha', trainer: 'Priya', tech: 15, practical: 45 },
  { name: 'Keerthi', trainer: 'Priya', tech: 10, practical: 60 },
  { name: 'Sujitha', trainer: 'Priya', tech: 20, practical: 30 },
  { name: 'Ramu', trainer: 'Priya', tech: 25, practical: 60 },
  { name: 'Ram', trainer: 'Priya', tech: 15, practical: 30 },
];

const Result = () => {
  const [rows, setRows] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('technicalExamResults'));
    return stored && Array.isArray(stored) && stored.length > 0
      ? stored
      : staticData;
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('technicalExamResults', JSON.stringify(rows));
  }, [rows]);

  useEffect(() => {
    const savedName = localStorage.getItem('currentTraineeName');
    let updated = false;

    const patched = rows.map((entry) => {
      const practical = entry.practical ?? Math.floor(Math.random() * 21) + 50;
      const score = entry.score ?? entry.tech ?? 0;
      const trainer = entry.trainer || 'Priya';
      const name =
        entry.name && entry.name.toLowerCase() !== 'unknown'
          ? entry.name
          : savedName || 'Unknown';
      const total = score + practical;

      if (entry.practical === undefined || entry.name?.toLowerCase() === 'unknown') {
        updated = true;
      }

      return { ...entry, name, trainer, score, practical, total };
    });

    if (updated) {
      setRows(patched);
    }
  }, []); 

  const downloadCSV = () => {
    const header = [
      'S.No',
      'Trainee Name',
      'Trainer Name',
      'Technical (30)',
      'Practical (70)',
      'Total (100)',
    ];
    const csv = [
      header.join(','),
      ...rows.map((r, i) =>
        [i + 1, r.name, r.trainer, r.score, r.practical, r.total].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), {
      href: url,
      download: 'exam_scores.csv',
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const enterEditMode = () => setEditMode(true);

  const handleRowChange = (idx, field, value) => {
    const num = field === 'practical' || field === 'score' ? Number(value) : value;
    setRows((prev) =>
      prev.map((row, i) =>
        i === idx
          ? {
              ...row,
              [field]: num,
              total:
                field === 'practical'
                  ? num + (row.score || 0)
                  : field === 'score'
                  ? num + (row.practical || 0)
                  : row.total,
            }
          : row
      )
    );
  };

  const saveChanges = () => {
    for (const r of rows) {
      const practical = Number(r.practical);
      const score = Number(r.score);
      if (practical < 0 || practical > 70 || Number.isNaN(practical)) {
        alert(`Practical mark for ${r.name} must be between 0 and 70`);
        return;
      }
      if (score < 0 || score > 30 || Number.isNaN(score)) {
        alert(`Technical score for ${r.name} must be between 0 and 30`);
        return;
      }
    }
    setEditMode(false);
  };

  const Tablehead = { border: 'none', padding: '25px' };

  return (
    <>
     <div className="container mt-4">
      <div className="row justify-content-center">
        {data.map((item, index) => (
          <div
            key={index}
            className="col-6 col-md-6 col-lg-3 mb-3"
          >
            <div
              className="card text-center"
              style={{
                backgroundColor: "#e7f98f",
                border: "none",
                borderRadius: "8px",
                padding: "10px",
                height: "100%",
              }}
            >
              <div className="card-body">
                <p style={{ fontWeight: 500 }}>{item.label}</p>
                <h5 style={{ fontWeight: 700, margin: 0 }}>
                  {item.value}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* --container2 */}
    <div className="container py-4">
    <div className="table-responsive table-responsive-sm mt-4">
        <table
          className="table text-center w-100 result-table"
          style={{ borderCollapse: 'collapse', border: 'none' }}
        >
          <thead>
            <tr style={{ backgroundColor: '#201F31', color: '#000' }}>
              <th style={Tablehead}>S.No</th>
              <th style={Tablehead}>Trainee's Name</th>
              <th style={Tablehead}>Trainer Name</th>
              <th style={Tablehead}>
                Technical Marks <br />(Out of 30)
              </th>
              <th style={Tablehead}>
                Practical Marks <br />(Out of 70)
              </th>
              <th style={Tablehead}>Total Marks</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor:" #d7f96a", color: '#000' }}>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="6" style={Tablehead}>
                  No data yet
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i}>
                  <td style={Tablehead}>{i + 1}</td>
                  <td style={Tablehead}>{r.name}</td>
                  <td style={Tablehead}>
                    {editMode ? (
                      <input
                        value={r.trainer}
                        onChange={(e) =>
                          handleRowChange(i, 'trainer', e.target.value)
                        }
                        className="form-control form-control-sm text-center"
                        style={{ border: '1px solid #999', minWidth: 90 }}
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
                        onChange={(e) =>
                          handleRowChange(i, 'score', e.target.value)
                        }
                        className="form-control form-control-sm text-center"
                        style={{ border: '1px solid #999', maxWidth: 80 }}
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
                        onChange={(e) =>
                          handleRowChange(i, 'practical', e.target.value)
                        }
                        className="form-control form-control-sm text-center"
                        style={{ border: '1px solid #999', maxWidth: 80 }}
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

      <div className="d-flex justify-content-center gap-5 mt-3 me-5">
        <button className="btn btn-dark" onClick={downloadCSV}>
          Download
        </button>
        {editMode ? (
          <button className="btn btn-success" onClick={saveChanges}>
            Save
          </button>
        ) : (
          <button
            className="btn btn-secondary text-dark"
            onClick={enterEditMode}
            style={{ backgroundColor: '#d6ff63' }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default Result;
