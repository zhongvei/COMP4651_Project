import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function Faq() {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 pb-14 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-white-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "What do we offer?",
    answer: "Our proposed solution is a real-estate investment trust (REIT) fund, HKPulse Fund, that is linked to a blockchain-based property management platform which utilizes smart contracts to allow for increased payment transparency. The fund will focus on acquiring and managing properties that meet the criteria of affordability and accessibility for low- to middle-income earners. The use of smart contracts and real-time blockchain management systems provides transparency to investors on how their money is being used to fund social good. ",
  },
  {
    question: "What distinguish HKPulse Fund from the other REIT funds?",
    answer: "the HKPulse REIT fund attracts middle class investors who are passionate about being a part of the solution to the housing crisis, while looking for an affordable, and transparent investment option into the residential property market in Hong Kong.  It provides a secure investment opportunity for these individuals as they will be promised a stable monthly dividend return from rent payments.",
  },
  {
    question: "How can we invest in HKPulse Fund?",
    answer: "To invest in HKPulse Fund, you can go to our Invest Page. As our funds are traded on the Hong Kong Exchange Platform, our page will provide you with a list of investment services that we have partnered with to help you invest in our fund, and redirect you to the respective websites.",
  },
  {
    question: "How trasnparent is HKPulse Fund?",
    answer: "Our system utalizes blockchain and smart contracts to display real time data on flat availability, rent transactions, and rent agreement to provide transparency on our cash flow and social impact. The transaction records and occupancy data can be seen through our Details Page",
  },
];
