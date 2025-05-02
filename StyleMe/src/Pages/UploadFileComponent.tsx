import { useState } from 'react';

const header = import.meta.env.VITE_FLASK_URL

function UploadFileComponent ({aiPanelState, setClothingItems}: {aiPanelState : (state : boolean) => void, setClothingItems : (items : any[]) => void} ) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            console.log('Uploading file...');
        
            const formData = new FormData();
            formData.append('file', file);
        
            try {
                // You can write the URL of your server or any other endpoint used for file upload
                const result = await fetch(header +"/", {
                    method: 'POST',
                    body: formData,
                });
        
                const data = await result.json();

                setClothingItems(data)
                aiPanelState(false)
        
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <div className='z-20 mx-auto fixed inset-0 items-center content-center text-black w-1/3 '>
                <div className=' bg-white p-4 rounded-2xl'>
                    <div className="max-w-md mx-auto w-full">
                        <h1 className='text-3xl mb-2'>Need some outfit help? </h1>
                        <div className=' mb-2'>
                            Let's help you out! Upload a picture with your arms off to your side, and we'll take of the rest.
                        </div>
                        <input type="file" onChange={handleFileChange} className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded-2xl" />
                    </div>

                    {file && (
                        <button onClick={handleUpload} className="bg-purple-300 w-full mt-2">
                            Upload image
                        </button>
                    )}
                </div>
            </div>
            <div className='h-screen w-screen z-10 top-0 bottom-0 right-0 fixed backdrop-blur-sm' onClick={() => aiPanelState(false)}></div>
        </>
    )
}

export default UploadFileComponent