function formatExchangeData(data) {

    const ratesData = Object.values(data.rates);
    const resultArr = [];
    for (const prop of ratesData) {
        if (
            prop.unit === '$' ||
            prop.unit === 'ETH' ||
            prop.unit === 'BNB' ||
            prop.unit === 'XAU' ||
            prop.unit === 'kr.' ||
            prop.unit === '£'
        ) { 
            resultArr.push(`One Bitcoin (BTC) is currently worth ${prop.value} ${prop.name} (${prop.unit})\n
            `);
        }
    }
    return resultArr;
}

module.exports = {
    formatExchangeData,
};