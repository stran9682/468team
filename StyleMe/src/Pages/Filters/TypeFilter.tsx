import { useState, useEffect } from 'react';

const header = import.meta.env.VITE_API_URL

export function TypeFilterSidebar ({ onFilterSelect, selectedTypes}: { onFilterSelect: (color: string) => void, selectedTypes: string[]}) {
    const [data, setData] = useState<{ id: number; clothingItemType: string }[]>([]);
    useEffect (() =>{
        fetch( header +'/ClothingItem/gettypes')
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
                <h1 style={{margin: '10px'}}>Type</h1>
            </div>
            <div>
                {data.map(item => (
                    <button
                        style={{
                            backgroundColor: selectedTypes.includes(item.clothingItemType) ? "lightblue" : 'transparent',
                        }} 
                        key={item.id} 
                        onClick={() => onFilterSelect(item.clothingItemType)}
                    >
                        {item.clothingItemType}
                    </button>
                ))}
            </div>
        </div>
    )
}