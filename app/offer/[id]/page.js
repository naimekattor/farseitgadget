import React from "react";
import Header from "./../../../component/Header";

const page = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 shadow-lg bg-white rounded-md">
        <h1 className="text-[15px] my-4 tracking-wider font-semibold text-center">
          চলছে গ্যাজেট ৩৬০ এর ১৮তম বর্ষপূর্তি উৎসব!
        </h1>
        <p className="text-[15px] my-4  font-medium text-center">
          উৎসবে, উপহারে, মাতি একসাথে। মাসব্যাপি চলা এই আনন্দ উৎসবে ল্যাপটপ,
          ডেস্কটপ, গ্যাজেট কিংবা এক্সেসোরিজ কিনে জিতে নিন ল্যাপটপ, মনিটর, iPhone
          16, স্মার্ট ওয়াচ, জিম ব্যাগ, ২০০০ টাকা পর্যন্ত গিফট ভাউচার সহ আকর্ষনীয়
          নানা উপহার! থাকছে আকর্ষনীয় মূল্যছাড়, বিকাশ পেমেন্টে ১০% ইনস্ট্যান্ট
          ক্যাশব্যাক এবং ৬৪ জেলায় ফ্রি ডেলিভারি।
        </p>
        <h2 className="text-[15px] my-4 tracking-wider font-semibold text-center">
          অর্ডার করুন এখনই...
        </h2>
      </div>
    </>
  );
};

export default page;
