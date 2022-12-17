import { Context as WalletContext } from "../../../../context/WalletContext"
import { useContext } from 'react';
import PropTypes from 'prop-types';

const WalletMenu = (props) => {

    const ellipseAddress = (address = '', width = 6) => {
        if (!address) {
          return ''
        }
        return `${address.slice(0, width)}...${address.slice(-width)}`
    }

    const content = props.children;
    return (
        <div className={props.className}>
            { ellipseAddress(content) }
        </div>
    )
}

const WalletInfo = (props) => {

    const {isConnected, address} = useContext(WalletContext);

    return (
        <div className="flex">
            { isConnected &&
                <WalletMenu className={props.className}>
                    { address }
                </WalletMenu>
            }
            {props.icon &&
                <div className="flex items-center ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path fill={(isConnected) ? "cyan" : "#ff3b7a"} d="M5.85 17.1q1.275-.975 2.85-1.538Q10.275 15 12 15q1.725 0 3.3.562 1.575.563 2.85 1.538.875-1.025 1.363-2.325Q20 13.475 20 12q0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.475.488 2.775.487 1.3 1.362 2.325ZM12 13q-1.475 0-2.488-1.012Q8.5 10.975 8.5 9.5t1.012-2.488Q10.525 6 12 6t2.488 1.012Q15.5 8.025 15.5 9.5t-1.012 2.488Q13.475 13 12 13Zm0 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/>
                    </svg>
                </div>
            }
        </div>
    )
}

WalletInfo.propTypes = {

    icon: PropTypes.bool
}

WalletInfo.defaultProps = {
    icon: true
}

export default WalletInfo