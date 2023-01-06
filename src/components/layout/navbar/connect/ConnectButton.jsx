import { Context as Web3Context } from "../../../../context/WalletContext"
import { useContext } from 'react';

const ConnectButton = (props) => {
    const {connect, disconnect, isConnected} = useContext(Web3Context);

    return (
        <button 
            onClick={(isConnected) ? () => disconnect() : () => connect()}
            className={"bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full outline outline-2 " + props.className}>
            {(isConnected) ? "Disconnect" : "Connect wallet"}
        </button>
    )
}

export default ConnectButton