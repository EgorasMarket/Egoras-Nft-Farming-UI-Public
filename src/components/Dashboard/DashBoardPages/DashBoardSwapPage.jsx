import React, {useState,useEffect} from 'react';
import "../../../css/file.css";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const sweet =[{img:'../../img/name4.png',bar:'ETH',bar1:'Ether'},{img:'../../img/sch.svg',bar:'1INCH',bar1:'1Inch'},{img:'../../img/sch1.svg',bar:'AAVE',bar1:'AaveToken'},{img:'../../img/sch2.svg',bar:'AMP',bar1:'amp'},{img:'../../img/img5.png',bar:'ANT',bar1:'Aragon Network Token'},{img:'../../img/sch4.svg',bar:'BAL',bar1:'Balancer'},{img:'../../img/sch5.png',bar:'BAND',bar1:'Band Protocol'},{img:'../../img/sch7.svg',bar:'BAT',bar1:'BasicAttentionToken'},{img:'../../img/sch9.svg',bar:'BNT',bar1:'Bancor'},{img:'../../img/sch10.svg',bar:'COMP',bar1:'compound'},{img:'../../img/sch13.svg',bar:'CRV',bar1:'CurveDAOToken'},{img:'../../img/sch13.png',bar:'CVC',bar1:'Civic'},{img:'../../img/sch14.svg',bar:'DAI',bar1:'DaiStablecoin'},{img:'../../img/sch16.png',bar:'DNT',bar1:'district0x'},{img:'../../img/sch17.svg',bar:'ENJ',bar1:'Enjin'},{img:'../../img/sch18.jpeg',bar:'ENS',bar1:'Ethereum Name Service'},{img:'../../img/sch19.png',bar:'GNO',bar1:'Gnosis Token'},{img:'../../img/sch20.svg',bar:'GRT',bar1:'The Graph'},{img:'../../img/sch21.svg',bar:'GUSD',bar1:'GeminiDollar'},{img:'../../img/sch22.jpeg',bar:'KEEP',bar1:'Keep Network'},{img:'../../img/name4.png',bar:'KNC',bar1:'KyberNetwork'},{img:'../../img/sch24.svg',bar:'LINK',bar1:'Chainlink'},{img:'../../img/sch25.png',bar:'LOOM',bar1:'Loom Network'},{img:'../../img/sch26.svg',bar:'LRC',bar1:'Looping'},{img:'../../img/sch27.svg',bar:'MANA',bar1:'Decentraland'},{img:'../../img/sch28.svg',bar:'MKR',bar1:'Maker'},{img:'../../img/name4.png',bar:'MLN',bar1:'Melon'},{img:'../../img/sch31.png',bar:'NMR',bar1:'Numeraire'},{img:'../../img/sch32.jpeg',bar:'NU',bar1:'NuCypher'},{img:'../../img/sch33.svg',bar:'OXT',bar1:'Orchid'},{img:'../../img/sch34.svg',bar:'PAXG',bar1:'paxosGold'},{img:'../../img/sch35.svg',bar:'REN',bar1:'Republic'},{img:'../../img/sch36.png',bar:'REP',bar1:'Reputation Angur v1'},{img:'../../img/sch37.png',bar:'REPv2',bar1:'Reputation Angur v2'},{img:'../../img/sch38.svg',bar:'SAND',bar1:'Sandbox'},{img:'../../img/sch39.svg',bar:'SKL',bar1:'Skale'},{img:'../../img/sch40.svg',bar:'SNX',bar1:'Synthetix'},{img:'../../img/sch41.svg',bar:'STORJ',bar1:'Storj'},{img:'../../img/sch42.png',bar:'TBTC',bar1:'tBTC'},{img:'../../img/sch43.svg',bar:'UMA',bar1:'UMAVotingTokenv1'},{img:'../../img/sch44.svg',bar:'UNI',bar1:'Uniswap'},{img:'../../img/sch45.png',bar:'USDC',bar1:'USDCoin'},{img:'../../img/sch46.png',bar:'USDT',bar1:'Tether USD'},{img:'../../img/sch47.png',bar:'WBTC',bar1:'Wrapped BTC'},{img:'../../img/sch49.png',bar:'WETH',bar1:'Wrapped Ether'},{img:'../../img/name4.png',bar:'YFI',bar1:'yearn finance'},{img:'../../img/sch50.svg',bar:'ZRX',bar1:'0xProtocol'}];
const sweet1 =[{img:'../../img/name4.png',bar:'ETH',bar1:'Ether'},{img:'../../img/sch.svg',bar:'1INCH',bar1:'1Inch'},{img:'../../img/sch1.svg',bar:'AAVE',bar1:'AaveToken'},{img:'../../img/sch2.svg',bar:'AMP',bar1:'amp'},{img:'../../img/img5.png',bar:'ANT',bar1:'Aragon Network Token'},{img:'../../img/sch4.svg',bar:'BAL',bar1:'Balancer'},{img:'../../img/sch5.png',bar:'BAND',bar1:'Band Protocol'},{img:'../../img/sch7.svg',bar:'BAT',bar1:'BasicAttentionToken'},{img:'../../img/sch9.svg',bar:'BNT',bar1:'Bancor'},{img:'../../img/sch10.svg',bar:'COMP',bar1:'compound'},{img:'../../img/sch13.svg',bar:'CRV',bar1:'CurveDAOToken'},{img:'../../img/sch13.png',bar:'CVC',bar1:'Civic'},{img:'../../img/sch14.svg',bar:'DAI',bar1:'DaiStablecoin'},{img:'../../img/sch16.png',bar:'DNT',bar1:'district0x'},{img:'../../img/sch17.svg',bar:'ENJ',bar1:'Enjin'},{img:'../../img/sch18.jpeg',bar:'ENS',bar1:'Ethereum Name Service'},{img:'../../img/sch19.png',bar:'GNO',bar1:'Gnosis Token'},{img:'../../img/sch20.svg',bar:'GRT',bar1:'The Graph'},{img:'../../img/sch21.svg',bar:'GUSD',bar1:'GeminiDollar'},{img:'../../img/sch22.jpeg',bar:'KEEP',bar1:'Keep Network'},{img:'../../img/name4.png',bar:'KNC',bar1:'KyberNetwork'},{img:'../../img/sch24.svg',bar:'LINK',bar1:'Chainlink'},{img:'../../img/sch25.png',bar:'LOOM',bar1:'Loom Network'},{img:'../../img/sch26.svg',bar:'LRC',bar1:'Looping'},{img:'../../img/sch27.svg',bar:'MANA',bar1:'Decentraland'},{img:'../../img/sch28.svg',bar:'MKR',bar1:'Maker'},{img:'../../img/name4.png',bar:'MLN',bar1:'Melon'},{img:'../../img/sch31.png',bar:'NMR',bar1:'Numeraire'},{img:'../../img/sch32.jpeg',bar:'NU',bar1:'NuCypher'},{img:'../../img/sch33.svg',bar:'OXT',bar1:'Orchid'},{img:'../../img/sch34.svg',bar:'PAXG',bar1:'paxosGold'},{img:'../../img/sch35.svg',bar:'REN',bar1:'Republic'},{img:'../../img/sch36.png',bar:'REP',bar1:'Reputation Angur v1'},{img:'../../img/sch37.png',bar:'REPv2',bar1:'Reputation Angur v2'},{img:'../../img/sch38.svg',bar:'SAND',bar1:'Sandbox'},{img:'../../img/sch39.svg',bar:'SKL',bar1:'Skale'},{img:'../../img/sch40.svg',bar:'SNX',bar1:'Synthetix'},{img:'../../img/sch41.svg',bar:'STORJ',bar1:'Storj'},{img:'../../img/sch42.png',bar:'TBTC',bar1:'tBTC'},{img:'../../img/sch43.svg',bar:'UMA',bar1:'UMAVotingTokenv1'},{img:'../../img/sch44.svg',bar:'UNI',bar1:'Uniswap'},{img:'../../img/sch45.png',bar:'USDC',bar1:'USDCoin'},{img:'../../img/sch46.png',bar:'USDT',bar1:'Tether USD'},{img:'../../img/sch47.png',bar:'WBTC',bar1:'Wrapped BTC'},{img:'../../img/sch49.png',bar:'WETH',bar1:'Wrapped Ether'},{img:'../../img/name4.png',bar:'YFI',bar1:'yearn finance'},{img:'../../img/sch50.svg',bar:'ZRX',bar1:'0xProtocol'}];
const sweet101 =[{imgs:'../../img/name4.png', nase:'ETH'},{ imgs:'../../img/name2.svg', nase:'DAI'}, { imgs:'../../img/name1.png', nase:'USDC'},{ imgs:'../../img/name2.png', nase:'USDT'},{ imgs:'../../img/name5.png', nase:'WBTC'},{ imgs:'../../img/name6.png', nase:'WETH'}];
const sweet102 =[{imgs:'../../img/name4.png', nase:'ETH'},{ imgs:'../../img/name2.svg', nase:'DAI'}, { imgs:'../../img/name1.png', nase:'USDC'},{ imgs:'../../img/name2.png', nase:'USDT'},{ imgs:'../../img/name5.png', nase:'WBTC'},{ imgs:'../../img/name6.png', nase:'WETH'}]

 // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

    // Get the modal
