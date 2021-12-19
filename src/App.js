import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from '/utils/load-contract';

function App() {

  const [Web3Api, setWeb3Api] = useState({
    provider : null,
    web3: null,
    contract: null
  })

  const [account, setAccount] = useState(null)

  useEffect(() => {
    const loadProvider = async () => {
      const provider= await detectEthereumProvider()
      const contract = await loadContract('Faucet', provider)

      if (provider){
        setWeb3Api({
          web3 : new Web3(provider),
          provider,
          contract 
        })
      }
      else{
        console.error("Please, install Metamask.")
      }
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const getAccounts = async ()=> {
      const accounts = await Web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    Web3Api.web3 && getAccounts()
  }, [Web3Api.web3])

  
  return(
    <>
      <div className='faucet-wrapper'>
        <div className='faucet'>
          <div className='is-flex is-align-items-center'>
            <span>
              <strong className='mr-2'>Account: </strong>
            </span>
            { account ? 
              <div>{account}</div> : 
              <button className='button is-small is-info is-outlined'
                onClick={() => 
                  Web3Api.provider.request({method: "eth_requestAccounts"})}>
                Connect Wallet
              </button>
            }
          </div>
          <div className='balane-view is-size-2 my-4'>
            Current Balance:<strong>10</strong>ETH
          </div>
          <button className='button is-link is-outlined mr-2'>Donate</button>
          <button className='button is-primary is-outlined'>Withdraw</button>
        </div>
      </div>
    </>
  )
}

export default App;
