import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers'
import avtar from '../../assets/avtar.jpeg'
import TabsRender from './Holdings/Tabs';

function Dashboard() {
    const { address } = useParams();

    const [resolvedAddress, setResolvedAdderss] = useState('');
    const [ensAddress, setEnsAdderss] = useState('');

    const ensResolver = async () => {
        if (!ethers.utils.isAddress(address)) {
            setEnsAdderss(address)
            try {
                const { ethereum } = window;
                if (ethereum) {
                    const provider = new ethers.providers.AlchemyProvider("homestead", "3WH_6AZRF-DKliitCwnu58DHv4nlp4d0")
                    const resAddress = await provider.resolveName(address);
                    setResolvedAdderss(resAddress);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setResolvedAdderss(address);
        }


    }

    useEffect(() => {
        ensResolver();
    }, []);

    return (
        <div>

            <main className="profile-page">
                <section className="relative block" style={{ height: "300px" }}>
                </section>
                <section className="relative py-16 ">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src={avtar}
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                style={{ maxWidth: "150px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button
                                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                Connect
                                            </button>
                                            <button
                                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <button className="mr-4 p-5 bg-green-300 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    22
                                                </span>
                                                <span className="text-sm text-gray-500">Upvotes</span>
                                            </button>
                                            <button className="mr-4 p-3 bg-red-300 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    10
                                                </span>
                                                <span className="text-sm text-gray-500">Downvotes</span>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                        {ensAddress}
                                    </h3>
                                    <div className="text-xl leading-normal mt-0 mb-2 text-gray-500 font-bold">
                                        {resolvedAddress}
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <Reputation />

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <TabsRender />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )

}

export default Dashboard