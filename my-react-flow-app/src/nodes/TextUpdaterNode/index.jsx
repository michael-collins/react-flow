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
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      {inputFields.map((field, idx) => (
        <div key={field.id}>
          <label htmlFor={`text-${idx}`}>Text:</label>
          <input id={`text-${idx}`} name={`text-${idx}`} onChange={onChange} className="nodrag" />
          <button onClick={() => removeInputField(field.id)}>x</button>
        </div>
      ))}
      <button onClick={addInputField}>Add</button>
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

export default TextUpdaterNode;
