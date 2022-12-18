const expression = /^0x[a-fA-F0-9]{40}$/
const regex = new RegExp(expression);

const isEthAddress = (address) => {
    return regex.test(address);
}

export {isEthAddress}