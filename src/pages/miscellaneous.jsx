import React, { useState } from 'react';

const sampleData = [
  {
    SecurityGroupRuleId: "sgr-0e27b9dcb3c9483c5",
    GroupId: "sg-01556ef6907b15966",
    GroupOwnerId: "123456789",
    IsEgress: false,
    IpProtocol: "tcp",
    FromPort: 443,
    ToPort: 443,
    CidrIpv4: "203.29.178.38/32",
    Description: "tristan@mycompany.com"
  },
  {
    SecurityGroupRuleId: "sgr-0dc5315297ec4343a",
    GroupId: "sg-01556ef6907b15966",
    GroupOwnerId: "123456789",
    IsEgress: true,
    IpProtocol: "tcp",
    FromPort: 443,
    ToPort: 443,
    CidrIpv4: "N/A",
    Description: "ToEc2Https"
  }
];

const fieldLabels = {
  SecurityGroupRuleId: "Rule ID",
  GroupId: "Group ID",
  GroupOwnerId: "Owner ID",
  IsEgress: "Is Egress",
  IpProtocol: "Protocol",
  FromPort: "From Port",
  ToPort: "To Port",
  CidrIpv4: "IPv4",
  Description: "Description"
};

const Miscellaneous = () => {
  const [data, setData] = useState(sampleData);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    SecurityGroupRuleId: "",
    GroupId: "",
    GroupOwnerId: "",
    IsEgress: false,
    IpProtocol: "",
    FromPort: "",
    ToPort: "",
    CidrIpv4: "",
    Description: ""
  });

  const handleInputChange = (recordIndex, field, value) => {
    const updated = [...data];
    updated[recordIndex][field] = value;
    setData(updated);
  };

  const handleNewInputChange = (field, value) => {
    setNewRecord({ ...newRecord, [field]: value });
  };

  const addRecord = () => {
    setData([...data, newRecord]);
    setNewRecord({
      SecurityGroupRuleId: "",
      GroupId: "",
      GroupOwnerId: "",
      IsEgress: false,
      IpProtocol: "",
      FromPort: "",
      ToPort: "",
      CidrIpv4: "",
      Description: ""
    });
    setShowModal(false);
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
              <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-content">
        <div className="miscellaneous-wrapper">
          <table className="miscellaneous-table horizontal-layout">
            <thead>
              <tr>
                <th>Field</th>
                {data.map((_, idx) => (
                  <th key={idx}>Record {idx + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(fieldLabels).map((fieldKey) => (
                <tr key={fieldKey}>
                  <td className="field-label">{fieldLabels[fieldKey]}</td>
                  {data.map((record, idx) => (
                    <td key={idx}>
                      {isEditing ? (
                        fieldKey === "IsEgress" ? (
                          <select
                            value={record[fieldKey]}
                            onChange={(e) =>
                              handleInputChange(idx, fieldKey, e.target.value === "true")
                            }
                          >
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={record[fieldKey]}
                            onChange={(e) =>
                              handleInputChange(idx, fieldKey, e.target.value)
                            }
                          />
                        )
                      ) : (
                        record[fieldKey]?.toString()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="center-button">
            <button className="add-record-btn" onClick={() => setShowModal(true)}>
              + Add New Record
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Record</h3>
            {Object.keys(fieldLabels).map((key) => (
              <div key={key} className="modal-field">
                <label>{fieldLabels[key]}</label>
                {key === "IsEgress" ? (
                  <select
                    value={newRecord[key]}
                    onChange={(e) => handleNewInputChange(key, e.target.value === "true")}
                  >
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={newRecord[key]}
                    onChange={(e) => handleNewInputChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={addRecord}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Miscellaneous;
