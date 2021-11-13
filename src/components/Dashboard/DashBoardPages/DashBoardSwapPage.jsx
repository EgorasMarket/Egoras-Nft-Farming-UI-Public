import React, {useState} from 'react';
import "../../../css/file.css";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const sweet =[{img:'../../img/name4.png',bar:'ETH',bar1:'Ether'},{img:'../../img/sch.svg',bar:'1INCH',bar1:'1Inch'},{img:'../../img/sch1.svg',bar:'AAVE',bar1:'AaveToken'},{img:'../../img/sch2.svg',bar:'AMP',bar1:'amp'},{img:'../../img/img5.png',bar:'ANT',bar1:'Aragon Network Token'},{img:'../../img/sch4.svg',bar:'BAL',bar1:'Balancer'},{img:'../../img/sch5.png',bar:'BAND',bar1:'Band Protocol'},{img:'../../img/sch7.svg',bar:'BAT',bar1:'BasicAttentionToken'},{img:'../../img/sch9.svg',bar:'BNT',bar1:'Bancor'},{img:'../../img/sch10.svg',bar:'COMP',bar1:'compound'},{img:'../../img/sch13.svg',bar:'CRV',bar1:'CurveDAOToken'},{img:'../../img/sch13.png',bar:'CVC',bar1:'Civic'},{img:'../../img/sch14.svg',bar:'DAI',bar1:'DaiStablecoin'},{img:'../../img/sch16.png',bar:'DNT',bar1:'district0x'},{img:'../../img/sch17.svg',bar:'ENJ',bar1:'Enjin'},{img:'../../img/sch18.jpeg',bar:'ENS',bar1:'Ethereum Name Service'},{img:'../../img/sch19.png',bar:'GNO',bar1:'Gnosis Token'},{img:'../../img/sch20.svg',bar:'GRT',bar1:'The Graph'},{img:'../../img/sch21.svg',bar:'GUSD',bar1:'GeminiDollar'},{img:'../../img/sch22.jpeg',bar:'KEEP',bar1:'Keep Network'},{img:'../../img/name4.png',bar:'KNC',bar1:'KyberNetwork'},{img:'../../img/sch24.svg',bar:'LINK',bar1:'Chainlink'},{img:'../../img/sch25.png',bar:'LOOM',bar1:'Loom Network'},{img:'../../img/sch26.svg',bar:'LRC',bar1:'Looping'},{img:'../../img/sch27.svg',bar:'MANA',bar1:'Decentraland'},{img:'../../img/sch28.svg',bar:'MKR',bar1:'Maker'},{img:'../../img/name4.png',bar:'MLN',bar1:'Melon'},{img:'../../img/sch31.png',bar:'NMR',bar1:'Numeraire'},{img:'../../img/sch32.jpeg',bar:'NU',bar1:'NuCypher'},{img:'../../img/sch33.svg',bar:'OXT',bar1:'Orchid'},{img:'../../img/sch34.svg',bar:'PAXG',bar1:'paxosGold'},{img:'../../img/sch35.svg',bar:'REN',bar1:'Republic'},{img:'../../img/sch36.png',bar:'REP',bar1:'Reputation Angur v1'},{img:'../../img/sch37.png',bar:'REPv2',bar1:'Reputation Angur v2'},{img:'../../img/sch38.svg',bar:'SAND',bar1:'Sandbox'},{img:'../../img/sch39.svg',bar:'SKL',bar1:'Skale'},{img:'../../img/sch40.svg',bar:'SNX',bar1:'Synthetix'},{img:'../../img/sch41.svg',bar:'STORJ',bar1:'Storj'},{img:'../../img/sch42.png',bar:'TBTC',bar1:'tBTC'},{img:'../../img/sch43.svg',bar:'UMA',bar1:'UMAVotingTokenv1'},{img:'../../img/sch44.svg',bar:'UNI',bar1:'Uniswap'},{img:'../../img/sch45.png',bar:'USDC',bar1:'USDCoin'},{img:'../../img/sch46.png',bar:'USDT',bar1:'Tether USD'},{img:'../../img/sch47.png',bar:'WBTC',bar1:'Wrapped BTC'},{img:'../../img/sch49.png',bar:'WETH',bar1:'Wrapped Ether'},{img:'../../img/name4.png',bar:'YFI',bar1:'yearn finance'},{img:'../../img/sch50.svg',bar:'ZRX',bar1:'0xProtocol'}];

