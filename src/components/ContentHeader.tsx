import type { NextPage } from "next";
const ContentHeader: NextPage = (props) => {
    return(
        <div className="bg-gray-100 px-4 py-4 flex justify-between">
            <div>Search Data</div>
            <div>Wallet</div>
        </div>
    )
}
export default ContentHeader;