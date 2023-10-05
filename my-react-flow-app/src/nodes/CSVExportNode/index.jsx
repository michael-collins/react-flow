import React from 'react';
import { Handle, Position } from 'reactflow';
import './styles.css';
const handleStyle = {  };

function CSVExportNode({ data, isConnectable }) {
    const jsonToCsv = (json) => {
        if (!json || !Array.isArray(json) || json.length === 0) {
          return '';  // or handle it appropriately
        }
        const keys = Object.keys(json[0]);
        const values = json.map(obj => Object.values(obj));
        
        let csv = keys.join(",") + "\n";
        csv += values.map(value => value.join(",")).join("\n");
      
        return csv;
      };
      
    
  
    const downloadCSV = () => {
      const csv = jsonToCsv(data);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };
  
    return (
            <div className="csv-export-node" width={120} height={40}>
            <Handle 
                type="target" 
                position={Position.Left} 
                isConnectable={isConnectable} 
            />
            <div>
                <button onClick={downloadCSV}>Download CSV</button>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
        </div>
      );
  }
  export default CSVExportNode;