const File = () => {

    const [ speed, setSpeed] = useState('paper');
    const [ speed1, setSpeed1] = useState('two');

   


 const close4 =()=>{
     document.getElementById('farm').style.display='none';
 }
 const show45 =()=>{
    document.getElementById('farm').style.display='flex';
}


    const send = (e)=>{
        const sand = e.target.id;
        setSpeed(sand)
    }

    const send1 =(e)=>{
         const sand1 = e.target.id;
        setSpeed1(sand1)
    }
    const Just=()=>{
        document.getElementById('water').style.display='none';
        document.getElementById('COMJ').style.display='none';
        document.getElementById('COMES').style.display='block';
        window.scroll.top='70px';
    
    }
     const Just2=()=>{
        document.getElementById('water').style.display='block';
         document.getElementById('COMJ').style.display='block';
        document.getElementById('COMES').style.display='none';
    
    }

    return (
        <div style={{marginTop:'69px'}} className="Trade2">

           
                
                 <div >
             <div className="Trade4">
                <div>
                    <div>
                        <form>
                            <div className="send1">SEND</div>
                            <div >
                             <div className="For">
                                <div className="send2"><span style={{color:'#000'}}>Balance: ...</span> <span className="send3">Amount</span></div>
                                <div className="send5">
                                    <div>
                                        < div className="send6">
                                            <div className="send7"><img src="../../img/map10.png" alt="" className="send4"/></div>
                                            <div>  <div style={{color:'#000',marginRight:'5px' ,display:'flex',alignItems:'center',fontWeight:'600'}}>USDT <ArrowDropDownIcon/> </div> </div>
                                            
                                             <div style={{color:'#000', fontWeight:'600'}}>MAX</div>
                                       </div>
                                   </div>
                                   <div><input   placeholder="0.00" className="send8" value="4"/></div>
                                 </div>
                               </div>
                                 <div className="For1">
                                     <div style={{flex:'1',fontWeight:'bold',}}  className="rete">RECEIVE</div>
                                     <div style={{flex:'1'}}><img src="../../img/map11.svg" alt=""/></div>
                                 </div>

                                 <div className="For">
                                     <div className="send2"><span style={{color:'#000'}}>Balance: ...</span>  <span className="send3">Amount</span></div>
                                     <div className="send5">
                                         <div className="send6">
                                           <div className="send7"> <img src="../../img/map12.png" alt="" className="send4"/></div>
                                          <div> <div  onClick={show45} style={{display:'flex',alignItems:'center',color:'#000',fontWeight:'600',cursor:'pointer'}}>DF <ArrowDropDownIcon id="COMES1"/>  </div></div>
                                         </div>
                                         <div><input type="" alt="" className="send8"  placeholder="0.00"/></div>
                                     </div>
                                 </div>
                            </div>
                           
                            {/* <div className="newswap">
                                <form>
                                <div><span>Swap</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-1ndknrv-0 fZuPAR"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></swap></div>
                                <div><div><img src="" alt=""/><span>ETH</span><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-33m4yg-8 khlnVY"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg></div> <div><input type="number" placeholder="0.00"/><input type="number" placeholder="0.00"/></div></div>
                                <div><div>Select a token</div><div><input type="" alt=""/><input type="" alt=""/></div></div>
                               </form>
                            </div> */}
                             

                            <div className="Enable">Enable Gas Token</div>
                            <div className="Enable1"> Connect Wallet</div>
                        </form>
                    </div>

                </div>

                 <div id="COMJ"><div className="Enable2 deep" onClick={Just} >Advanced <ArrowDropDownIcon/></div></div>
                 <div id="COMES"><div className="Enable2 deep" onClick={Just2}  >Advanced <ArrowDropDownIcon/></div></div>

               <div className="Enable3" id="water">

                   <div className="Enable4">Limit additional price slippage</div>
                   <div className="Enable5">
                       <div className={speed1 === 'two' ? 'ada ada1' : 'ada'}   onClick={send1}  id="two" >0.1%</div>
                       <div className={speed1 === 'two2' ? 'ada ada1' : 'ada'}  onClick={send1}  id="two2">0.2%</div>
                       <div className={speed1 === 'two3' ? 'ada ada1' : 'ada'}   onClick={send1} id="two3">0.5%</div>
                       <div className={speed1 === 'two4' ? ' ada ada1' : 'ada'}   onClick={send1} id="two4">1%</div>
                       <div className={speed1 === 'two5' ? ' ada ada1' : 'ada'}   onClick={send1} id="two5">3%</div>
                       <div className={speed1 === 'two6' ? ' ada ada1' : 'ada'}   onClick={send1} id="two6">5%</div>
                   </div>
                   <div className="rece">Minimum received:... DF</div>
                   <div className="Gas">Gas Fee (GWEI)</div>
                   <div className="Gas1">
                       <div className={speed === 'paper' ? 'Gas2  Gas3' : 'Gas2' } onClick={send} id="paper">121 <span>Standard</span></div>  <div  className={speed === 'paper1' ? ' Gas2 Gas3': 'Gas2' }  onClick={send} id="paper1">134 <span>Fast</span> </div> <div className={speed === 'paper2'? ' Gas2 Gas3': 'Gas2' }  onClick={send} id="paper2">148 <span>instant</span></div>
                   </div>

               </div>
               </div>

           </div>


            {/* </div> */}

            <div className="feed12 feed21" id="farm">
                <div className="feed22">
                    <form>
                        <div className="feed23">
                      <div className="feed25"><div className="feed24">Select a token</div> <svg onClick={close4} xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-1cchcrx-1 bNKSgQ"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                      <input type="search" placeholder="Search name or paste address"  className="feed26"/>
                      <p style={{display:'flex',alignItems:'center',fontWeight:'500'}}>Common bases <span className="feed27">?</span></p>
                      <div className="feed30">
                          <div className="feed29"><img src="../../img/name4.png" alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>ETH</span></div>
                          <div className="feed29"><img src="../../img/name2.svg" alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>DAI</span></div>
                          <div className="feed29"><img src="../../img/name1.png" alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>USDC</span></div>
                          <div className="feed29"><img src="../../img/name2.png" alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>USDT</span></div>
                          <div className="feed29"><img src="../../img/name5.png" alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>WBTC</span></div>
                          <div className="feed29"><img src="../../img/name6.png" alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>WETH</span></div>
                      </div>
                    </div>

                    <div style={{position:'relative',flex:1,overflow:'auto'}}>
                    <div className="saw2">

                        {sweet.map(ser=>(<div className='saw' style={{display:'flex',alignItems:'center',marginBottom:'10px'}}><img src={ser.img} alt="" className="feed28"/><div style={{display:'flex',marginLeft:'10px',flexDirection:'column'}}><span>{ser.bar}</span><span style={{fontSize:'12px',marginTop:'-5px',fontWeight:'300',color:'rgb(110, 114, 125)'}}>{ser.bar1}</span></div></div>))}


                      </div>
                    </div>

                   
                    </form>
                    <div className='saw1'>Manage Token Lists</div>
                </div>
            </div>

            
        </div>
    )
}

export default File;
