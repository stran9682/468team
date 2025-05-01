import { useState, useEffect } from 'react';
import { ColorFilterSidebar } from './Filters/ColorFilter';
import { StyleFilterSidebar } from './Filters/StyleFilter';
import { TypeFilterSidebar } from './Filters/TypeFilter';
import UploadFileComponent from './UploadFileComponent'

const header = import.meta.env.VITE_API_URL

function ClothingItemsDisplay ({colors, fits, types, addClothingItem} : {colors : string[], fits : string[], types : string[], addClothingItem : (item : any) => void}) {
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
            const cartesian = (...a: any[][]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
            const filterRequests = [];

            const colorList = colors.length ? colors : [""];
            const fitList = fits.length ? fits : [""];
            const typeList = types.length ? types : [""];

            const combinations = cartesian(colorList, fitList, typeList);

            for (const [color, fit, type] of combinations) {
                const url = `${header}/ClothingItem/?color=${color}&fit=${fit}&type=${type}`;
                filterRequests.push(fetch(url).then(res => res.json()));
            }

            // also vibe coding...
            Promise.all(filterRequests)
                .then(results => {
                    setData(results.flat());
                })
                .catch(error => console.error("Error fetching filtered items:", error));
        }
    }, [colors, fits, types]);

    return (
        data.length !== 0 ? 
            <div className='grid grid-cols-4 gap-2'>
                {data.map(item =>  
                    <div key={item.id} className='aspect-1/1.618 box-border'>
                        <img src={`${item.image}`} onClick={() => addClothingItem(item)}/>
                            
                        <h2 className='text-black text-lg'>{item.name}</h2>
                        {item.color.clothingColor}
                        <h2>{item.style.clothingFit}</h2>
                        <h2>{item.price}</h2>
                    </div>
                )}
            </div>
        : 'No items found for this filter combo'
    )
}

export function FilterComponent () {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedFits, setSelectedFits] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const [filterState, setFilterState] = useState<boolean>(false);
    const [aiPanelState, setAiPanelState] = useState<boolean>(false);

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

    const [clothingItems, setClothingItems] = useState<any[]>([]);
    const addClothingItem = (item: any) => {
        if (!clothingItems.some(existingItem => existingItem.id === item.id)) {
            setClothingItems(prevItems => [...prevItems, item]);
        }
    }

    const removeClothingItem = (item:any) => {
        setClothingItems(prev => prev.filter(i => i.id != item.id))
    }

    const saveClothingItems = () => {
        let list: any[] = [];
        clothingItems.forEach(element => {
            list.push(element.id);
        });

        const auth = { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') };
        fetch(header + "/UserData/useroutfits", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...auth
            },
            body: JSON.stringify(list)
        })
    }

    return (
        <>  
            {filterState ? 
                <>
                    <div className='w-1/3 z-20 fixed bg-white overflow-y-scroll top-0 bottom-0 right-0'>
                        <ColorFilterSidebar onFilterSelect={toggleFilter} selectedColors={selectedColors}/>
                        <StyleFilterSidebar onFilterSelect={toggleFit} selectedStyles={selectedFits}/>
                        <TypeFilterSidebar onFilterSelect={toggleType} selectedTypes={selectedTypes}/>
                    </div>

                    <div className='h-screen w-screen z-10 top-0 bottom-0 right-0 fixed backdrop-blur-sm' onClick={() => setFilterState(false)}></div>
                </>
            : null}

            {aiPanelState ? 
                <>
                    <UploadFileComponent aiPanelState={setAiPanelState} setClothingItems={setClothingItems}/> 
                </> : 
                null
            }

            <h1 className='text-black text-6xl mt-10 mb-10'>Catalog</h1>

            <div className='flex text-black gap-4'>
                <div className='w-3/4'>
                    <h3 onClick={() => setFilterState(!filterState)} className='text-black'>Filters</h3>
                    <h3 onClick={() => setAiPanelState(!aiPanelState)}>AI Assist</h3>
                    <ClothingItemsDisplay colors={selectedColors} fits={selectedFits} types={selectedTypes} addClothingItem={addClothingItem}/>
                </div>

                <div className='w-1/4'>
                    Your outfit!

                    {clothingItems.length !== 0 ? 
                        <>
                            <h1 onClick={() => saveClothingItems()}>save!</h1>

                            {clothingItems.map(item => 
                                <div onClick={() => removeClothingItem(item)}>
                                    <img src={`${item.image}`}/>
                                    {item.name}
                                </div>
                            )}
                        </>
                    :
                        <div>add a clothing item to begin!</div>
                    }
                </div>
            </div>
        </>
    );
}