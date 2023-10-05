import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Handle, Position } from 'reactflow';

const handleStyle = { right: -10 }; // This is just an example style. Adjust to fit your design.

function DateRangeNode({ data, isConnectable, onChange }) {
    const handleDateChange = (type, date) => {
        if(onChange) {
            onChange({
                ...data,
                [type]: date
            });
        }
    };

    return (
        <div className="react-flow__node-dateRange">
            
            <div>
                <DatePicker 
                    selected={data.startDate} 
                    onChange={(date) => handleDateChange('startDate', date)} 
                />
                to
                <DatePicker 
                    selected={data.endDate} 
                    onChange={(date) => handleDateChange('endDate', date)} 
                />
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

export default DateRangeNode;
