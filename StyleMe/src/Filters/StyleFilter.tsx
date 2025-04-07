import { useState, useEffect } from 'react';

export function StyleFilterSidebar ({ onFilterSelect, selectedStyles, panel }: { onFilterSelect: (color: string) => void, selectedStyles: string[], panel: (num:number ) => void }) {
    const [data, setData] = useState<{ id: number; clothingFit: string }[]>([]);
    useEffect (() =>{
        fetch("http://localhost:8080/ClothingItem/getstyles")
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
        <div style={{ width: '33%', padding: '10px' }}>
           <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 style={{margin: '10px'}}>Style</h1>
                <h2 onClick={() => panel(1)}>next</h2>

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