var modal = document.getElementById("farm");
var modal1 = document.getElementById("farm1");

    if (event.target == modal) {
      modal.style.display = "none";
      document.body.classList.remove('queen');
    }
    if (event.target == modal1) {
        modal1.style.display = "none";
        document.body.classList.remove('queen');
      }
  }

  

const File = () => {

    const [ speed, setSpeed] = useState('paper');
    const [ speed1, setSpeed1] = useState('two');
    const [isOpen,setIsOpen] =useState(true);
    const [ speed4, setSpeed4] = useState('DF');
    const [ speed5, setSpeed5] = useState('ETH');
    const [image,setImage] = useState('../../img/map12.png');
    const [image1,setImage1] = useState('../../img/name4.png');


    const [changeShow,setChangeShow] = useState(0);



    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [searchResults1, setSearchResults1] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
      };

  useEffect(()=>{
    const results = sweet.filter(person =>
        person.bar.toLowerCase().includes(searchTerm)
      );
      const results1 = sweet1.filter(person2 =>
        person2.bar.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
      setSearchResults1(results1);
 

  },[searchTerm])



 const deff=(ey)=>{

    setChangeShow(ey.target.value);
    document.getElementById('send8').style.display="block";
    let pap = document.getElementById('send9');
    if(pap.value <= 0){
        document.getElementById('send8').style.display="none"
    }
 }
    
//   let defe = (x)=>{
//  return(x + x)
//   }

 const close4 =()=>{
    document.getElementById('farm').style.display='none';
   
     document.body.classList.remove('queen');
 }
  

 const close5 =()=>{
    document.getElementById('farm1').style.display='none';
   
     document.body.classList.remove('queen');
 }

 const show45 =()=>{
    document.getElementById('farm').style.display='flex';
   document.body.classList.add('queen');
}
const show46 =()=>{
    document.getElementById('farm1').style.display='flex';
   document.body.classList.add('queen');
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
        // window.scroll.top='70px';
    
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
                                            <div className="send7"><img src={image1} alt="" className="send4"/></div>
                                            <div>  <div onClick={show46} style={{color:'#000',marginRight:'5px' ,display:'flex',alignItems:'center',fontWeight:'600',cursor:'pointer'}}>{speed5} <ArrowDropDownIcon/> </div> </div>
                                            
                                             <div style={{color:'#000', fontWeight:'600'}}>MAX</div>
                                       </div>
                                   </div>
                                   <div><input type="number"  placeholder="0.00" className="send8" /></div>
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
                                           <div className="send7"> <img src={image} alt="" className="send4"/></div>
                                          <div> <div  onClick={show45} style={{display:'flex',alignItems:'center',color:'#000',fontWeight:'600',cursor:'pointer'}}>{speed4} <ArrowDropDownIcon id="COMES1"/>  </div></div>
                                         </div>
                                         <div><input type="number" alt="" className="send8" id="send9" placeholder="0.00" value={changeShow} onChange={ deff} onClick={()=>{setChangeShow('');}}/>
                                         <input type="number" alt="" className="send8" id="send8" placeholder="0.00" value={changeShow} />
                                         </div>
                                     </div>
                                 </div>
                            </div>
                           
                           
                             

                            <div className="Enable">Enable Gas Token</div>
                            <div className="Enable1" > Connect Wallet</div>
                        </form>
                    </div>

                </div>

                 <div id="COMJ"><div className="Enable2 deep" onClick={Just} >Advanced <ArrowDropDownIcon/></div></div>
                 <div id="COMES"><div className="Enable2 deep" onClick={Just2}  >Advanced <ArrowDropDownIcon/></div></div>

               <div className="Enable3" id="water" >

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
            {isOpen ?

            <div className="feed12 feed21" id="farm">
                <div className="feed22">
                    <form>
                        <div className="feed23">
                      <div className="feed25"><div className="feed24">Select a token</div> <svg onClick={close4} xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-1cchcrx-1 bNKSgQ"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                      <input type="text" placeholder="Search name or paste address"  value={searchTerm} className="feed26" onChange={handleChange}/>
                      <p style={{display:'flex',alignItems:'center',fontWeight:'500'}}>Common bases <span className="feed27">?</span></p>
                      <div className="feed30">

                          {sweet101.map(sde =>( <div className="feed29"  onClick={()=>{setSpeed4(sde.nase); document.body.classList.remove('queen'); document.getElementById('farm').style.display='none';setImage(sde.imgs)}}><img src={sde.imgs} alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>{sde.nase}</span></div>))}
                        
                      </div>
                    </div>

                    <div style={{position:'relative',flex:1,overflow:'auto'}}>
                    <div className="saw2">

                        {/* {sweet.map((ser)=>(<div  onClick={()=>{setSpeed4(ser.bar); document.getElementById('farm').style.display='none'; setImage(ser.img)}} key={ser}className='saw' style={{display:'flex',alignItems:'center',marginBottom:'10px'}}><img src={ser.img} alt="" className="feed28"/><div style={{display:'flex',marginLeft:'10px',flexDirection:'column'}}><span>{ser.bar}</span><span style={{fontSize:'12px',marginTop:'-5px',fontWeight:'300',color:'rgb(110, 114, 125)'}}>{ser.bar1}</span></div></div>)) */}
                                             {searchResults.map((ser)=>(<div  onClick={()=>{setSpeed4(ser.bar); document.body.classList.remove('queen'); document.getElementById('farm').style.display='none'; setImage(ser.img); }} key={ser}className='saw' style={{display:'flex',alignItems:'center',marginBottom:'10px'}}><img src={ser.img} alt="" className="feed28"/><div style={{display:'flex',marginLeft:'10px',flexDirection:'column'}}><span>{ser.bar}</span><span style={{fontSize:'12px',marginTop:'-5px',fontWeight:'300',color:'rgb(110, 114, 125)'}}>{ser.bar1}</span></div></div>))

                        }


                      </div>
                    </div>

                   
                    </form>
                    <div className='saw1'>Manage Token Lists</div>
                </div>
            </div> :null

          }   
          


          {isOpen ?

<div className="feed12 feed21" id="farm1">
    <div className="feed22">
        <form>
            <div className="feed23">
          <div className="feed25"><div className="feed24">Select a token</div> <svg onClick={close5} xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-1cchcrx-1 bNKSgQ"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
          <input type="text" placeholder="Search name or paste address"  value={searchTerm} className="feed26" onChange={handleChange}/>
          <p style={{display:'flex',alignItems:'center',fontWeight:'500'}}>Common bases <span className="feed27">?</span></p>
          <div className="feed30">

              {sweet102.map(sde1 =>( <div className="feed29"  onClick={()=>{ setSpeed5(sde1.nase); document.getElementById('farm1').style.display='none';document.body.classList.remove('queen'); setImage1(sde1.imgs)}}><img src={sde1.imgs} alt="" className="feed28"/><span style={{marginLeft:'8px',fontWeight:'600'}}>{sde1.nase}</span></div>))}
            
          </div>
        </div>

        <div style={{position:'relative',flex:1,overflow:'auto'}}>
        <div className="saw2">

            {/* {sweet.map((ser)=>(<div  onClick={()=>{setSpeed4(ser.bar); document.getElementById('farm').style.display='none'; setImage(ser.img)}} key={ser}className='saw' style={{display:'flex',alignItems:'center',marginBottom:'10px'}}><img src={ser.img} alt="" className="feed28"/><div style={{display:'flex',marginLeft:'10px',flexDirection:'column'}}><span>{ser.bar}</span><span style={{fontSize:'12px',marginTop:'-5px',fontWeight:'300',color:'rgb(110, 114, 125)'}}>{ser.bar1}</span></div></div>)) */}
                                 {searchResults1.map((serr)=>(<div  onClick={()=>{ setSpeed5(serr.bar); document.getElementById('farm1').style.display='none'; document.body.classList.remove('queen'); setImage1(serr.img)}} key={serr}className='saw' style={{display:'flex',alignItems:'center',marginBottom:'10px'}}><img src={serr.img} alt="" className="feed28"/><div style={{display:'flex',marginLeft:'10px',flexDirection:'column'}}><span>{serr.bar}</span><span style={{fontSize:'12px',marginTop:'-5px',fontWeight:'300',color:'rgb(110, 114, 125)'}}>{serr.bar1}</span></div></div>))

            }


          </div>
        </div>

       
        </form>
        <div className='saw1'>Manage Token Lists</div>
    </div>
</div> :null

}   



        </div>
    )
}



export default File;
