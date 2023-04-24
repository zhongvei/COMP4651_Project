import React from 'react';
import { useStateContext } from '../../context';

const Generate = () => {

    const { generate } = useStateContext();

    return (
        <div className='flex justify-center items-center'>
            <button className='bg-blue-600 p-2 rounded' onClick={()=>{generate();}}>
                Generate
            </button>
        </div>
    )
};

export default Generate;