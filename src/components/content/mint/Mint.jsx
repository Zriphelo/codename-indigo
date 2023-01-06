import { useState } from "react";
import { Context as WalletContext } from "../../../context/WalletContext"
import { useContext } from 'react';
import blockSvg from "../../../assets/svg/block.svg"
import Display from "../../common/Display"
import TokenAmount from "../../common/TokenAmount";
import { useEffect } from "react";

const MintForm = () => {

    const { contract, signer } = useContext(WalletContext);

    const [amount, setAmount] = useState('');
    const [minted, setMinted] = useState('');
    const [inputError, setInputError] = useState(false);
    const [address, setAddress] = useState(undefined);

    useEffect(() => {
        async function fetch () {
            setAddress(await signer.getAddress())
        }
        fetch()
    }, [signer])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(amount > 0) {
            setInputError(false);
            let mintedRes = await contract.connect(signer).publicMint(amount);
            console.log(mintedRes);

            setMinted(amount);
        } else {
            setInputError(true);
        }
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

    return (
        <div className="grid grid-cols-1">
            <Display title="Indigo tokens owned">
                <TokenAmount address={address}/>
            </Display>
            <Display title="Amount to mint">
                <form onSubmit={handleSubmit}>
                    <input className="rounded-xl p-1 px-3 my-2 text-slate-900 bg-slate-100/40 border w-full"
                        type="text" value={amount} onChange={handleChange} /> <br/>
                    <input className="m-2 p-1 px-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white border-2 cursor-pointer"
                        type="submit" value="Mint" />
                </form>
            </Display>
            <Display title="Indigo tokens minted">
                <div>
                    {minted}
                </div>
            </Display>
            {inputError && 
                <Display className="flex justify-center bg-red-600/60 text-white">
                    <img src={blockSvg} alt="block_svg" />
                    <div className="mx-2">
                        Amount too low
                    </div>
                </Display>
            }
        </div>
    )
}


const Mint = () => {

    const {isConnected, isGoerli} = useContext(WalletContext);

    if(isConnected && isGoerli) {
        return (
            <div className="flex lg:mx-10 lg:px-4 justify-center">
                
                <MintForm/>
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

export default Mint