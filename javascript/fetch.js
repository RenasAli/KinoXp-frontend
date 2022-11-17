var fetchDataByUrl = async url => {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

var postDataByUrl = async (url, settings) => {
    const response = await fetch(url, settings)
    const data = await response.json()
    return data;
}
