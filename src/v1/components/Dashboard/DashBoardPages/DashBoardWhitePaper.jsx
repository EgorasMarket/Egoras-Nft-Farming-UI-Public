import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import "../../../css/dashboardWhitePaper.css";

const DashBoardWhitePaper = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="whitepaper-section">
      <div className="whitepaper_sideBar">
        <a href="#white_layer_1" className="whitepaper_sideBar_cont1">
          1. Abstract
        </a>
        <a href="#white_layer_2" className="whitepaper_sideBar_cont1">
          2. Introduction
        </a>
        <a href="#white_layer_3" className="whitepaper_sideBar_cont1">
          3. EgoDAO Protocol
        </a>
        <a href="#white_layer_3" className="whitepaper_sideBar_cont1">
          4. Tokenization
        </a>
        <a href="#white_layer_4" className="whitepaper_sideBar_cont1">
          5. Smart Properties Approval Governance
        </a>
        <a href="#white_layer_5" className="whitepaper_sideBar_cont1">
          6. Stable Currency
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          7. EgoDao Token Economy
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          8. EUSD
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          9. Functions of EUSD
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          10. Steps to Generate EUSD
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          11. Governance Steps for EUSD Generation
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          12. Distinguishing EGC and EUSD
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          13. Ensuring EGC's Role in EUSD Stability
        </a>
        <a href="#white_layer_6" className="whitepaper_sideBar_cont1">
          14. Conclusion
        </a>
      </div>
      <div className="whitepaper-area">
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}

        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}
        {/* ================================ */}

        <div className="whitepaper-layers">
          <div className="whitepaperHeading">
            EgoDAO: Decentralised credit For Smart Properties
          </div>
          <div className="section whitepaper_layer" id="white_layer_1">
            <h1 className="layer-header">1. Abstract</h1>
            <p className="layer-paragraph1" id="abstract-para">
              An innovative decentralized protocol has been established to
              facilitate structured credit transactions for smart properties,
              specifically focusing on assets such as automobiles. Smart
              properties, characterized by blockchain-controlled ownership
              through smart contracts, enhance trade by mitigating trust issues
              significantly. This breakthrough diminishes instances of fraud,
              minimizes mediation fees, and opens avenues for transactions that
              would otherwise remain unrealized. Notably, this protocol enables
              individuals to lend money securely over the internet, with smart
              properties serving as collateral. This, in turn, fosters increased
              low interest credit for manufacturring smart properties,
              ultimately driving down credit costs. While smart properties are
              traditionally perceived as illiquid due to challenges in rapid
              buying and selling, compounded by the need for intermediaries, the
              integration of blockchain technology allows for the tokenization
              and decentralized trading of properties. This innovation holds the
              potential to revolutionize the speed, efficiency, and transparency
              of property transactions on decentralized exchanges.
            </p>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_2">
            <h1 className="layer-header" id="intro">
              2. Introduction
            </h1>

            <p className="layer-paragraph2">
              The concept of smart property entails the storage of assets on a
              blockchain and their governance through self-executing and
              immutable smart contracts. Once deployed, these contracts remain
              unalterable.
              <br />
              <br />
              The origins of smart property can be traced to the nascent stages
              of Bitcoin. In 2013, the inception of Colored Coins marked a
              significant milestone, aiming to establish a method for
              representing assets on the Bitcoin blockchain. This pioneering
              project laid the foundation for the subsequent evolution of smart
              property within the blockchain landscape.
              <br />
              <br />
              In 2014, the inception of Counterparty marked a pivotal moment,
              empowering users to forge their own tokens within the Bitcoin
              blockchain. These tokens served as versatile representations,
              ranging from digital assets to tangible entities like real estate
              and stocks. Subsequently, in 2015, the Ethereum blockchain was
              introduced, revolutionizing the landscape with the introduction of
              smart contracts. This groundbreaking technology facilitated
              intricate transactions on the blockchain, enabling the creation
              and administration of intelligent properties.
              <br />
              <br />
              The evolution of smart property is evident in contemporary
              safeguards such as immobilizers in automobiles. These devices
              enhance traditional keys through protocol exchanges, ensuring that
              only individuals possessing the correct cryptographic tokens can
              activate the engine. Noteworthy is their substantial impact on
              reducing car theft; in Africa, approximately 28% of cars feature
              immobilizers, yet they constitute only 2% of stolen vehicles.
              Cryptography extends its protective influence to various modern
              possessions—smartphones, for instance, leverage cryptographic
              measures to resist unauthorized access, rendering stolen devices
              functionally inert and safeguarding personal information.
              <br />
              <br />
              While these cryptographic triumphs underscore significant strides,
              the full potential of cryptographically activated property remains
              untapped. Conventionally, the private key resides within a
              physical container like a key or SIM card, impervious to easy
              transfer or manipulation. Smart property disrupts this paradigm by
              enabling ownership to be intermediated through smart contracts.
              The ramifications of integrating smart property into blockchain
              ecosystems are profound; it stands to diminish transactional
              expenses, enhance transparency, fortify security measures, and,
              notably, democratize access to assets that were previously
              confined to a privileged few.
            </p>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}

          <div className="section whitepaper_layer" id="white_layer_3">
            <h1 className="layer-header">3. EgoDAO Protocol</h1>
            EgoDAO Decentralized smart properties refer to automobiles or other
            physical items that are represented and managed on decentralized
            networks, often utilizing blockchain technology and smart contracts.
            Let's break down the key components of this concept:
            <br />
            <div className="sub-texts-para">
              * Decentralized Autonomous Organizations (DAOs): A decentralized
              autonomous organization (DAO) is an entity with no central
              leadership. Decisions get made from the bottom-up, governed by a
              community organized around a specific set of rules enforced on a
              blockchain. DAOs are internet-native organizations collectively
              owned and managed by their members. Decisions are made via
              proposals the group votes on during a specified period. A DAO
              works without hierarchical management and can have a large number
              of purposes.
            </div>
            <div className="sub-texts-para">
              * Smart Properties: These are assets or properties that are
              digitized and represented on a blockchain through the use of smart
              contracts. Smart contracts are self-executing contracts with the
              terms of the agreement directly written into code. They
              automatically execute and enforce the terms of the contract when
              predefined conditions are met.
            </div>
            <div className="sub-texts-para">
              When these concepts are combined, smart properties managed by DAOs
              involve utilizing smart contracts on a blockchain to represent and
              govern ownership, control, and transactions related to those
              properties.
            </div>
            <br />
            Here's a general outline of how it works:
            <div className="sub-texts-para">
              * Ownership and Control: The ownership of smart properties is
              determined and enforced through smart contracts on a blockchain.
              These contracts automatically execute predefined rules based on
              the conditions specified in the code.
            </div>
            <div className="sub-texts-para">
              * Decision-Making: DAO members, who hold tokens or some form of
              voting power, participate in decision-making processes related to
              the smart properties. Proposals can be submitted, and members vote
              on these proposals using their tokens.
            </div>
            <div className="sub-texts-para">
              *Resource Management: DAOs can manage resources associated with
              smart properties, such as funds, maintenance tasks, or upgrades,
              through the execution of smart contracts. These contracts can
              automate the allocation of resources based on the consensus
              reached by DAO members.
            </div>
            <div className="sub-texts-para">
              * Transparency and Immutability: Since all transactions and
              decisions are recorded on a blockchain, there is transparency and
              immutability in the management of smart properties. Once a
              decision is made and recorded in the blockchain, it cannot be
              easily altered or tampered with.
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_4">
            <h1 className="layer-header">4. Tokenization</h1>
            Smart properties can be tokenized, which allows for the creation of
            digital tokens that represent ownership of the property. These
            tokens can be used as collateral for loans, allowing property owners
            to access credit using the value of the property as collateral.
            Tokenization also allows for easier tracking of ownership and
            transactions, which can improve the accuracy of credit assessments.
            <br />
            <br />
            Smart property tokenization stands at the forefront of innovative
            financial instruments, introducing a transformative paradigm in the
            realm of automobile ownership. This groundbreaking approach involves
            the creation of digital tokens that unequivocally represent
            ownership stakes in a given property. The intrinsic value of these
            tokens extends beyond mere representation, as they can be utilized
            as collateral for loans, unlocking new avenues for automobile
            owners/ manufacturers to access credit by leveraging the inherent
            worth of the automobiles.
            <br />
            <br />
            The utilization of property-backed tokens as collateral introduces a
            novel dimension to the financial landscape. Manufacturers ,
            traditionally constrained by conventional lending practices, can now
            harness the latent value embedded in their assets. This not only
            diversifies the options available for securing credit but also
            democratizes access to financial resources, fostering inclusivity in
            the economic ecosystem.
            <br />
            <br />
            One of the key advantages of smart property tokenization lies in its
            ability to streamline the tracking of ownership and transactional
            history. Through binance smart chain that underpins tokenization, a
            transparent and immutable ledger is created. This ledger not only
            ensures the integrity of ownership records but also enables a
            comprehensive audit trail of transactions. The result is a more
            accurate and reliable foundation for credit assessments.
            <br />
            <br />
            The enhanced transparency and traceability inherent in tokenized
            property transactions contribute to a more robust financial
            infrastructure. Lenders can benefit from a comprehensive and
            up-to-date understanding of the asset's history, mitigating risks
            associated with incomplete or inaccurate information. This, in turn,
            facilitates more informed decision-making in the lending process.
            <br />
            <br />
            Furthermore, the tokenization of smart properties aligns with the
            broader trend of digital transformation in the financial sector. It
            integrates seamlessly with emerging technologies, such as
            decentralized finance (DeFi), providing a bridge between traditional
            real estate assets and the rapidly evolving digital financial
            landscape. This not only augments the efficiency of property
            transactions but also positions tokenized properties as a dynamic
            and adaptive asset class in the evolving global financial ecosystem.
            <br />
            <br />
            Smart property tokenization not only revolutionizes ownership
            structures but also redefines the dynamics of property-based
            financing. By enabling property owners to unlock the value of their
            assets and enhancing the accuracy of credit assessments, this
            innovative approach has the potential to reshape the landscape of
            manufacturing finance, fostering a more inclusive and resilient
            financial ecosystem.
            <br />
            <br />
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_5">
            <h1 className="layer-header">
              5. Smart Properties Approval Governance
            </h1>
            The current manufacturing sector through traditional banks and these
            organisations approve loans for borrowers after proper due diligence
            have been carried out, but the Egodao protocol uses a crowdsourced
            knowledge to approve or decline production of smart properties. The
            people vote if the smart properties should be approved or declined,
            and the people also share in the risk of the loans.
            <br />
            <br />
            Egodao holders approve this loan within after a certain threshold is
            reached. Data are provided for EGC holders to make the correct
            governance decisions and the votes are determined by the voting
            weight (vote weight is determined by the amount of EGC token locked
            in the smart contract).
            <br />
            <br />
            Egoras holders share in the risk of the loans, and they are rewarded
            for their participation in the governance process by receiving all
            interest accruing from the loans. 
            <br />
            <br />
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_6">
            <h1 className="layer-header">6. Stable Currency </h1>
            The biggest hurdle to the use of cryptocurrencies as a meduim of
            exchange is its volatility. People are unlikely to want to buy a
            volatile cryptocurrency to use it for payment or accept a volatile
            cryptocurrency for loans, since the purchasing power of their
            accounts would fluctuate widely with market demand for the currency.
            Merchants who accept cryptocurrencies are likely to convert to fiat
            upon payment, because their business model does not involve
            speculating on cryptocurrencies. And the most successful
            cryptocurrencies today are not just volatile but deflationary –
            their success leads to their price rising; as a result, prices
            denominated in the currency fall. Rational behaviour would be to use
            such currencies as a store of value rather than a medium of
            exchange, and in practice that is what has happened. Stable-value
            cryptocurrencies would bring a number of benefits to the
            cryptocurrency ecosystem. For one, stable prices remove a
            considerable barrier for using cryptocurrencies as a
            medium-of-exchange; salaries, prices of goods, fixed obligations,
            can all be set in a stable value cryptocurrency without requiring
            either party to speculate on the future value of the currency.
            Further, financial contracts are more easily built with a stable
            value coin, because the issuer can separate the function of the
            contract from the price risk of the currency in which it’s
            denominated. While a single stable-value currency would be helpful,
            a thriving cryptoeconomy is best-served by a family of stable-value
            currencies, much as it is well-served by the family of
            variable-value cryptoassets that we have today. Certainly a
            cryptocurrency pegged to the US Dollar has several uses, from social
            payments in the US, to user-initiated dollarization in
            hyper-inflationary markets, to the efficient settlement of
            high-frequency crypto-asset trades. At the same time, a
            cryptocurrency pegged to the Euro would also be useful for many
            purposes, as would a cryptocurrency pegged to the price of a basket
            of goods in Greece, as would a cryptocurrency pegged to the price of
            a barrel of oil, or housing in San Francisco. Stable-value local,
            regional, and utility currencies allow people to hedge price risk in
            their lives by denominating a portion of their personal economy in
            currencies that are stable vis-a-vis the price of the goods they
            regularly use.
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_7">
            <h1 className="layer-header">7. EgoDao Token Economy</h1>
            The EgoDAO Protocol operates in conjunction with four distinct types
            of tokens:
            <br />
            <div className="sub-texts-para">
              * EUSD: This stable cryptocurrency functions as a viable medium
              for both holding and spending, comparable to traditional stable
              fiat currencies such as the United States Dollar.
            </div>
            <div className="sub-texts-para">
              * EGC: Serving as the utility token for the EgoDAO protocol, EGC
              plays a pivotal role in facilitating the stability of EUSD.
            </div>
            <div className="sub-texts-para">
              * Smart Property Tokens & Collateral Tokens: These tokens
              represent various assets securely held within smart contracts,
              acting as a backing mechanism for the value of EUSD. This approach
              mirrors historical practices, such as when the US government
              anchored the value of the US dollar with gold. The protocol is
              meticulously designed to maintain collateral tokens equivalent to
              or exceeding 100% of the value of all EgorasUSD tokens. Notably,
              many collateral tokens will represent tokenized real-world assets,
              including but not limited to automobiles. The initial portfolio
              will exhibit simplicity and is poised to diversify gradually over
              time, embracing an expanding array of tokenized asset classes.
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_8">
            <h1 className="layer-header">8. EUSD</h1> The EUSD Stablecoin
            represents a decentralized, collateral-backed cryptocurrency pegged
            to the United States Dollar. Operating on the Ethereum blockchain,
            EUSD is compatible with any BSC wallet, providing users with
            flexibility in storage. Much like the U.S. Dollar, EUSD is designed
            for seamless spending. Manufacturers, exemplified by Egoras,
            generate EUSD by initiating a loan request within the Egoras
            microfinance protocol. These loans are earmarked for the production
            of smart properties, such as automobiles. The approval or rejection
            of the loan request rests with EGC holders, who play a crucial role
            in the decision-making process. Upon approval, the loan generates
            EUSD, which is then transferred to the manufacturer's wallet.
            Alternatively, users have the option to acquire EUSD through
            exchanges or receive it as a form of payment. Notably, each unit of
            EUSD in circulation is over-collateralized, indicating that the
            value of the collateral surpasses the value of the EUSD debt. All
            transactions involving EUSD are transparently recorded on the
            Binance Smart Chain, providing a public record of the token's
            circulation and ensuring accountability within the system.
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_10">
            <h1 className="layer-header"> 9. Functions of EUSD</h1>

            <div className="sub-texts-para">
              * Store of Value: Stablecoins, characterized by lower volatility
              levels, serve as reliable stores of value over extended periods.
              EUSD is purposefully designed to uphold and preserve value for an
              extended duration.
            </div>
            <div className="sub-texts-para">
              * The Medium of Exchange: Stablecoins play a pivotal role in
              facilitating the broader adoption of cryptocurrencies by local
              businesses, mitigating the risks associated with volatility. This,
              in turn, fosters the exchange of goods and services for
              cryptocurrency. EUSD is poised to be utilized by small businesses
              in the exchange of goods and services, contributing to its
              function as a medium of exchange.
            </div>
            <div className="sub-texts-para">
              * Unit of Account: EUSD facilitates pricing through its pegging
              mechanism, currently pegged at 1 USD (1 EUSD = 1 USD). Although
              EUSD is not universally recognized as an independent unit of
              account globally, it functions as a unit of account within the
              Egoras microfinance protocol. This specific pegging allows for
              consistency in valuation within the protocol.
            </div>
            <div className="sub-texts-para">
              * Lending: Within the Egodao protocol, EUSD serves as a means to
              settle debts. Its role in lending underscores its practical
              utility within the protocol, contributing to the overall
              functionality and financial operations of the system.
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_10">
            <h1 className="layer-header"> 10. Steps to Generate EUSD</h1>

            <div className="sub-texts-para">
              * Initiate Partnership Request: Manufacturers that are legally
              registered have the opportunity to establish a partnership with
              the Egodao protocol by completing a comprehensive partnership
              form, providing detailed information about their organization.
            </div>
            <div className="sub-texts-para">
              * Approval/Declination Process: The decision-making authority lies
              with EGC holders who carefully assess and curate partnership
              requests from manufacturers seeking to become lending partners.
              The EGC holders exercise their discretion in either approving or
              declining partnership requests from these organizations.
            </div>
            <div className="sub-texts-para">
              * Submission of Loan Requests: Once a manufacturer's partnership
              request is approved, they gain the ability to submit loan requests
              through the Egodao protocol. EGC holders then play a pivotal role
              in determining the approval or rejection of these loan requests.
              In the event of approval, the organization receives EUSD in their
              designated organizational wallets.
            </div>
            <div className="sub-texts-para">
              * Debt Repayment Obligation: Following the approval and
              disbursement of EUSD, the manufacturer is obligated to initiate
              the repayment process. This involves settling the generated EUSD
              along with the accrued interest fee that continues to accumulate
              on the outstanding debt until fully repaid.
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}

          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_10">
            <h1 className="layer-header">
              {" "}
              11. Governance Steps for EUSD Generation
            </h1>
            <br />
            Validate Manufacturers' Partnership Requests:
            <div className="sub-texts-para">
              * Evaluate and make informed decisions on manufacturers'
              partnership requests.
            </div>
            <div className="sub-texts-para">
              * Examine the provided documents from these organizations
              meticulously before approving or declining their partnership
              requests.
            </div>
            <br />
            Validate Loan Requests:
            <div className="sub-texts-para">
              * Thoroughly review the loan requests submitted by organizations.
            </div>
            <div className="sub-texts-para">
              * Engage with the lending team by posing relevant questions to
              gain a deeper understanding of the borrower.
            </div>
            <div className="sub-texts-para">
              * Make well-informed decisions regarding the approval or
              declination of the loan requests.
            </div>
            <br />
            Claim Your Rewards:
            <div className="sub-texts-para">
              * Participate in claiming rewards generated through the
              inflationary monetary policy.
            </div>
            <div className="sub-texts-para">
              * Access interest accrued from debt held by businesses utilizing
              EUSD.
            </div>
            <div className="sub-texts-para">
              * Align with the governance structure to ensure a fair and
              transparent distribution of rewards.
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          {/* ==================== */}
          <div className="section whitepaper_layer" id="white_layer_13">
            <h1 className="layer-header"> 12. Distinguishing EGC and EUSD: </h1>
            While EUSD serves as a stablecoin ideal for transactions and
            savings, EGC, on the other hand, operates as a token characterized
            by its price volatility, attributed to its unique supply mechanics
            and role within the Egodao protocol. EGC, fundamentally, functions
            as a governance token.
            <br />
            Governance Token Role: As a governance token, EGC empowers token
            holders to actively participate in voting processes crucial for
            managing risks and determining the business logic of the Egodao
            Protocol. Effective risk management is vital for the protocol's
            success, involving voting on specific risk parameters tailored to
            each loan and lending partner. Rigorous parameter setting is
            essential to align with the risk profiles inherent in the system.
            The governance voting process employs continuous approval voting,
            allowing every EGC holder to vote for proposals using their EGC
            holdings. This democratic approach permits the submission of new
            proposals or the withdrawal of votes at any point in time. The
            proposal garnering the most votes becomes the "top proposal,"
            activating changes to the risk parameters within the system. The
            governance system includes a user-friendly app, facilitating
            seamless voting through platforms like Metamask, Ledger, and
            Fortmatic. Future enhancements are planned, including features such
            as vote delegation to a proxy voter and secure voting with EGR
            stored in cold storage. Effective governance ensures the Egodao
            credit system remains adopted and consistently overcollateralized.
            <br />
            Utility Token Role - EGR: In contrast, EGR, functioning as a utility
            token, is indispensable for covering inventory fees associated with
            loans used to generate EUSD in the Egodao Protocol. Notably, only
            EGC has the capability to settle these fees, and upon payment, the
            EGC is systematically burned, reducing its overall supply. The
            increasing adoption and demand for EUSD and the Egoras Credit system
            consequently lead to elevated demand for EGC, driven by its
            essential role in fee payments. Simultaneously, the supply of EGC
            decreases through the burning process, aligning with the dynamics of
            increased adoption and demand.
          </div>

          {/* ========================= */}
          {/* ========================= */}
          {/* ========================= */}
          {/* ========================= */}
          <div className="section whitepaper_layer" id="white_layer_10">
            <h1 className="layer-header">
              {" "}
              13. Ensuring EGC's Role in EUSD Stability
            </h1>
            <br />
            In maintaining the stability of EUSD, EGC plays a pivotal role
            through a dynamic mechanism that responds to market fluctuations.
            When demand for EUSD decreases, causing a decline in prices on
            secondary markets, a corrective process unfolds. Here's how EGC
            facilitates this stability:
            <br />
            Arbitrage in Price Decline:
            <div className="sub-texts-para">
              * In scenarios where the market price of EUSD on secondary markets
              falls below the redemption price (e.g., $0.98 versus the
              redemption price of $1.00), arbitrageurs are prompted to
              intervene.
            </div>
            <div className="sub-texts-para">
              * Arbitrageurs seize the opportunity to purchase undervalued EUSD
              on the open market and redeem it through the Egoras smart contract
              for the full redemption price in either EGC or eNFTs, which serves
              as an incentive.
            </div>
            <br />
            Market Correction Mechanism:
            <div className="sub-texts-para">
              * Arbitrageurs engage in a process of buying on open markets until
              the market price aligns with the redemption price of $1.00.
            </div>
            <div className="sub-texts-para">
              * This corrective mechanism ensures that the market price
              converges with the redemption price, as arbitrage opportunities
              diminish when the market price matches the stipulated redemption
              price.
            </div>
            <br />
            Reverse Mechanism in Demand Surge:
            <div className="sub-texts-para">
              * Conversely, when demand for EUSD rises, causing the market price
              to exceed the redemption price (e.g., $1.02), a reverse mechanism
              comes into play.
            </div>
            <div className="sub-texts-para">
              * Arbitrageurs are enticed to acquire newly minted eUSD tokens for
              the standard redemption price of $1.00 using either collateral or
              EGC tokens (if there is an excess pool of eUSD tokens available).
            </div>
            <div className="sub-texts-para">
              * The acquired tokens are promptly sold on the open market, and
              this process continues until the market price aligns with the
              purchase price of $1.00.
            </div>
            <br />
            This dynamic arbitrage mechanism, responding to both decreases and
            increases in demand, ensures that the market price of EUSD remains
            in equilibrium with its fundamental value, reinforcing stability
            within the system.
          </div>

          {/* ========================= */}
          {/* ========================= */}
          {/* ========================= */}
          {/* ========================= */}
          <div className="section whitepaper_layer" id="white_layer_15">
            <h1 className="layer-header"> 14. Conclusion:</h1>
            Elevating Financial Solutions with Egodao Protocol.
            <br />
            <br />
            The Egodao protocol stands as a robust and transparent platform
            designed for the effective management of smart properties.
            Leveraging blockchain technology and smart contracts, it adeptly
            tackles compliance and fraud concerns, ensuring a secure environment
            for property management. Egodao smart properties, in particular,
            usher in a range of benefits, surpassing traditional property
            dynamics with enhanced security, transparency, automation,
            efficiency, and the introduction of fractional ownership.
            <br />
            <br />
            Addressing the intricate challenges prevalent in manufacturers'
            finance, the Egodao microfinance protocol emerges as a strategic
            solution. It navigates obstacles such as exorbitant interest rates,
            unwarranted dependency on banks, and the peril of over-indebtedness.
            <br />
            <br />
            Crucially, the Egodao protocol extends a unique opportunity for
            manufacturers by providing zero-interest-rate loans in eUSD. This
            transformative approach involves converting smart properties into
            digital assets, represented on the blockchain as NFTs. This not only
            reshapes the financial landscape for manufacturers but also
            introduces a novel dimension to the representation and
            transferability of assets. The decentralized nature of eUSD, a
            stablecoin at the core of this ecosystem, adds a layer of autonomy
            and trustlessness. Unlike traditional currencies, eUSD is not
            subject to issuance or administration by any centralized entity,
            trusted intermediary, or counterparty. Its unbiased and borderless
            nature ensures accessibility to individuals globally, reinforcing
            the ethos of decentralization and inclusivity within the Egodao
            ecosystem.
          </div>
          {/* ========================= */}
          {/* ========================= */}
          {/* ========================= */}
          {/* ========================= */}
        </div>
      </div>
    </section>
  );
};

export default DashBoardWhitePaper;
