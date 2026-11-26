---
title: 'LNP/BP: A gentle introduction'
description: 'LNP/BP: A gentle introduction (originally published at AlzaShop)'
date: 2020-07-21
permalink: /lnp-bp-a-gentle-introduction/
image: /covers/lightning.jpg
language: en
type: text
topics: ['bitcoin', 'lightning', 'rgb']
---

LNP/BP: A gentle introduction

_(originally published at_ [AlzaShop](https://web.archive.org/web/20220326001519/https://m.alzashop.com/lnp-bp-lightning-netowrk-and-bitcoin-protocols)_)_

The Lightning Network is a relatively new and quickly developing system that promises cheap, fast and private payments on top of Bitcoin. It’s already working in production, many people use it daily. But is that all? What if that was just the tip of some technological iceberg? What if what lies beneath the surface has a chance to significantly affect some parts of the Internet as we know it? Does that sound crazy? Maybe it is, but bear with me for a little while.

![](/img/articles/bitcoin-lightning-network-protokoly-1024x397.jpg)

### Introduction

Let’s start by addressing the mysterious acronym “LNP/BP”. It became fairly common, in the last year, to see some Bitcoin enthusiasts flaunting it around: I have it in [my Twitter bio](https://web.archive.org/web/20220326001519/https://twitter.com/giacomozucco), and so do other fellow Bitcoiners (for a few random examples see [here](https://web.archive.org/web/20220326001519/https://twitter.com/ElkimXOC), [here](https://web.archive.org/web/20220326001519/https://twitter.com/kiwilambnz), [here](https://web.archive.org/web/20220326001519/https://twitter.com/privacyhalt), [here](https://web.archive.org/web/20220326001519/https://twitter.com/OlUkolova), [here](https://web.archive.org/web/20220326001519/https://twitter.com/thedavidcoen), [here](https://web.archive.org/web/20220326001519/https://twitter.com/weedcoder), [here](https://web.archive.org/web/20220326001519/https://twitter.com/VNumeris), or [here](https://web.archive.org/web/20220326001519/https://twitter.com/kixunil)). I also entered a long and noisy [Twitter-quarrel](https://web.archive.org/web/20220326001519/https://twitter.com/giacomozucco/status/1149322490298195969?s=20) with my friend [Vortex](https://web.archive.org/web/20220326001519/https://twitter.com/theonevortex) about the use of this “LNP/BP” meme over the less accurate “BTC/LN” one (which he used to prefer in order to express the same basic concept…before eventually [capitulating](https://web.archive.org/web/20220326001519/https://twitter.com/theonevortex/status/1186393121686343680) to my annoying insistence).

![](/img/articles/lnp-bp-twitter-590x1024.jpg)

_Search for the LNP/BP acronym on Twitter to select the noble users who deserve to become your new best friends (block and report everyone else)._

It doesn’t actually stop at Twitter, for me: together with [Maxim Orlovsky](https://web.archive.org/web/20220326001519/https://twitter.com/dr_orlovsky) I even decided to use it as the name of a small non-profit association, created to sponsor the development of Bitcoin-related R&D projects (including [RGB](https://web.archive.org/web/20220326001519/https://github.com/LNP-BP/rgb-node), [Magical](https://web.archive.org/web/20220326001519/https://github.com/MagicalBitcoin/), [Proofmarshall](https://web.archive.org/web/20220326001519/https://github.com/petertodd/proofmarshal), [Storm](https://web.archive.org/web/20220326001519/https://github.com/storm-org/storm-spec), [Lightspeed](https://web.archive.org/web/20220326001519/https://github.com/LNP-BP/lnpbps/issues/24), and others).

![](/img/articles/lnp-bp-github-1024x520.jpg)

_The GitHub repository of the LNP/BP non-profit organization._

But what do we really mean with this acronym? It’s trivial to see an attempt to exploit the parallelism between Bitcoin and the Internet: more specifically the [Internet protocol suite, known as “TCP/IP”](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Internet_protocol_suite). It clearly has something to do with a “layered architecture”, as opposed to a “monolithic” one…but which are, exactly, the “layers” of Bitcoin? There seems to be a lot of confusion (at the very least terminological, but possibly also conceptual) around them. Is the entire Lightning Network truly Bitcoin’s “layer 2”? What is, then, a sinlge Lightning channel? Is the Liquid federation really a “layer 1.5”, as sometimes claimed, or is it maybe more like an “imaginary layer i”, [as I half-jokingly objected](https://web.archive.org/web/20220326001519/https://twitter.com/giacomozucco/status/1155971820983447552?s=20)? If strong federations are “layers”, are also multi-sig cold storages of custodial exchanges so? And what about state-chains, or channel factories, RGB-assets, op-return-based writing systems? Is all this hype about “layer 3” systems just meaningless noise, like “web 3”?

![](/img/articles/lnp-bp-meme.jpg)

_Trying to keep up with what actually is, or isn’t, a “second layer” is starting to become a little confusing._

The goal of this article is to try to summarize, clarify, and systematize the discussion about the “LNP/BP” meme, hopefully reducing the level of confusion.

### Layers before Bitcoin

The concept of [“abstraction layer”](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Abstraction_layer) is obviously older than Bitcoin. In general, thinking about “layers” as a mental model is useful to label all those complex systems that can be meaningfully divided into an ordered series of subsystems, each one strictly dependent on the ones coming before: this is why the analogy is made with a vertical juxtaposition, where things that are “above” stand on the shoulders of other things “below”, the latter being usually more difficult to safely touch, move or change than the former (like with different floors of a [Jenga tower](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Jenga)).

![](/img/articles/lnp-bp-layers.jpg)

_It’s layers all the way down (layers are the new turtles)_

A very good example of this analogy, older than the Internet itself, can be found in Architecture, where the different [“shearing layers”](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Shearing_layers) of a single building represent independent aspects of it, each one evolving in different timescales, with different longevity.

![](/img/articles/lnp-bp-shearing-layers.jpg)

_Sharing layers in a building_

In computer science we can see an obvious example of the concept in the hardware/software duality (sometimes with additional intermediate layers known as middleware, firmware, etc.), where an underlying, complex, physical configuration of electronic components can be also described in a more abstract and simple way, as some functionally interesting “informational configuration”.

![](/img/articles/lnp-bp-layers-computers.jpg)

_Random triangle with computer-science-sounding layers_

The 4-layer TCP/IP model is probably the best known example of layered architecture, together with its “academic/bureaucratic” competitor, the 7-layer [OSI model](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/OSI_model). Within the OSI model we have a “layer 1”, also known as “physical”, transmitting actual raw bit-streams; a “layer 2”, aka “datalink”, defining the serialization format of data; a “layer 3”, aka “network”, deciding the routing path that the data will take; a “layer 4”, aka “transport”, managing transmission protocols; a “layer 5”, aka “session”, maintaining connections and controlling ports and sessions; a “layer 6”, aka presentation, managing data format and encryption; a “layer 7”, aka “application”, managing the final human-computer interactions.

![](/img/articles/lnp-bp-osi-layers-1024x833.jpg)

_Comparison of layers in the ISO/OSI model and the TCP/IP model._

The same mental model is also somewhat consistently reused in many sub-fields, from OpenGL rendering to Object-oriented programming, always in relation to the concepts of [information hiding](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Information_hiding), encapsulation, tunneling, modularity, standardization, reuse, inhomogeneous time-dependency, security through insulation, etc.

### “Reinterpretation Layers” in Bitcoin

In the context of Bitcoin, the term “layers” got initially mentioned in the usual Internet-related meaning, in connection to information overlays to communicate blocks and transactions across nodes and miners (see examples [here](https://web.archive.org/web/20220326001519/https://bitcointalk.org/index.php?topic=8379.0) and [here](https://web.archive.org/web/20220326001519/https://bitcointalk.org/index.php?topic=55822.40)).

![](/img/articles/lnp-bp-bitcointalk-1024x320.jpg)

_The first mention I found on Bitcointalk about “new layers on top of Bitcoin”._

A new meaning for the expression “layers on top of Bitcoin” started to emerge around the [announcement](https://web.archive.org/web/20220326001519/https://bitcointalk.org/index.php?topic=265488.0), in 2013, of the “Mastercoin” protocol (today called [“Omni-layer”](https://web.archive.org/web/20220326001519/https://www.omnilayer.org/) after a re-branding made necessary by the typical delivery, governance, and transparency problems that always follow “ICOs” by centralized “Foundations”).

![](/img/articles/lnp-bp-meme-dawg.jpg)

_Sorry, Mastercoin friends…but you know this is true._

Mastercoin was a protocol that allowed some (valid) Bitcoin transactions to be also reinterpreted through the “lenses” of an additional semantic, which allowed the issuance of custom digital assets (representing for example IOUs, shares, options, royalties, voting rights, collectibles, certificates, etc.) and the creation of complex contracts (enabling for example atomic p2p exchange, gambling, financial derivatives, dividend distribution, etc.). J.R. Willett, its main developer, [explained it with these words](https://web.archive.org/web/20220326001519/https://www.forbes.com/sites/kashmirhill/2014/06/03/mastercoin-maidsafe-crowdsale/#50d8d923207d): “We’re a protocol layer on top of Bitcoin, adding extra features. We use Bitcoin like email uses the underlying layer of TCP/IP.”

![](/img/articles/lnp-bp-meme-doge.jpg)

_MasterDoge: a second layer on top of the Dogecoin Standard (this banner was sponsored by Elon Musk)_

Other projects reinforcing this definition of “second layer” followed closely: from Counterparty (very similar to Mastercoin, but without the shady ICO model) to many Colored Coin ideas (segregating the issued-asset representation on the upper abstraction layer from the contract dynamics, delegated back “below” to Bitcoin’s native scripting system). The generic name for these experiments, back then, was typically “Bitcoin 2.0 protocols”. In a [well-written blog-post](https://web.archive.org/web/20220326001519/https://blog.ethereum.org/2014/11/13/scalability-part-3-metacoin-history-multichain/), the young journalist-to-be-ICO-launcher Vitalik Buterin labeled them “meta-protocols” (arguably not a very clean choice, since the expression already indicates [something completely different](https://web.archive.org/web/20220326001519/https://en.wiktionary.org/wiki/metaprotocol): a protocol used to define other protocols). But the expression “layer 2 protocols” was also pretty common.

![](/img/articles/lnp-bp-buzztalk.jpg)

_Lol, remember all those “Bitcoin 2.0” conferences?_

Since they usually leverage the [“OP\_RETURN”](https://web.archive.org/web/20220326001519/https://en.bitcoin.it/wiki/OP_RETURN) script opcode within Bitcoin transactions, these protocols could actually be considered as “layer 3”, while their layer 2 would be the interpretation of the information payload in the opcode itself, which could be also used for something simpler than digital asset schemes. A historical example would be the [Eternity Wall](https://web.archive.org/web/20220326001519/https://blog.eternitywall.com/2016/01/19/how-to-sign-messages-on-eternity-wall/) mobile app (discontinued since the [creator](https://web.archive.org/web/20220326001519/https://twitter.com/RCasatta) honestly acknowledged the absolute [un-scalability of the method](https://web.archive.org/web/20220326001519/https://www.youtube.com/watch?time_continue=8029&v=Gzg_u9gHc5Q&feature=emb_logo), pivoting to OpenTimestamps notarization instead) where you could also answer and “like” other people’s messages, in a simple but effective “Social Network on the Blockchain” (not unlike the few examples that shitcoiners are still shilling today as a scalable idea, which it of course isn’t).

![](/img/articles/lnp-bp-etenity-wall.jpg)

_Eternity Wall was not scalable, but it was cool._

We could call this particular conceptualization “reinterpretation layer” or “infrastructure reuse”. Every “event” of the second layer is an actual valid and confirmed Bitcoin transaction within the first layer, reinterpreted in a higher-order semantic to mean something more than a simple bitcoin transfer. The economic asset bitcoin (with the “b”) is not necessarily reused, while the technological infrastructure Bitcoin (with the “B”) is leveraged in order to move more assets around.

### “Omission Layers” in Bitcoin

A second, completely distinct use of the expression “second layer on top of Bitcoin” emerged within the debate about the several problems created by the fact that Bitcoin has been originally conceived a “global consensus” protocol. While indisputably brilliant, Bitcoin’s decentralized solution to the double-spending problem, the “Timechain”, is inherently impossible to scale. It assumes that every node in the network must forever keep track of everything: every single on-chain transaction must be downloaded and verified by every actor who will use the system for its entire history, even far into the future. This also implies serious privacy and fungibility limitations, enabling any kind of forensic analysis and deanonymization attempt.

![](/img/articles/lnp-bp-timechain.jpg)

_I recycled this meme from the Discovering Bitcoin series, but you have to admit it’s just too perfect to not reuse it._

There aren’t trivial solutions: if you strictly limit size and frequency of blocks in the [Timechain](https://web.archive.org/web/20220326001519/https://cryptoinsider.media/timechain-satoshis-original-vision-blockchain-bitcoin/), then the validation burden for all the nodes may remain manageable, but the “block-space” supply will leave so much demand unsatisfied that transaction fees and waiting times will increase a lot. If, on the other hand, you allow size and frequency to grow, then the “block-space” price will decrease, but the increasing costs of running nodes will centralize the topology of the entire system.

![](/img/articles/lnp-bp-meme-red-button.jpg)

_Difficult trade-offs (and difficult to read verbose memes)._

There’s a clever, nontrivial way to mitigate the fundamental limits of global consensus systems, without sacrificing its decentralization: migrating some of the activity over a trustless and permissionless “second layer”. Most users can just refrain from committing every transaction to a block until that’s strictly necessary, keeping most of the traffic off the public Timechain, only using the latter for conflict resolution or periodic settlement. The most famous example of this kind of approach is without any doubt the Lightning Network: a system where valid Bitcoin transactions can be locally transmitted between couples of peers and concatenated in “routing paths”, as opposed to broadcast and committed to the Timechain, in order to route value between payers and payees, at the edges of the paths.

![](/img/articles/lnp-bp-meme-hot.jpg)

_Self-explanatory meme._

The idea is somehow similar to the way people use courts and contracts in common-law systems: courts can create publicly binding precedents, reaching some sort of “legal global consensus,” but they are comparatively slow, expensive and bad for privacy, so most trading parties usually only sign private contracts, asking courts to verify and enforce them only when conflicts arise or when some periodic public audit is due. Advanced Bitcoin scripts can be used to keep the operation trust-minimized: unlike actual legal trials, the process of Timechain-settlement can avoid human bias and corruption, relying mostly on cryptography, incentives, and code.

![](/img/articles/lnp-bp-meme-3.jpg)

_Incentives and cryptography are always better than lawyers and judges, including when you are deciding who to invite to a party._

The Lightning Network is not the only example of this kind: also the off-band interactions among peers needed to prepare advanced contracts like CoinJoin, PayJoin, or CoinSwap (and in the future also hopefully different kinds of Signature Aggregation) could be considered as happening on a second layer, with only some parts actually hitting the Timechain, depending on the scenario.

![](/img/articles/lnp-bp-i-o-1024x262.jpg)

_Nice illustration of (intra-input) signature-aggregation (the cross-input one will be even nicer)._

We could call this particular conceptualization “omission layer” or “asset reuse”. Every “event” of the second layer is an actual bitcoin transfer that can eventually be settled on the first layer, crafted in a way to guarantee acceptable levels of security, even if most of the Bitcoin transactions used to accomplish this goal aren’t actually broadcasted to the entire network and confirmed to the Timechain. The technological infrastructure Bitcoin (with the “B”) is not necessarily reused, while the economic asset bitcoin (with the “b”) is leveraged in order to mediate more value transfers.

### Difference with Credit

It’s interesting to notice how these “off-chain” solutions may somehow resemble the institution of credit systems in the context of commodity-money. The use of physical gold, for example, was very difficult to scale (even if for different reasons entirely with respect to Bitcoin): precious metal coins were very expensive to store, transfer, and verify. That’s why, since the Middle Ages, people started to store, transfer, and verify, instead of physical gold, “paper gold” certificates issued by trusted third parties, to be redeemed only when needed. At the peak of the Gold Standard Era, it was possible to subdivide the global monetary system into at least three different “layers”: physical gold, sometimes traded directly by some final users, but more often kept as a reserve by central banks; central bank notes, mostly held by commercial banks; commercial bank notes, directly traded by most final users.

![](/img/articles/lnp-bp-usd-bank-note-1024x874.jpg)

_Gold certificates on paper…not bad, if you don’t have anything better._

Ironically, while the foundational “layer 1” has disappeared from the modern fiat system (central bank certificates aren’t redeemable in anything anymore), there has been a proliferation of new “layers” in the upper section of the tower. As an example, when final users today pay via some “FinTech” application like PayPal, Venmo, GPay, AliPay, or ApplePay, they operate on a technical “layer 6”, which is mostly based on traditional banking relationships under the hood, which in turn represent a “layer 5” on top of a network of international corresponding banks, which are “layers 4” on top of the local central banks acting in legal monopoly within their jurisdictions, which are but a “layer 3” on top of the more fundamental “layer 2” of the Federal Reserve of the United States of America (again: the “layer 1” is sadly missing: no physical gold redeemability anymore).

![](/img/articles/lnp-bp-meme-brrr-1024x538.jpg)

_The Fiat Standard in one picture._

Despite this superficial similarity, it’s important to clarify that the currently dominant notion of “second layer” in Bitcoin is actually something very different from the “credit-layerization” of previous monetary systems! Lightning transactions, for example, are not in any way promises of future transactions, or “credit” created by some trusted third party. They are actual, completely valid Bitcoin transactions, that may be effectively broadcast and committed to the Timechain when and if needed, with strong safety and fairness guarantees based on game theory and cryptography, as opposed to social reputation, legal liability or direct trust!

![](/img/articles/lnp-bp-meme-meme-4.jpg)

_Lighting Network bitcoins are not bitcoin-denominated credit, they are bitcoins._

That such kind of trust-minimized second layer could even exist, is not something that Bitcoin pioneers could actually take for granted! A typical example is the way the Bitcoin-legend [Hal Finney](https://web.archive.org/web/20220326001519/https://twitter.com/halfin/status/1110302988) was imagining the future of Bitcoin scaling, after almost 2 years since the system’s inception: a mix of the trustless but unscalable layer 1 with a competitive network of scalable but trust-based [“Bitcoin banks”](https://web.archive.org/web/20220326001519/https://bitcointalk.org/index.php?topic=2500.msg34211#msg34211). It was something unexpected when [Satoshi Nakamoto himself](https://web.archive.org/web/20220326001519/https://github.com/trottier/original-bitcoin/blob/master/src/main.cpp#L434) came up with the embryonal idea of what is now known as an “off-chain payment channel”: a second layer which was not based on some trusted third party, but on self-enforcing mechanisms. The [original construction](https://web.archive.org/web/20220326001519/https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2013-April/002417.html) devised by Satoshi was defective, so it took some more years to developers like [Jeremy Spillman](https://web.archive.org/web/20220326001519/https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2013-April/002433.html), [Christian Decker](https://web.archive.org/web/20220326001519/https://link.springer.com/chapter/10.1007/978-3-319-21741-3_1), and [Joseph Poon](https://web.archive.org/web/20220326001519/https://lists.linuxfoundation.org/pipermail/lightning-dev/2015-July/000018.html) to fix the concept, and to merge it with the complementary concept of “atomic credit routing” (which was even pre-existent to Bitcoin itself, see as an example the original Ripple project) to create the current Lightning Network. And this evolutive process still hasn’t come to an end: see as an example the [Eltoo proposal](https://web.archive.org/web/20220326001519/https://blockstream.com/2018/04/30/en-eltoo-next-lightning/).

![](/img/articles/lnp-bp-bitcoin-talk-hal-1024x229.jpg)

_Arguments from authority are always wrong…except for Hal Finney…if Hal says so, then it proves my point._

Trust-based “layers” to store and transact the bitcoin asset can still exist (and in fact they do: that’s what most online exchange are today), but it’s a completely distinct kind of “layerization” from the one that the Lightning Network embodies. In the former, the asset is not exactly bitcoin, but bitcoin-denominated credit. In the latter, actual bitcoins are moved within valid transactions, which just happen to follow a different anti-double-spending strategy than immediate global-consensus publication.

### Hybrid Ideas

Of course, the distinction between trust-based social “layers” and trust-minimized technical “layers” is not always clear-cut and unambiguous. On one hand, for example, a peer withing the Lightning Network could decide to establish a payment channel with reduced cryptographic or game-theoretical guarantees, if the counterpart (for example a huge liquidity hub in the network, connected with a famous and reputable financial service) is sufficiently known and reputable. On the other hand, a traditional, full-custodial exchange could decide to somehow increase the reasons for its customer to trust it, open-sourcing the technical details of their (possibly multi-sig and HSM-based) cold-storage procedures and implementing sophisticate strategies of “proof or reserve”, “proof of solvency”, and “proof of ownership”, based on cryptographic guarantees that anybody could independently verify. In between these extremes, a number of different compromises are possible, blurring the line between trust-based social layers and trust-minimized technical layers: [Statechains](https://web.archive.org/web/20220326001519/https://medium.com/@RubenSomsen/statechains-non-custodial-off-chain-bitcoin-transfer-1ae4845a4a39) could replace the typical Dryja-Poon channels within some particular Lighting Network topologies, while some custodial exchanges could evolve their safe and cryptographically-provable procedures into full-fledged [dynamic strong federations](https://web.archive.org/web/20220326001519/https://github.com/ElementsProject/elements/commit/5b2fe5563b0fbd610d00b0b8ae15fa5d720bea9f).

![](/img/articles/lnp-bp-obfuscation-layers-v2.jpg)

“Omission” vs Credit layers (plus hybrids).

Some hybridization is also possible between the “Reinterpretation-layers” and the “Omission-layers” discussed above: for example the [RGB project](https://web.archive.org/web/20220326001519/https://github.com/LNP-BP/rgb-node) can be seen, on one hand, as an attempt to leverage the Bitcoin infrastructure to manage different issued assets, but it is also a technology strictly related with the Lightning Network, and an experiment around the concept of “client-side-validation”, [originally intended](https://web.archive.org/web/20220326001519/https://www.youtube.com/watch?time_continue=6198&v=uO-1rQbdZuk) to manage the bitcoin asset over a different kind of infrastructure. A similar thing can be said about [Issued Assets on Liquid](https://web.archive.org/web/20220326001519/https://blockstream.com/2018/07/02/en-liquid-issued-assets/), or about the [Proofmarshal proposal for assets](https://web.archive.org/web/20220326001519/https://petertodd.org/2017/scalable-single-use-seal-asset-transfer#single-use-seal-implementation).

![](/img/articles/lnp-bp-reinterpretation-layers-v2.jpg)

_“Reinterpretation” vs “Omission” layers (plus hybrids)._

The interaction among such abstraction layers may be nontrivial: in theory, you can route an RGB token, which represents a trust-based IOU denominated in the bitcoin asset, over a Lightning channel opened on the Liquid federated chain. Yeah, I know. You can now sit down a moment to process this.

![](/img/articles/lnp-bp-reinterpretation-layers-2-v2.jpg)

_Ok…this is starting to look a bit messy…also, what is that “???” purple box there?_

### LNP/BP like TCP/IP: How?

So, how much of a good job does the “LNP/BP” meme in representing the various ways in which the Bitcoin development is being “layerized”, and in maintaining a meaningful and consistent analogy with the most well-known example of “layarization”, namely the Internet Protocol Suite, also known as “TCP/IP”?

![](/img/articles/lnp-bp-tcp-ip-meme.jpg)

_Let’s test our analogy._

First of all, a few words on the “TCP/IP” expression: it is used to represent a very rich suite of open protocols, together collectively known as “Internet”, by explicitly naming the acronyms of the protocol which constitutes the base layer (if we exclude the physical “layer 0”) for the entire stack (or the [“Internet Protocol”](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Internet_Protocol), abbreviated “IP”, also sharing the same name of the entire suite), on the right, together with the most used among the few second layer protocols built directly on top (or the [“Transmission Control Protocol”](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Transmission_Control_Protocol), abbreviated “TCP”), on the left. It’s important to remind that the TCP/IP suite itself is not limited to the two protocols IP and TCP! There are a few important second layer protocols in alternative to TCP, which are integral parts of the suite, like for example [UDP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/User_Datagram_Protocol), [SCTP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Stream_Control_Transmission_Protocol) and [ICMP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol). There are many very important protocols on top of TCP, which are integral parts of the suite, like for example [HTTP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) (also known as “The Web”), [SMPT](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol), [FTP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/File_Transfer_Protocol), and [SFTP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol) (there are also protocols on top of UDP, like [RTP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Real-time_Transport_Protocol)).

![](/img/articles/lnp-bp-layers-protocols.jpg)

_Upper layers: increasing “competition”._

In this sense, the analogy implied by the “LNP/BP” expression sounds pretty elegant: it is intended to be used to represent a very rich suite of open protocols, together collectively known as “Bitcoin”, by explicitly naming the acronyms of the protocol which constitutes the base layer for the entire stack (or the “Bitcoin Protocol”, abbreviated “BP”, also sharing the same name of the entire suite), on the right, together with the most used among the few second layer protocols built directly on top (or the “Lightning Network Protocol, abbreviated “LNP”), on the left. Neat! Much symmetry! Of course, the LNP/BP suite itself would not be limited to the two protocols BP and LNP! A few important second layer protocols in alternative to LNP are being discussed, which would be integral parts of the suite, like for example some “Eltoo Network Protocol”, or some “Elements Federation Protocol”, or some “Statechain Entity Protocol”, or some “Proofmarshal Notary Protocol”. There could also very well be many very important protocols on top of LNP, which are integral parts of the suite, like for example protocols for advanced escrows like [Discrete Log contracts](https://web.archive.org/web/20220326001519/https://adiabat.github.io/dlc.pdf), advanced management of LN-services like [Watchtowers](https://web.archive.org/web/20220326001519/https://blog.bitmex.com/lightning-network-part-4-all-adopt-the-watchtower/), or even more complex [backup protocols](https://web.archive.org/web/20220326001519/https://telaviv2019.scalingbitcoin.org/files/acai-a-backup-protocol-for-lightning-network-wallets.pdf) and [messaging protocols](https://web.archive.org/web/20220326001519/https://www.bitcoinlightning.com/whatsat-send-private-messages-via-the-lightning-network/) on top of LNP (the Storm and Lightspeed proposals mentioned in the introduction of this article are also experiments along these lines). Some layer 3 protocols on top of LNP could also bridge payments across the various layer 2 systems (the HTLC-routing and Sphynx parts of LNP could be easily segregated and interpreted in this sense).

![](/img/articles/lnp-bp-layers-chart.jpg)

_The Lightning Network itself is not necessarily a single “second” layer: it could be fruitfully separated._

If compared with some alternative, less sophisticated attempts to stress the analogy, like “BTC/LN” (where the orders of the layers is inverted, and the “Protocol” characterization is omitted, and the price-ticker for the asset is used instead of the name of the protocol, and the homonymy between the first layer and the entire suite is lost), I think it’s clear the extent to which the “LNP/BP” expression actually works smoothly.

![](/img/articles/lnp-bp-tcp-ip-meme-2.jpg)

_Sorry Vortex…I know the war is over and you conceded…but I can’t get over how much “BTC/LN” sucks._

Now an interesting question: is TCP an “omission layer” on top of IP? Or more like a “reinterpretation layer”? While maybe the latter is a more literal parallel, there is a strong argument for the former as well: every TCP communication is also a valid IP communication with some additional meaning, but instead of being broadcast to huge sections of the global network in a multi-cast style (like typical of the [IGMP](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Internet_Group_Management_Protocol) sub-protocol of IP), it is only [unicast](https://web.archive.org/web/20220326001519/https://en.wikipedia.org/wiki/Unicast) across a specific network path, as long as the TCP connection lasts. It has [been already pointed out](https://web.archive.org/web/20220326001519/https://medium.com/@melik_87377/lightning-network-enables-unicast-transactions-in-bitcoin-lightning-is-bitcoins-tcp-ip-stack-8ec1d42c14f5) that the analogy is sound and quite insightful in this sense: every LNP transaction is also a valid BP transaction with some additional meaning, but instead of being broadcast to the global consensus, it is only unicast across a specific network path, as long as the LNP channels last.

### LNP/BP like TCP/IP: Why?

But why is this analogy with TCP/IP important, in the first place? Apart from just confirming and reinforcing the very successful “Bitcoin is the Internet of Money” meme, I think there are very good reasons to stress this specific comparison to the multi-layer Internet protocol suite.

![](/img/articles/lnp-bp-why.jpg)

_Does all this make sense anyway?_

The first reason is to stress the importance of such “layerization”, especially in the context of safety-critical and politically controversial projects like Bitcoin. On the one hand, the possibility to change Bitcoin’s base layer too often, without much resistance and inertia, would open up serious [social and political attack vectors](https://web.archive.org/web/20220326001519/https://www.youtube.com/watch?v=jgwW7XZCKPU). But on the other hand, no change at all in the whole system would mean technological stagnation and eventual obsolescence. Layarization allows us to enjoy the best of both worlds: fast innovation at the top layers, long-term reliability at the bottom layers. The same concept extends beyond the realm of time, into the realm of diversity of people, approaches, and ideas. On the one hand, a huge proliferation of alternative implementations of the base layers, without much convergence and standardization, would open up serious risks of consensus failure. But on the other hand, no competition at all would mean monoculture and concentration of risk into a single approach. Again, layerization allows us to enjoy the best of both worlds: diverse competition at the top layers, consistent convergence at the bottom layers. I expressed this idea of LNP/BP as multi-layer mental model, where the bottom layers should stay highly conservative, reliable, convergent and standard, while the top layers can be highly evolutionary and competitive, in [one of my talks](https://web.archive.org/web/20220326001519/https://www.youtube.com/watch?v=RlslCd8XtN0) (where I also explore some other peculiar cross-layer trade-offs, like the one between chain-fungibility and network-deniability, or between blockspace-divisibility and routing-portability, or between confirmation-finality and channel-reliability, etc.), and I really think it makes sense.

![](/img/articles/lnp-bp-zucco-1024x822.jpg)

_I know: “Matrix”-style colors are terrible for presentations…I don’t care…I like them._

them.

A second reason to stress the comparison is to take inspiration from the similarities between some historical events which concerned the TCP/IP suite and some important milestone in the first 10 years of Bitcoin. Specifically, the story of the so-called [“protocol wars”](https://web.archive.org/web/20220326001519/https://twitter.com/TuurDemeester/status/995293648198742018?s=19) shows startling resemblances with the most recent debate about “Bitcoin Maximalism”, while the story of the [“IPv7” takeover attempt](https://web.archive.org/web/20220326001519/https://twitter.com/bergealex4/status/879655292581036033) closely echoes what happened around the NYA attack against Bitcoin in 2017. In both cases, the history of TCP/IP can be used as lessons about the superiority of open, independent, convergent standards. While history never repeats itself exactly, some social and technical dynamics are often recurring, making the two episodes an important source of inspiration.

![](/img/articles/lnp-bp-internet-twitter-thread-646x1024.jpg)

_Seriously, you must read this great tweetstorm by Alex B.._

A third reason to stress the comparison would be to further highlight the fact that transfers of value over properly-intended “second layer technologies” in Bitcoin do not represent “credit”, “IOUs” or separated assets (like some distorted narrative around the Lightning Network seem to suggest), but literal bitcoin transfers. As discussed above, there are some important similarities between credit systems and off-chain strategies, but also fundamental differences. The LNP/BP meme helps clarifying this: just like a TCP connection is integral part of the Internet suite, a LNP channel is integral part of the Bitcoin suite.

![](/img/articles/lnp-bp-batman-meme.jpg)

_The use of physical violence is just metaphoric…I just want to slap you intellectually._

The last reason I see is about a very long-standing terminological and didactical problem: the homonymy between Bitcoin (intended as protocol, software, and network) and bitcoin (intended as the arbitrary unit of the limited supply of “digital gold” created within the protocol), which always generates some confusion among newcomers. While impossible to eliminate entirely, this source of potential misunderstanding is already mitigated by the more and more common use of the [“satoshi”](https://web.archive.org/web/20220326001519/https://m.alzashop.com/lnp-bp-lightning-netowrk-and-bitcoin-protocols) unit instead of the historical “bitcoin” one (this switch is not only naturally emerging from the necessity to counteract the “unit bias” which a surprisingly high number of “nocoiner” newcomers suffer from, and to reduce the number of decimal zeroes in front of the amount with the progressive increase in the value of a “bitcoin”, but is also, incidentally, closer to the way the actual Bitcoin software encodes amounts under the hood). Referring to the protocol suite as “LNP/BP” instead of “Bitcoin”, at least when some ambiguity may occur, is another didactical tool that can be used to clarify and distinguish.

**Now you finally know the secret of “LNP/BP”. You know what layers are in the context of Bitcoin and beyond. You know why nobody should try to change Bitcoin’s base layer too much, or in too many ways, while fast evolution and diverse competition are still needed on the upper layers. You know why Bitcoin is even more “like the Internet” than you thought it was. You know why you have to put this acronym on your Twitter bio if you want to be cool. Use this knowledge responsibly.**

