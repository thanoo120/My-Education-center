import React from "react";

export default function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="col-md-3 mb-3">
      <div className="rounded shadow-sm p-3 text-center bg-light">
        <div className="fs-4 mb-2" style={{ color }}>{icon}</div>
        <h6 className="text-uppercase text-secondary fw-semibold">{title}</h6>
        <h3 className="fw-bold mb-0">{value}</h3>
      </div>
    </div>
  );
}
