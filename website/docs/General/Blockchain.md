---
id: Blockchain
slug: Blockchain
title: Blockchain
sidebar_label: Blockchain
---

Net Core Genesis has a unique place among its competitors with the blockchain module it offers.

When you purchase a suitable license, you can get ready-made smart contract codes such as KYC (Know your customer) that you can use on Ethereum / Quorum, HyperLedger Fabric and EOS blockhain platforms.

In the upcoming versions, you will be able to send your data to a distributed ledger (especially to the Ethereum testnet), which you can easily manage with model and property-based attributes without knowing any blockchain coding.

> Please contact us for further info.

```
[HttpPost]
[ClaimRequirement(ActionType.List)]
[BlockchainLog] // only add the attribute to push req-res data to blockchain
public async Task<ResponseWrapper<PaginationWrapper<Model>>> List([FromBody] RequestWithPagination<Model> request)
{
    return await _mainService.ListAsync(request);
}
```
