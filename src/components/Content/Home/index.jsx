import Display from "../../Common/Display";
import { NavLink } from "react-router-dom";

const LinkButton = (props) => {
    return (
        <NavLink
            className={
                "text-center flex items-center p-4 bg-indigo-600/80 rounded-2xl text-slate-200 " +
                props.className
            }
            to={props.to}
        >
            {props.children}{" "}
            <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
            >
                <path d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" />
            </svg>
        </NavLink>
    );
};

const Home = () => {
    return (
        <div className="flex flex-col items-center lg:mx-10 lg:px-4">
            <Display className="col-span-2 text-center" title="Where am I?">
                <p>
                    This website hosts a handful of example web3 projects using
                    different token standards and solidity code
                </p>
                <p>
                    Website created using React, ether.js and web3modal using a
                    custom config-overrides.js file
                </p>
            </Display>

            <LinkButton className="m-4" to="/fungible">
                erc-20 <br/> Crypto coin
            </LinkButton>

            <LinkButton className="m-4" to="/nonfungible">
                erc-721 <br/> NFT
            </LinkButton>

            <LinkButton className="m-4" to="/">
                Storage contract
            </LinkButton>
        </div>
    );
};

export default Home;
