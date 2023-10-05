import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './styles.css';

const handleStyle = {  };

function StringListNode({ data, isConnectable, onChange }) {
    console.log("Rendering StringListNode", data);

    const addItem = useCallback(() => {
        if (onChange) {
            onChange({ ...data, items: [...data.items, ''] });
        }
    }, [data, onChange]);

    const removeItem = useCallback((index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        if (onChange) {
            onChange({ ...data, items: newItems });
        }
    }, [data, onChange]);

    const updateItem = useCallback((index, value) => {
        const newItems = [...data.items];
        newItems[index] = value;
        if (onChange) {
            onChange({ ...data, items: newItems });
        }
    }, [data, onChange]);

    return (
        <div className="string-list-node">
            <Handle 
                type="target" 
                position={Position.Left} 
                isConnectable={isConnectable} 
            />
            {data.items.length === 0 ? (
                <div>Default Text Here</div>
            ) : (data.items.map((item, index) => (
                <div key={index} className="string-list-node-item">
                    <label htmlFor={`string-item-${index}`}>Item {index + 1}:</label>
                    <input 
                        id={`string-item-${index}`} 
                        name={`string-item-${index}`} 
                        value={item} 
                        onChange={(e) => updateItem(index, e.target.value)} 
                        className="nodrag string-list-node input"
                    />
                    {/* <button onClick={() => removeItem(index)}>Remove</button> */}
                </div>
            )))}
            <button onClick={addItem} className="add-item">Add Item</button>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
        </div>
    );
};
export default StringListNode;
