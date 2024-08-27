const getImageUrl = (imgAPIResponse)=>{
    const base64Data = imgAPIResponse.data;
    const mimeType =base64Data.type;

    return `data:${mimeType};base64,${base64Data}`;
}

export {getImageUrl};