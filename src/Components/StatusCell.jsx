import { useState } from "react";


const STATUS_COLORS = {
  'Resolved': 'green',
  'Pending': 'yellow',
  'In Review': 'orange',
  'Closed':'purple',
  'Deployed': 'green',
  // Add more status-to-color mappings as needed
};
// Resolved

const BORDER_COLORS = {
  'Pending': '  border-[#FB773F] text-orange-500 ',
  'Resolved': 'text-green-500 border-[#1ce14a]  ',
  'In Review': ' text-black/70 border-[#00000070]',
  // Add more status-to-color mappings as needed
};

export const ColorIcon = ({ color, ...props }) => (
  <div
    className={`w-[12px] h-[12px] rounded-[3px] `}
    // style={{ backgroundColor: color }}
  />
);

const StatusCell = ({ getValue, row, column, table }) => {
  
  const { name, color } = getValue() || {};
  
  const { updateData } = table.options.meta;
  const [isOpen, setIsOpen] = useState(false);

  // Determine the background color based on status name
  const statusColor = STATUS_COLORS[name] || color || 'transparent';
  // ColorBorder, Status, TextColor

  return (
    <div className="relative poppins-regular">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full text-left p-1.5  text-black ${ BORDER_COLORS[name]}`}

        
      >
         <div className="w-[70px]  sm:w-[100px] mdm:w-[120px] text-center col-span-2 ">
            <p className={`   ${ BORDER_COLORS[name]}  cursor-pointer  border-[1px]    rounded-2xl px-3 py-2  `}  > {name}</p>
          </div>
       
      </div>

   


    </div>
  );
};

export default StatusCell;
