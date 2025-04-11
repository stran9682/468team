import { useState, useEffect } from 'react';
const header = import.meta.env.VITE_API_URL

export function ColorFilterSidebar ({ onFilterSelect, selectedColors }: { onFilterSelect: (color: string) => void, selectedColors: string[]}) {
    const [data, setData] = useState<{ id: number; clothingColor: string }[]>([]);
    useEffect (() =>{
        fetch(header+"/ClothingItem/getcolors")
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
        <div style={{padding: '10px'}}>
             <div>
                <h1 style={{margin: '10px'}}>Color</h1>

            </div>
            <div>
                {data.map(item => (
                    <button
                        style={{
                            backgroundColor: selectedColors.includes(item.clothingColor) ? "lightblue" : 'transparent',
                        }} 
                        key={item.id} 
                        onClick={() => onFilterSelect(item.clothingColor)}
                    >
                        {item.clothingColor}
                    </button>
                ))}
            </div>
        </div>
    )
}