const getImageUrl = (imgAPIResponse)=>{
    const base64Data = imgAPIResponse.data;
    const mimeType =base64Data.type;
    if(imgAPIResponse.data===null || imgAPIResponse.data===undefined){
        return "";
    }
    return `data:${mimeType};base64,${base64Data}`;
}

export {getImageUrl};