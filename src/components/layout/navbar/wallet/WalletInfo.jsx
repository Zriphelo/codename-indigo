import { Context as WalletContext } from "../../../../context/WalletContext";
import { useContext } from "react";

const WalletMenu = (props) => {
  const ellipseAddress = (address = "", width = 6) => {
    if (!address) {
      return "";
    }
    return `${address.slice(0, width)}...${address.slice(-width)}`;
  };

  const content = props.children;
  return <div className={props.className}>{ellipseAddress(content)}</div>;
};

const WalletInfo = (props) => {
  const { isConnected, address } = useContext(WalletContext);

  return (
    <div className="flex">
      {isConnected && (
        <WalletMenu className={props.className}>{address}</WalletMenu>
      )}
    </div>
  );
};

export default WalletInfo;
