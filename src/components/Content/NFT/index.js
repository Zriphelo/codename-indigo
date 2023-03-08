import { Outlet, NavLink } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const NFT = () => {
    return (
        <div>
            {/* <div className="justify-center flex text-slate-100">
                <NavLink
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? "bg-gray-800/80 text-white"
                                : "hover:text-black hover:bg-slate-100",
                            "px-3 py-2 rounded-md text-sm font-medium mx-2"
                        )
                    }
                    to="mint"
                >
                    Mint
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? "bg-gray-800/80 text-white"
                                : "hover:text-black hover:bg-slate-100",
                            "px-3 py-2 rounded-md text-sm font-medium"
                        )
                    }
                    to="transfer"
                >
                    Transfer
                </NavLink>
            </div> */}

            <Outlet />
        </div>
    );
};

export default NFT;
