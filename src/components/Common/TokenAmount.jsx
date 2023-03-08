import { useState, useEffect } from "react";
import { Context as WalletContext } from "../../context/WalletContext"
import { useContext } from 'react';
import { ethers } from "ethers"
import {isEthAddress} from "../../utils/utils"

const TokenAmount = (props) => {

    const { contract } = useContext(WalletContext);

    const [ amountOwned, setAmountOwned ] = useState(0);

    const fetchInfo = async () => {
        if(isEthAddress(props.address)){
            let amount = await contract.balanceOf(props.address);
            amount = ethers.utils.formatUnits(amount, 0)
            setAmountOwned(amount);
        }
    }

    contract.on("Transfer", async (from, to, value, event) => {
        if(to === props.address || from === props.address){
            if(from === '0x0000000000000000000000000000000000000000') 
                console.log("Public mint from this account emitted");

            if(to === props.address) 
                console.log(`${to} has received a transfer from ${from}`);

            if(from === props.address) 
            console.log(`${from} has sent a transfer to ${to}`);

            fetchInfo();
        }
    });

    useEffect(() => {
        fetchInfo(); // eslint-disable-next-line
    }, [props.address])

    return (
        <div>
            {amountOwned}
        </div>
    )
}

export default TokenAmount