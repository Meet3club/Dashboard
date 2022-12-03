import React, { useEffect, useState } from "react";

const POAPs = (props) => {
    let [tokens, mytokens] = useState([]);

    const uri = "https://api.poap.tech/actions/scan/" + "0x30BCD2e90B3C05e54446568d823408B2ddfa7A01"
    const Popas = async () => {
        fetch(
            uri,

        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                mytokens(data);
            })
            .catch((err) => {
                console.error(err);
            });

    };

    useEffect(() => {
        Popas();
    }, []);
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="flex flex-wrap -m-4">
                    {tokens.map((currlem) => {
                        if (currlem.image_url != "") {
                            return (
                                <div className="p-4 lg:w-1/4 md:w-1/2">
                                    <div className="h-full flex flex-col items-center text-center">
                                        <img alt="team" class="flex-shrink-0 rounded-lg object-cover object-center mb-4" key={currlem.image_url} src={currlem.event.image_url} />
                                        <div className="w-full">
                                            <h2 className="title-font font-medium text-lg text-gray-900" key={currlem.token_id}>{currlem.event.name}</h2>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </section>
        </>
    )
}

export default POAPs