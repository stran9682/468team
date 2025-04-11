import { useState, useEffect } from 'react';
import { ColorFilterSidebar } from './Filters/ColorFilter';
import { StyleFilterSidebar } from './Filters/StyleFilter';
import { TypeFilterSidebar } from './Filters/TypeFilter';

const header = import.meta.env.VITE_API_URL

function ClothingItemsDisplay ({colors, fits, types} : {colors : string[], fits : string[], types : string[]}) {
    const [data, setData] = useState<any[]>([]);

    useEffect (() =>{
        if (colors.length === 0 && fits.length === 0 && types.length === 0) {

            fetch(header + "/ClothingItem/")
            .then(res =>  res.json())    
            .then (data => {
                // extract data
                setData(data)
            });
        }
        else {

            // vibe coding...
            const filterRequests = [];
            for (const color of (colors.length ? colors : [""])) {
                for (const fit of (fits.length ? fits : [""])) {
                    for (const type of (types.length ? types : [""])) {
                        const url = `${header}/ClothingItem/?color=${color}&fit=${fit}&type=${type}`;
                        console.log("Fetching:", url);
                        filterRequests.push(fetch(url).then(res => res.json()));
                    }
                }
            }
    
            // also vibe coding...
            Promise.all(filterRequests)
                .then(results => {
                    console.log("Filtered data received:", results);
                    setData(results.flat());
                })
                .catch(error => console.error("Error fetching filtered items:", error));
        }
    }, [colors, fits, types]);


    
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
                        backgroundSize: "cover",
                        color:'white',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <h2 className='text-white text-lg text-shadow-lg'>{item.name}</h2>
                </div>
            ))} 
        </div>
    )
}

export function FilterComponent () {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedFits, setSelectedFits] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const toggleFilter = (color: string) => {
        setSelectedColors(prevColors =>
            prevColors.includes(color)
                ? prevColors.filter(c => c !== color) // Remove if already selected
                : [...prevColors, color] // Add if not selected
        );
    };

    const toggleFit = (fit: string) => {
        setSelectedFits(prevFits =>
            prevFits.includes(fit)
                ? prevFits.filter(f => f !== fit) // Remove if already selected
                : [...prevFits, fit] // Add if not selected
        );
    };

    const toggleType = (type: string) => {
        setSelectedTypes(prevTypes =>
            prevTypes.includes(type)
                ? prevTypes.filter(t => t !== type) // Remove if already selected
                : [...prevTypes, type] // Add if not selected
        );
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div style={{width: '33%'}}>
                <ColorFilterSidebar onFilterSelect={toggleFilter} selectedColors={selectedColors}/>
                <StyleFilterSidebar onFilterSelect={toggleFit} selectedStyles={selectedFits}/>
                <TypeFilterSidebar onFilterSelect={toggleType} selectedTypes={selectedTypes}/>
            </div>
                
            <ClothingItemsDisplay colors={selectedColors} fits={selectedFits} types={selectedTypes} />
        </div>
    );
}