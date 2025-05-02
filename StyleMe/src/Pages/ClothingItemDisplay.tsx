const header = import.meta.env.VITE_API_URL
import { useState, useEffect } from 'react';

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

export default ClothingItemsDisplay