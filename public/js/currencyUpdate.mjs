async function FetchBtcLivePrice(){
    let url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
    let resp = await fetch(url);
    let data = await resp.json();

    return data.bitcoin.usd;
}

export default FetchBtcLivePrice;