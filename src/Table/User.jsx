import { useEffect, useState } from "react";

const User = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  return (
    <div className=' flex  my-3 text-[9px] sm:text-[10px] mdm:text-[12px] w-[150px]'>

    <img className=' hidden sm:block size-[35px] Avatar' src={`/Media/${initialValue.img}`} alt="" />
    <div className=' flex flex-1 flex-col  ml-2'>
      <div className='flex flex-1 justify-between  items-center'>
        <p className='poppins-semibold '>{initialValue.name}</p>
      </div>
      <div className='flex justify-between  text-black/50  text-[10px]'>
        <p>{initialValue.username}</p>
      
      </div>
    </div>
  </div>
  );
};

export default User;
