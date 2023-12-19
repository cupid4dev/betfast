"use client";
import { setOrders, updateMarket } from "@/redux/slice";
import {
  Orders,
  getMarket,
  getMarketOutcomesByMarket,
} from "@monaco-protocol/client";
import { publicKeyFromBn } from "./parsers";

export async function fetchOrders(program: any, wallet: any, dispatch: any) {
  if (!program || !wallet || !wallet.connected) {
    return;
  }
  const orderResult = await Orders.orderQuery(program)
    .filterByPurchaser(wallet.publicKey)
    .fetch();
  if (orderResult.success) {
    let orders = new Array();
    orderResult.data.orderAccounts.map(
      (order: any) => (
        orders.push({
          publicKey: publicKeyFromBn(order.publicKey).toString(),
          expectedPrice: order.account.expectedPrice,
          forOutcome: order.account.forOutcome,
          marketOutcomeIndex: order.account.marketOutcomeIndex,
          market: publicKeyFromBn(order.account.market).toString(),
          orderStatus: order.account.orderStatus,
        }),
        fetchMarket(dispatch, program, publicKeyFromBn(order.account.market))
      ),
    );
    orders.sort((a, b) => {
      return a.publicKey > b.publicKey ? 1 : -1;
    });
    dispatch(setOrders(orders));
  }
}

export async function fetchMarket(dispatch: any, program: any, marketPK: any) {
  const marketResult = await getMarket(program, marketPK);
  if (marketResult.success) {
    const marketOutcomes = await getMarketOutcomesByMarket(program, marketPK);

    if (marketOutcomes.success) {
      let outcomes = new Array();
      marketOutcomes.data.marketOutcomeAccounts.map((outcome) =>
        outcomes.push({
          index: outcome.account.index,
          lastMatchedPrice: outcome.account.latestMatchedPrice,
          title: outcome.account.title,
        }),
      );
      let market = {
        publicKey: marketPK.toString(),
        ...marketResult.data.account,
        outcomes: outcomes,
      };

      dispatch(updateMarket(market));
    }
  }
}
