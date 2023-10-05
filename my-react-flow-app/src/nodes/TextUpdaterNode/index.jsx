import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = {};

function TextUpdaterNode({ data, isConnectable }) {
  const [inputFields, setInputFields] = useState([{ id: Date.now() }]);

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const addInputField = useCallback(() => {
    setInputFields((fields) => [...fields, { id: Date.now() }]);
  }, []);

  const removeInputField = useCallback((idToRemove) => {
    setInputFields((fields) => fields.filter(field => field.id !== idToRemove));
  }, []);

  return (
    <div className="text-updater-node card w-96 bg-base-100 shadow-xl">
    <div className="card-body">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      {inputFields.map((field, idx) => (
        <div key={field.id}>
          <label htmlFor={`text-${idx}`}>Text:</label>
          <input id={`text-${idx}`} name={`text-${idx}`} onChange={onChange} className="nodrag" />
          <button className="btn btn-square btn-neutral remove-btn" onClick={() => removeInputField(field.id)}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button className="btn btn-neutral" onClick={addInputField}>Add</button>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
    </div>
  );
}

export default TextUpdaterNode;
