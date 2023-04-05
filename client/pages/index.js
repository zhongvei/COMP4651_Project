import { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useStateContext } from "../context";

export default function Home() {

  const { getBuildings, getTransaction, getFlats, buyFlat, connect } = useStateContext();

  const [test, settest] = useState({
    name: '',
    available: '',
    taken: ''
  })

  const [tx, settx] = useState({
    buyer: '',
    flat: '',
    price: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("clicked")

      const data = await getBuildings();
      settest(data);
      // console.log(`${test.name} ${test.available} ${test.taken}`);
      // console.log(data.available.toNumber());
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  const handleEvents = async (e) => {
    e.preventDefault();
    try {
      const events = await getTransaction();
      console.log(events)
      settx(events)
      // console.log(tx[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleFlats = async (e) => {
    e.preventDefault();
    try {
      const events = await getFlats("building1");
      console.log(events);
      // settx(events)
      // console.log(tx[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuyFlat = async(e) => {
    e.preventDefault();
    try {
      const reciept = await buyFlat("building1","B","5000000000000000000");
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(tx)
  return (
    <div className={styles.container}>
      <button 
        style={{ height: "100px", width: "100px" }}
        type="submit"
        title="buildings"
        onClick={connect}
      />
      <button
        style={{ height: "100px" }}
        type="submit"
        title="buildings"
        onClick={handleEvents}
      />
    </div>
  )}