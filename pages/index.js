import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useEffect } from "react";
import { useState } from "react";

// TO START THE EMULATOR:
// flow emulator start --dev-wallet -v --persist

// TO DEPLOY THE CONTRACT (emulator MUST be running and flow.json MUST be configured):
// flow project deploy --network=emulator

fcl.config({
  "app.detail.title": "Jacob is a Legend",
  "app.detail.icon": "https://i.imgur.com/p9oCBgW.jpg",
  "accessNode.api": "http://localhost:8080",
  "discovery.wallet": "http://localhost:8701/fcl/authn", // dev wallet
  "0xStuff": "0xf8d6e0586b0a20c7"
})

const Home = () => {
  const [name, setName] = useState();
  const [user, setUser] = useState({addr: ''});
  const [newName, setNewName] = useState();

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, [])

  const logIn = () => {
    fcl.authenticate();
  }

  const logOut = () => {
    fcl.unauthenticate();
  }

  const getName = async () => {
    const response = await fcl.send([
      fcl.script`
      import Stuff from 0xStuff

      pub fun main(): String {
        return Stuff.name
      }
      `
    ]).then(fcl.decode);

    setName(response);
  }

  const changeName = async () => {
    const txId = await fcl.send([
      fcl.transaction`
      import Stuff from 0xStuff

      transaction(newName: String) {

        prepare(signer: AuthAccount) {
        }

        execute {
          Stuff.changeName(newName: newName)
        }
      }
      `,
      fcl.args([
        fcl.arg(newName, t.String)
      ]),
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log({txId})
  }

  if (user.addr) {
    return (
      <div className="center">
        <div>
          <h1>{user.addr}</h1>
          <div className="btn-2">
            <button onClick={logOut}><span>Log Out</span></button>
          </div>
        </div>
        <div>
          <div className="btn-1">
            <button onClick={getName}><span>Get Name</span></button>
          </div>
          <h3>{name}</h3>
        </div>
        <div>
          <div className="btn-1">
            <button onClick={changeName}><span>Change Name</span></button>
          </div>
          <input type="text" onChange={(e) => setNewName(e.target.value)} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="center">
        <div className="btn-1">
          <button onClick={logIn}><span>Log In</span></button>
        </div>
      </div>
    )
  }
}

export default Home;
