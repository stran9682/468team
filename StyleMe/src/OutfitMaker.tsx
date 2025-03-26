import { useState, useEffect } from 'react';

function FilterSidebar ({ onFilterSelect, selectedColors }: { onFilterSelect: (color: string) => void, selectedColors: string[] }) {
    const [data, setData] = useState<{ id: number; clothingColor: string }[]>([]);
    useEffect (() =>{
        fetch("http://localhost:8080/ClothingItem/getcolors")
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
            <h1 style={{margin: '10px'}}>Color</h1>
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

function ClothingItemsDisplay ({colors} : {colors : string[]}) {
    const [data, setData] = useState([]);

    useEffect (() =>{
        if (colors.length === 0){

            fetch("http://localhost:8080/ClothingItem/")
            .then(res =>  res.json())    
            .then (data => {
                // extract data
                setData(data)
            });
        }
        else {
            Promise.all(
                colors.map(color =>
                    fetch(`http://localhost:8080/ClothingItem/getbycolor/${color}`)
                        .then(res => res.json())
                )
            )
            .then(results => setData(results.flat()))
        }
        
    }, [colors])

    return (
        <div
            style={
                {
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '66.666%'
                }
            }
        >
            {data.map(item => (
                <div
                    key={item.id}
                    style={{
                        backgroundImage: `url(${item.image})`,
                        width: '33.33%',
                        height: '400px',
                        backgroundSize: "cover"
                    }}
                >
                    {item.name}
                </div>
            ))}
        </div>
    )
}

export function FilterComponent () {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const toggleFilter = (color: string) => {
        setSelectedColors(prevColors =>
            prevColors.includes(color)
                ? prevColors.filter(c => c !== color) // Remove if already selected
                : [...prevColors, color] // Add if not selected
        );
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <FilterSidebar onFilterSelect={toggleFilter} selectedColors={selectedColors}/>
            <ClothingItemsDisplay colors={selectedColors}/>
        </div>
    );
}