import React, { useState, useEffect } from "react";

const API_URL = "https://api.restful-api.dev/objects";

// helper: parse details from the name string
const parseNameExtras = (fullName) => {
  let name = fullName;
  let extras = {};

  // split by commas
  const parts = fullName.split(",").map((p) => p.trim());

  if (parts.length > 1) {
    name = parts[0]; // base product name
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];

      if (/^\d+\s?GB$/i.test(part)) extras.capacity = part;
      else if (/^\d+\s?TB$/i.test(part)) extras.hardDisk = part;
      else if (/gen/i.test(part)) extras.generation = part;
      else if (/^\d{4}$/.test(part)) extras.year = part;
      else if (
        /blue|purple|red|white|black|brown|cloudy|green|gold|silver|elderberry/i.test(
          part
        )
      )
        extras.color = part;
      else extras.description = (extras.description || "") + " " + part;
    }
  }

  // inline capacity (like "64GB")
  const capacityMatch = name.match(/(\d+\s?(GB|TB))/i);
  if (capacityMatch) {
    extras.capacity = capacityMatch[0];
    name = name.replace(capacityMatch[0], "").trim();
  }

  // inline generation (like "4th Gen")
  const genMatch = name.match(/(\d+(st|nd|rd|th)\sGen)/i);
  if (genMatch) {
    extras.generation = genMatch[0];
    name = name.replace(genMatch[0], "").trim();
  }

  return { name, extras };
};

const Miscellaneous = () => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fieldList, setFieldList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();

        // normalize fields, prevent duplicates
        const allFields = new Set(["id", "name"]);
        result.forEach((item) => {
          if (item.data && typeof item.data === "object") {
            Object.keys(item.data).forEach((key) => {
              const cleanKey = key.trim().toLowerCase();

              if (cleanKey.includes("capacity")) {
                allFields.add("capacity");
              } else {
                allFields.add(cleanKey);
              }
            });
          }
        });

        const fieldArr = [
          "id",
          "name",
          ...Array.from(allFields).filter((f) => f !== "id" && f !== "name"),
        ];
        setFieldList(fieldArr);

        // format rows
        const formatted = result.map((item, index) => {
          let rec = {
            id: item.id || index + 1,
            name: item.name || "-",
          };

          // parse extras from name string
          if (item.name) {
            const { name, extras } = parseNameExtras(item.name);
            rec.name = name;
            rec = { ...rec, ...extras };
          }

          fieldArr.forEach((f) => {
            if (f === "id" || f === "name") return;

            if (!rec[f]) {
              if (f === "capacity") {
                // ✅ handle any "capacity" variation (Capacity GB, CAPACITY, etc.)
                const capKey = Object.keys(item.data || {}).find((k) =>
                  k.trim().toLowerCase().includes("capacity")
                );
                rec[f] = capKey ? item.data[capKey] : "-";
              } else {
                const foundKey = Object.keys(item.data || {}).find(
                  (k) => k.trim().toLowerCase() === f
                );
                rec[f] = foundKey ? item.data[foundKey] : "-";
              }
            }
          });

          return rec;
        });

        setData(formatted);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (recordIndex, field, value) => {
    const updated = [...data];
    updated[recordIndex][field] = value;
    setData(updated);
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-nav">
        <div className="dashboard-nav-inner">
          <div className="nav-left">
            <div className="back-button-wrapper">
              <button className="back-btn" onClick={() => window.history.back()}>
                Back
              </button>
            </div>
          </div>

          <div className="nav-center">
            <h2 className="dashboard-title">Miscellaneous</h2>
          </div>

          <div className="nav-right">
            <div className="edit-button-wrapper">
              <button
                className="edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-content">
        <div className="miscellaneous-wrapper">
          {loading ? (
            <p>Loading data...</p>
          ) : data.length === 0 ? (
            <p>No records found.</p>
          ) : (
            <table className="miscellaneous-table">
              <thead>
                <tr>
                  {fieldList.map((field, idx) => (
                    <th key={idx}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((record, rowIdx) => (
                  <tr key={rowIdx}>
                    {fieldList.map((fieldKey, colIdx) => (
                      <td key={colIdx}>
                        {isEditing &&
                        (fieldKey === "color" || fieldKey === "capacity") ? (
                          <input
                            type="text"
                            value={record[fieldKey] || ""}
                            onChange={(e) =>
                              handleInputChange(rowIdx, fieldKey, e.target.value)
                            }
                          />
                        ) : fieldKey === "capacity" &&
                          record[fieldKey] !== "-" ? (
                          <span className="badge">{record[fieldKey]}</span>
                        ) : (
                          record[fieldKey] || "-"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Miscellaneous;
