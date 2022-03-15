# Example Flow DApp on Local Emulator + Dev Wallet

In this repo, you'll find some very basic and easy code to help you develop your first Flow DApp using the local emulator and dev wallet. The emulator is a great place to develop your code before going to TestNet.

<img src="https://i.imgur.com/RIVDBgw.png" />

## There are three steps:
1. Start the project
2. Start the emulator
3. Deploy your contract

## 1. Start the project

`npm run dev`

## 2. Start the Emulator

`flow emulator start --dev-wallet -v --persist`

1. The `--dev-wallet` flag tells your emulator to also start the dev wallet (helps you log in, log out, have an account to use)
2. The `-v` flag tells your emulator to include logs from your Cadence code (and gives you extra information about your transactions and scripts)
3. The `--persist` flag allows you to restart the emulator but keep all of your current state (during developing, you should use this only if you need it)

## 3. Deploy your contract

NOTE: Your flow.json must be setup like I have in the flow.json folder (already done for you)

NOTE #2: This command must be run AFTER you start the emulator

`flow project deploy --network=testnet`