import {
  IconChevronDown,
  IconChevronUp,
  IconMailForward,
  IconMapPins,
} from "@tabler/icons";

import { useState, useTransition } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import UserCardDetail from "../components/UserCardDetail";

export default function Home() {
  const [inputNum, setInputnum] = useState(1);
  const [result, setResult] = useState([]);
  const genUsers = async () => {
    if (inputNum <= 0) {
      alert("Invalid number of user");
      return;
    }
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${inputNum}`
    );
    setResult(resp.data.results);
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      {/* App Header */}
      <p className="display-4 text-center fst-italic m-4">
        Multiple Users Generator
      </p>

      {/* Input Section */}
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event) => setInputnum(event.target.value)}
          value={inputNum}
        />
        <button className="btn btn-dark" onClick={() => genUsers()}>
          Generate
        </button>
      </div>
      {result.map((Element) => (
        <UserCard
          key={Element.login.uuid}
          name={Element.name.first + " " + Element.name.last}
          img={Element.picture.large}
          email={Element.email}
          address={
            Element.location.city +
            " " +
            Element.location.state +
            " " +
            Element.location.country +
            " " +
            Element.location.postcode
          }
        />
      ))}

      {/* made by section */}
      <p className="text-center mt-3 text-muted fst-italic">
        made by Suphanath Wangthip 640612098
      </p>
    </div>
  );
}
