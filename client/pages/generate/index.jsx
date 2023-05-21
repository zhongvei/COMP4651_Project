import React from 'react';
import { useStateContext } from '../../context';

const Generate = () => {

    const { generate, isLoading } = useStateContext();
    const [contractLoading, setContractLoading] = React.useState(false);
    React.useEffect(() => {
        setContractLoading(isLoading);
    }, [isLoading])

    if (contractLoading) {
        return (
            <div className='flex justify-center items-center'>
                <button className='bg-blue-600 p-2 rounded' disabled>
                    Loading...
                </button>
            </div>
        )
    }

    return (
        <div className='flex justify-center items-center'>
            <button className='bg-blue-600 p-2 rounded' onClick={()=>{generate();}}>
                Generate
            </button>
        </div>
    )
};

export default Generate;