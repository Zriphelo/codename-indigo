import { useState, useEffect } from "react";
import { Context as WalletContext } from "../../../context/WalletContext"
import { useContext } from 'react';
import Display from "../../common/Display"
import blockSvg from "../../../assets/svg/block.svg"
import TokenAmount from "../../common/TokenAmount";
import { isEthAddress } from "../../../utils/utils";

const TransferForm = () => {

    const { contract, signer } = useContext(WalletContext);
    const [ address, setAddress] = useState('');
    const [ targetAddress, setTargetAddress] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ inputError, setInputError ] = useState(false);
    const [ targetError, setTargetError ] = useState(false);
    const [ sent, setSent] = useState('');

    useEffect(() => {
        async function fetch () {
            setAddress(await signer.getAddress())
        }
        fetch()
    }, [signer])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isEthAddress(targetAddress)) {
            setTargetError(true);
            return
        }
        else setTargetError(false);
        
        if(amount > 0) {
            setInputError(false);
            let transferRes = await contract.connect(signer).transfer(targetAddress, amount);
            console.log(transferRes);
            setSent(amount);
        } else setInputError(true);

    }

    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value.replace(/[^0-9]/g, '')
        if (value > 0 || value === '') {
            setInputError(false);
        } else {
            setInputError(true);
        }
        setAmount(value);
    }

    const handleToChange = (e) => {
        e.preventDefault();
        setTargetAddress(e.target.value);
    }

    return (
        <div className="grid grid-cols-2">
            <Display title="Indigo tokens owned">
                <TokenAmount address={address}/>
            </Display>
            <Display title="Target tokens owned">
                <TokenAmount address={targetAddress}/>
            </Display>

            <Display title="Tokens to send: ">
                <form onSubmit={handleSubmit}>
                    <input className="rounded-xl p-1 px-3 m-2 text-slate-900 bg-slate-100/40 border"
                        type="text" value={amount} onChange={handleChange} /> <br/>
                    <input className="m-2 p-1 px-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white border-2 cursor-pointer"
                        type="submit" value="Send" />
                </form>
            </Display>
            <Display title="Target address: ">
                <input className="rounded-xl p-1 px-3 m-2 text-slate-900 bg-slate-100/40 border"
                        type="text" value={targetAddress} onChange={handleToChange} />
            </Display>
            <Display title="Indigo tokens sent">
                <div>
                    {sent}
                </div>
            </Display>
            { (targetError || inputError) &&
                <Display className="block justify-center bg-red-600/60 text-white">
                    {targetError &&
                        <div className="align-middle justify-center text-white">
                            <div className="mx-2 flex">
                                <img src={blockSvg} alt="block_svg" />
                                Incorrect address
                            </div>
                        </div>
                    }
                    {inputError &&
                        <div className="align-middle justify-center text-white">
                            <div className="mx-2 flex">
                                <img src={blockSvg} alt="block_svg" />
                                Amount too low
                            </div>
                        </div>
                    }
                    
                </Display>
            }
            
            
            
        </div>
    )
}

const Transfer = () => {

    const {isConnected, isGoerli} = useContext(WalletContext)

    if(isConnected && isGoerli) {
        return (
            <div className="flex lg:mx-10 lg:px-4 justify-center">
                <TransferForm/>
            </div>
        );
    } else {
        return (
            <div className="flex lg:mx-10 lg:px-4 justify-center">
                <Display title="Access unauthorized">
                    { (isConnected) ? "You need to use Goerli testnet network" : "You must connect your wallet"}
                </Display>
            </div>
        );
    }

}

export default Transfer