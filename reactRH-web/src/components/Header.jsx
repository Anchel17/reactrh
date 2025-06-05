import { LogOutIcon, UserRoundIcon } from "lucide-react";

function Header(){
    return (
        <div className="w-[100%] flex justify-center">
            <div className="sm:w-[70%] w-[90%] flex justify-between text-white text-lg sm:text-4xl pt-8">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-blue-500 rounded-md sm:rounded-xl p-1">
                        <UserRoundIcon size={40} className="sm:block hidden" color="#fff"/>
                        <UserRoundIcon size={20} className="sm:hidden block" cikir="#fff"/>
                    </div>
                    <h1 className="font-bold">React RH</h1>

                </div>
                <button className="hover:cursor-pointer">
                    <LogOutIcon size={40} className="sm:block hidden"/>
                    <LogOutIcon size={20} className="sm:hidden block"/>
                </button>
            </div>
        </div>
    )
}

export default Header;