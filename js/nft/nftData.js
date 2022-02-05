
async function getNftData(id=1){
    const response = await fetch(`https://fuzionpunks.s3.us-east-2.amazonaws.com/json/${id}.json`, {
            headers: new Headers({
                'Content-Type': 'application/json',
        })
    });
    let data = response.json();
    console.log("this is the feature of NFT:", data);
    return data;

}

async function getAttributes(){
    const data = await getNftData();
    let nftAttributes = await data.attributes[0].trait_type;
    console.log("data from nftAttribute function:", nftAttributes);
    return nftAttributes;
}


module.exports = {
    getNftData,
    getAttributes,
}