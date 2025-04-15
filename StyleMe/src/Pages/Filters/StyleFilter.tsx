import { useState, useEffect } from 'react';

const header = import.meta.env.VITE_API_URL;

export function StyleFilterSidebar ({ onFilterSelect, selectedStyles}: { onFilterSelect: (color: string) => void, selectedStyles: string[]}) {
    const [data, setData] = useState<{ id: number; clothingFit: string }[]>([]);
    useEffect (() =>{
        fetch(header + "/ClothingItem/getstyles")
            .then(res => 

                // http response
                res.json())

            .then (data => {

                // extract data
                setData(data)
            })
    }, [])
    
    // When elements are loading
    if (data.length === 0){
        return <p>Loading...</p>;
    }

    return (
        <div style={{padding: '10px' }}>
           <div>
                <h1 style={{margin: '10px'}}>Style</h1>

            </div>
            <div>
                {data.map(item => (
                    <button
                        style={{
                            backgroundColor: selectedStyles.includes(item.clothingFit) ? "lightblue" : 'transparent',
                        }} 
                        key={item.id} 
                        onClick={() => onFilterSelect(item.clothingFit)}
                    >
                        {item.clothingFit}
                    </button>
                ))}
            </div>
        </div>
    )
}