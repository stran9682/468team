function OutfitDisplay ({ClothingItems} : {ClothingItems : any[]}){
    return (
        <div className="flex flex-row overflow-x-auto space-x-4 pb-2">
            {ClothingItems.map((item: any) => (
                <div key={item.id} className="w-1/4 shrink-0">
                    <img src={`${item.image}`} alt={item.name} className='w-full h-auto' />
                    <h2 className='text-black text-lg'>{item.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default OutfitDisplay