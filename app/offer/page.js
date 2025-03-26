import Header from "@/component/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const offerData = [
  {
    id: 1,
    title: "Offer 1",
    description: "Offer 1 description",
    image: "/offer1.png",
  },
  {
    id: 2,
    title: "Offer 2",
    description: "Offer 2 description",
    image: "/offer2.png",
  },
  {
    id: 3,
    title: "Offer 3",
    description: "Offer 3 description",
    image: "/offer3.png",
  },
  {
    id: 4,
    title: "Offer 1",
    description: "Offer 1 description",
    image: "/offer4.png",
  },
  {
    id: 5,
    title: "Offer 2",
    description: "Offer 2 description",
    image: "/offer5.png",
  },
  {
    id: 6,
    title: "Offer 3",
    description: "Offer 3 description",
    image: "/offer6.png",
  },
];
const Offer = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          {offerData.map((data, index) => (
            <div key={index} className="shadow-lg bg-white rounded-md p-4">
              <Image
                width={370}
                height={370}
                src={data.image}
                alt={data.title}
                loading="lazy"
              />
              <div className="p-4 flex flex-col items-center">
                <h2 className="text-[20px] text-black my-4 text-center font-semibold">
                  {data.title}
                </h2>
                <p className="text-[15px] text-gray-600 mb-2 text-center">
                  {data.description}
                </p>
                <Link href={`/offer/${data.id}`}>
                  <button className="text-[20px] text-white bg-[#3a4ab7] py-2 px-4 rounded text-center font-semibold cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Offer;
