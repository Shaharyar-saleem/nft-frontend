
async function getNftData(id=1){
    console.log(1);
    const url = `https://fuzionpunks.s3.us-east-2.amazonaws.com/json/${id}.json`;
    console.log("json URL:", url);

    const response = await fetch(`https://fuzionpunks.s3.us-east-2.amazonaws.com/json/${id}.json`, {
            headers: new Headers({
                'Content-Type': 'application/json',
        })
    });
    let data = response.json();
    console.log("this is the feature of NFT:", data);
    return data;

}

module.exports = {
    getNftData,
}