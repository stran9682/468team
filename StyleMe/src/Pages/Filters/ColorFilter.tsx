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
        <div>
             
            <h1 style={{margin: '10px'}} className='text-black text-5xl'>color</h1>
            <div>
                {data.map(item => (
                    <button
                        style={{
                            backgroundColor: selectedColors.includes(item.clothingColor) ? "rgb(219 234 254)" : 'transparent',
                        }} 
                        key={item.id} 
                        onClick={() => onFilterSelect(item.clothingColor)}
                        className='text-black'
                    >
                        {item.clothingColor}
                    </button>
                ))}
            </div>
        </div>
    )
}