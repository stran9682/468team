import { useState, useEffect } from 'react';
import { ColorFilterSidebar } from './Filters/ColorFilter';
import { StyleFilterSidebar } from './Filters/StyleFilter';
import { TypeFilterSidebar } from './Filters/TypeFilter';

function ClothingItemsDisplay ({colors, fits, types} : {colors : string[], fits : string[], types : string[]}) {
    const [data, setData] = useState([]);

    useEffect (() =>{
        if (colors.length === 0 && fits.length === 0 && types.length === 0) {

            fetch("http://worker:8080/ClothingItem/")
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
                        const url = `http://worker:8080/ClothingItem/?color=${color}&fit=${fit}&type=${type}`;
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
                    <h2>{item.name}</h2>
                </div>
            ))}
        </div>
    )
}

export function FilterComponent () {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedFits, setSelectedFits] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

   const [panel, setPanel] = useState(1);

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
            {panel === 1 && (
                <ColorFilterSidebar onFilterSelect={toggleFilter} selectedColors={selectedColors} panel={setPanel} />
            )}
            {panel === 2 && (
                <StyleFilterSidebar onFilterSelect={toggleFit} selectedStyles={selectedFits} panel={setPanel} />
            )}
            {panel === 3 && (
                <TypeFilterSidebar onFilterSelect={toggleType} selectedTypes={selectedTypes} panel={setPanel} />
            )}
            <ClothingItemsDisplay colors={selectedColors} fits={selectedFits} types={selectedTypes} />
        </div>
    );
}