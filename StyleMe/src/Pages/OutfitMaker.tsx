import { useState } from 'react';
import { ColorFilterSidebar } from './Filters/ColorFilter';
import { StyleFilterSidebar } from './Filters/StyleFilter';
import { TypeFilterSidebar } from './Filters/TypeFilter';
import UploadFileComponent from './UploadFileComponent'
import ClothingItemsDisplay from './ClothingItemDisplay';
import { FaConciergeBell, FaRegSave } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";

const header = import.meta.env.VITE_API_URL

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
        if (!localStorage.getItem('jwtToken')){
            return
        }


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

        setClothingItems([])
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

            <div className='grid grid-cols-4 text-black gap-4 h-screen'>
                <div className='col-span-3 overflow-y-auto'>
                    <h1 className='text-black text-2xl mb-2 '>Catalog</h1>

                    <div className='flex gap-6 mb-4'>
                        <div className='flex gap-1 text-base' onClick={() => setFilterState(!filterState)}>
                            <h3>Show Filters</h3>
                            <VscSettings className='relative top-1'/>
                        </div>


                        <div className='flex gap-1 text-base' onClick={() => setAiPanelState(!aiPanelState)}>
                            <h3 >AI Assist</h3>
                            <FaConciergeBell className='relative top-1'/>
                        </div>
                    </div>
                    <ClothingItemsDisplay colors={selectedColors} fits={selectedFits} types={selectedTypes} addClothingItem={addClothingItem}/>
                </div>

                <div className='col-span-1 flex flex-col h-screen'>
                    <div>
                        <h1 className='text-black text-2xl mb-2'>Your Outfit</h1>

                        {clothingItems.length !== 0 ? (
                            <div className='flex gap-1 text-base mb-4'>
                                <h1 onClick={() => saveClothingItems()} >save!</h1>
                                <FaRegSave className='relative top-1'/>
                            </div>
                        ) : (
                            <div className='text-base'>add a clothing item to begin!</div>
                        )}
                    </div>

                    <div className='overflow-y-auto'>
                        {clothingItems.length !== 0 ? (
                            clothingItems.map(item => (
                                <div key={item.id} onClick={() => removeClothingItem(item)} className='mb-2'>
                                    <img src={`${item.image}`} alt={item.name} className='w-full h-auto' />
                                    <p>{item.name}</p>
                                </div>
                            ))
                        ) : (
                            null
                        )}
                    </div>
                        

                </div>
            </div>
        </>
    );
}