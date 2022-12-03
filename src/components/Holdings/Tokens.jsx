import React, { useEffect, useState } from "react";

const Tokens = (props) => {
    let [items, setItems] = useState([]);
    const uri = "https://api.covalenthq.com/v1/1/address/" + "0x30BCD2e90B3C05e54446568d823408B2ddfa7A01" + "/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_d452e85367ae400b874ea3bdd3b"
    const getTokens = async () => {

        fetch(
            uri,
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.data.items);
                setItems(data.data.items);
            })
            .catch((err) => {
                console.error(err);
            });

    };

    useEffect(() => {
        getTokens();
    }, []);

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto">
                    {items.map((curlem) => {
                        return (
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-full">
                                    <div className="h-full flex  border-gray-200 border p-4 rounded-lg">
                                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={curlem.logo_url} />
                                        <div className="flex-grow">
                                            <h2 className="text-gray-900 title-font font-medium">{curlem.contract_ticker_symbol}</h2>
                                            <p className="text-gray-500">{curlem.balance / Math.pow(10, curlem.contract_decimals)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default Tokens