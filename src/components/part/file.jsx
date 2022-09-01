import React, {useState} from 'react';
import "../../../css/file.css";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const File = () => {

    const [ speed, setSpeed] = useState('paper');
    const [ speed1, setSpeed1] = useState('two');


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
        <div style={{marginTop:'69px'}}>

            <div className="Trade">
                {/* <div className="Trade1">
                    <div className="star"> <img src="img/map.svg"  alt="" className="space"/> <span className="Market">Markets</span></div>
                    <div className="star"> <img src="img/map1.svg"  alt="" className="space"/> <span className="Market">Lend </span></div>
                    <div className="star"> <img src="img/map2.svg"  alt="" className="space"/> <span className="Market">Synths</span></div>
                    <div className="star"> <img src="img/map.svg"  alt="" className="space"/> <span className="Market">Trade </span></div>

                    <div>
                         <div className="star"> <img src="img/map3.svg"  alt="" className="space"/> <span className="Market">Farm</span></div>
                         
                    </div>
                      <div>
                        <div className="star"> <img src="img/map5.svg"  alt="" className="space"/> <span className="Market">Tools </span></div>
                           
                        </div>
                        <div className="star"> <img src="img/map4.svg"  alt="" className="space"/> <span className="Market">Security </span></div>
                        <div className="star"> <img src="img/map6.svg"  alt="" className="space"/> <span className="Market"> Document </span></div>
                        <div className="star"> <img src="img/map7.svg"  alt="" className="space"/> <span className="Market">Tutorials </span> </div>
                        <div className="star"> <img src="img/map8.svg"  alt="" className="space"/> <span className="Market">Governance</span></div>
                        <div>
                            <img src="" alt=""/>
                             <img src="" alt=""/>
                              <img src="" alt=""/>
                               <img src="" alt=""/>
                        </div>
                        <div>
                              <img src="" alt=""/>
                              <img src="" alt=""/>
                              <img src="" alt=""/>
                               <img src="" alt=""/>
                        </div>

                     </div> */}
                
                 <div className="Trade2">
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
                                            <div className="send7"><img src="img/map10.png" alt="" className="send4"/></div>
                                            <div>  <div style={{color:'#000',marginRight:'5px' ,display:'flex',alignItems:'center',}}>USDT <ArrowDropDownIcon/> </div> </div>
                                            
                                             <div style={{color:'#000'}}>MAX</div>
                                       </div>
                                   </div>
                                   <div><input   placeholder="0.00" className="send8" value="4"/></div>
                                 </div>
                               </div>
                                 <div className="For1">
                                     <div style={{flex:'1',fontWeight:'bold',fontSize:'24px'}}>RECEIVE</div>
                                     <div style={{flex:'1'}}><img src="img/map11.svg" alt=""/></div>
                                 </div>

                                 <div className="For">
                                     <div className="send2"><span style={{color:'#000'}}>Balance: ...</span>  <span style={{color:'#000'}}>Amount</span></div>
                                     <div className="send5">
                                         <div className="send6">
                                           <div className="send7"> <img src="img/map12.png" alt="" className="send4"/></div>
                                          <div> <div style={{display:'flex',alignItems:'center',color:'#000'}}>DF <ArrowDropDownIcon id="COMES1"/>  </div></div>
                                         </div>
                                         <div><input type="" alt="" className="send8"  placeholder="0.00"/></div>
                                     </div>
                                 </div>
                            </div>

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
                       <div className={speed1 === 'two' ? 'ada1' : 'ada'}   onClick={send1}  id="two" >0.1%</div>
                       <div className={speed1 === 'two2' ? 'ada1' : 'ada'}  onClick={send1}  id="two2">0.2%</div>
                       <div className={speed1 === 'two3' ? 'ada1' : 'ada'}   onClick={send1} id="two3">0.5%</div>
                       <div className={speed1 === 'two4' ? 'ada1' : 'ada'}   onClick={send1} id="two4">1%</div>
                       <div className={speed1 === 'two5' ? 'ada1' : 'ada'}   onClick={send1} id="two5">3%</div>
                       <div className={speed1 === 'two6' ? 'ada1' : 'ada'}   onClick={send1} id="two6">5%</div>
                   </div>
                   <div className="rece">Minimum received:... DF</div>
                   <div className="Gas">Gas Fee (GWEI)</div>
                   <div className="Gas1">
                       <div className={speed === 'paper' ? 'Gas3' : 'Gas2' } onClick={send} id="paper">121 Standard</div>  <div  className={speed === 'paper1' ? 'Gas3': 'Gas2' }  onClick={send} id="paper1">134 Fast </div> <div className={speed === 'paper2'? 'Gas3': 'Gas2' }  onClick={send} id="paper2">148 instant</div>
                   </div>

               </div>
               </div>

           </div>


            </div>

            
        </div>
    )
}

export default File;
