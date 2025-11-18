// The Brain of the Simulator
// This file will contain the core logic for running payment scenarios.
// It will be pure TypeScript, with no UI code.

import type { Levers, ScenarioType, ScenarioStep, ActorBalances } from './types';



const PAYMENT_AMOUNT = 100;

const GATEWAY_FEE = 3;

const MERCHANT_NET = PAYMENT_AMOUNT - GATEWAY_FEE;
const PARTIAL_REFUND_AMOUNT = 40;

const CHARGEBACK_FEE = 15;



const initialBalances: ActorBalances = {

    customerCash: PAYMENT_AMOUNT,

    customerHold: 0,

    gatewayCash: 0,

    gatewayMerchantLiability: 0,

    gatewayFees: 0,

    merchantCash: 0,

};



const simulateNormalPayment = (levers: Levers): ScenarioStep[] => {

    const steps: ScenarioStep[] = [];

    const isManualCapture = levers.captureMode === 'manual';



    // 1. Before Payment

    steps.push({

        label: 'Before Payment',

        day: 0,

        balances: { ...initialBalances },

        explanation: 'Everyone starts with their initial balances.',

    });



    // 2. After Authorization

    steps.push({

        label: 'After Auth',

        day: 0,

        balances: {

            ...initialBalances,

            customerHold: PAYMENT_AMOUNT,

        },

        explanation: isManualCapture

            ? `Customer's bank places a ${PAYMENT_AMOUNT} hold. The merchant must now manually capture this payment.`

            : `Customer's bank confirms funds and places a ${PAYMENT_AMOUNT} hold. The payment is captured automatically.`,

    });



    // 3. After Capture

    const captureDay = isManualCapture ? 1 : 0;

    const afterCaptureBalances = {

        ...steps[steps.length - 1].balances,

        gatewayMerchantLiability: PAYMENT_AMOUNT,

    };

    steps.push({

        label: 'After Capture',

        day: captureDay,

        balances: afterCaptureBalances,

        explanation: isManualCapture

            ? `On Day ${captureDay}, the merchant manually captures the payment. Gateway now owes the merchant ${PAYMENT_AMOUNT}.`

            : `The gateway automatically captures the payment. It now officially owes the merchant ${PAYMENT_AMOUNT} once funds settle.`,

    });



    // All subsequent days are relative to the capture day.

    const settlementDay = captureDay + 1;



    // Handle Instant Payout specifically

    if (levers.payoutSchedule === 'instant') {

        const instantPayoutBalances: ActorBalances = {

            ...afterCaptureBalances,

            gatewayCash: -MERCHANT_NET, // Gateway fronts the money

            gatewayMerchantLiability: 0, // Liability is cleared

            merchantCash: MERCHANT_NET, // Merchant gets paid instantly

        };

        steps.push({

            label: 'Instant Payout',

            day: captureDay,

            balances: instantPayoutBalances,

            explanation: `Gateway pays merchant ${MERCHANT_NET} from its own cash. Gateway is now at risk, holding a negative cash balance until settlement.`,

        });



        const settlementAfterInstantPayout: ActorBalances = {

            ...instantPayoutBalances,

            customerCash: 0,

            customerHold: 0,

            gatewayCash: instantPayoutBalances.gatewayCash + PAYMENT_AMOUNT, // Gateway receives customer funds

        };

        steps.push({

            label: 'After Settlement',

            day: settlementDay,

            balances: settlementAfterInstantPayout,

            explanation: `On Day ${settlementDay}, the customer's bank sends ${PAYMENT_AMOUNT} to the Gateway. The hold is released.`,

        });

        

        const feeRecognitionAfterInstantPayout: ActorBalances = {

            ...settlementAfterInstantPayout,

            gatewayFees: GATEWAY_FEE,

        };

        steps.push({

            label: 'Fee Recognition',

            day: settlementDay,

            balances: feeRecognitionAfterInstantPayout,

            explanation: `Gateway recognizes its ${GATEWAY_FEE} fee. Its final cash position is now positive.`,

        });



    } else { // Handle T+2 and T+7 Payouts

        const afterSettlementBalances: ActorBalances = {

            ...afterCaptureBalances,

            customerCash: 0,

            customerHold: 0,

            gatewayCash: PAYMENT_AMOUNT,

        };

        steps.push({

            label: 'After Settlement',

            day: settlementDay,

            balances: afterSettlementBalances,

            explanation: `On Day ${settlementDay}, customer's bank sends ${PAYMENT_AMOUNT} to the Gateway. The hold is released.`,

        });



        const afterFeeRecognitionBalances: ActorBalances = {

            ...afterSettlementBalances,

            gatewayMerchantLiability: MERCHANT_NET,

            gatewayFees: GATEWAY_FEE,

        };

        steps.push({

            label: 'Fee Recognition',

            day: settlementDay,

            balances: afterFeeRecognitionBalances,

            explanation: `Gateway recognizes its ${GATEWAY_FEE} fee. It now owes the merchant ${MERCHANT_NET}.`,

        });



        const payoutDayOffset = levers.payoutSchedule === 'T+2' ? 2 : 7;

        const payoutDay = settlementDay + payoutDayOffset -1; // Payout is T+n from settlement day

        const afterPayoutBalances: ActorBalances = {

            ...afterFeeRecognitionBalances,

            gatewayCash: GATEWAY_FEE,

            gatewayMerchantLiability: 0,

            merchantCash: MERCHANT_NET,

        };

        steps.push({

            label: 'After Payout',

            day: payoutDay,

            balances: afterPayoutBalances,

            explanation: `On Day ${payoutDay}, Gateway pays the merchant ${MERCHANT_NET}. The gateway is left with its fee, and the merchant finally has their funds.`,

        });

    }



    return steps;

};



const simulateRefund = (levers: Levers): ScenarioStep[] => {

    const paymentSteps = simulateNormalPayment(levers);

    const lastPaymentStep = paymentSteps[paymentSteps.length - 1];

    const refundDay = lastPaymentStep.day + 1;



    const steps: ScenarioStep[] = [...paymentSteps];



    // --- Refund Process Starts ---



    const refundInitiatedBalances: ActorBalances = {

        ...lastPaymentStep.balances,

    };

    steps.push({

        label: 'Refund Initiated',

        day: refundDay,

        balances: refundInitiatedBalances,

        explanation: `The merchant initiates a refund for the ${PAYMENT_AMOUNT} payment. The fee of ${GATEWAY_FEE} is generally not returned.`,

    });



    if (levers.refundPolicy === 'instant') {

        const instantRefundBalances: ActorBalances = {

            ...refundInitiatedBalances,

            gatewayCash: refundInitiatedBalances.gatewayCash - PAYMENT_AMOUNT, // Gateway sends money back

            customerCash: refundInitiatedBalances.customerCash + PAYMENT_AMOUNT, // Customer gets money back

        };

        steps.push({

            label: 'Instant Refund Sent',

            day: refundDay,

            balances: instantRefundBalances,

            explanation: `Gateway instantly sends ${PAYMENT_AMOUNT} back to the customer from its own cash reserves, even before getting the money back from the merchant.`,

        });



        const clawbackBalances: ActorBalances = {

            ...instantRefundBalances,

            gatewayCash: instantRefundBalances.gatewayCash + PAYMENT_AMOUNT, // Gateway claws back from merchant

            merchantCash: instantRefundBalances.merchantCash - PAYMENT_AMOUNT, // Merchant pays for the refund

        };

        steps.push({

            label: 'Clawback from Merchant',

            day: refundDay + 1,

            balances: clawbackBalances,

            explanation: `The Gateway claws back the ${PAYMENT_AMOUNT} from the merchant's account or future payouts. The merchant bears the full cost of the refund.`,

        });



    } else { // refundPolicy === 'after_payout'

        const clawbackBalances: ActorBalances = {

            ...refundInitiatedBalances,

            gatewayCash: refundInitiatedBalances.gatewayCash + MERCHANT_NET, // Gateway holds back the payout

            merchantCash: refundInitiatedBalances.merchantCash - MERCHANT_NET, // Merchant payout is reversed

        };

        steps.push({

            label: 'Clawback from Merchant',

            day: refundDay,

            balances: clawbackBalances,

            explanation: `The Gateway claws back ${MERCHANT_NET} from the merchant. The original ${GATEWAY_FEE} fee is kept by the gateway.`,

        });



        const refundSentBalances: ActorBalances = {

            ...clawbackBalances,

            gatewayCash: clawbackBalances.gatewayCash - PAYMENT_AMOUNT, // Gateway sends refund

            customerCash: clawbackBalances.customerCash + PAYMENT_AMOUNT, // Customer gets money back

        };

        steps.push({

            label: 'Refund Sent to Customer',

            day: refundDay + 1,

            balances: refundSentBalances,

            explanation: `After securing funds from the merchant, the Gateway sends the ${PAYMENT_AMOUNT} refund to the customer.`,

        });

    }



    return steps;

}





const simulateAuthCaptureFail = (levers: Levers): ScenarioStep[] => {

    const steps: ScenarioStep[] = [];

    const isManualCapture = levers.captureMode === 'manual';



    // 1. Before Payment

    steps.push({

        label: 'Before Payment',

        day: 0,

        balances: { ...initialBalances },

        explanation: 'Everyone starts with their initial balances.',

    });



    // 2. After Authorization

    const afterAuthBalances: ActorBalances = {

        ...initialBalances,

        customerHold: PAYMENT_AMOUNT,

    };

    steps.push({

        label: 'After Auth',

        day: 0,

        balances: afterAuthBalances,

        explanation: `Customer's bank confirms funds are available and places a ${PAYMENT_AMOUNT} hold.`,

    });



    // 3. Capture Fails

    const captureFailDay = isManualCapture ? 1 : 0;

    steps.push({

        label: 'Capture Failed',

        day: captureFailDay,

        balances: afterAuthBalances, // Balances don't change yet, just the event happens

        explanation: isManualCapture

            ? `On Day ${captureFailDay}, the merchant's manual capture attempt failed. This could be due to the auth expiring or other issues.`

            : `The automatic capture attempt failed instantly. This is often due to a technical issue or a problem with the payment method.`,

    });



    // 4. Hold is Released

    // Holds can last for several days, but for simulation we'll say it's released a day after failure.

    const holdReleasedBalances: ActorBalances = {

        ...afterAuthBalances,

        customerHold: 0, // The hold is gone

    };

    steps.push({

        label: 'Hold Released',

        day: captureFailDay + 1,

        balances: holdReleasedBalances,

        explanation: `The authorization hold expires and is released by the customer's bank. The ${PAYMENT_AMOUNT} is available to the customer again. No money ever moved.`,

    });



    return steps;

};



const simulateChargeback = (levers: Levers): ScenarioStep[] => {

    const paymentSteps = simulateNormalPayment(levers);

    const lastPaymentStep = paymentSteps[paymentSteps.length - 1];

    // A chargeback happens much later, e.g., 15 days after the payout.

    const chargebackDay = lastPaymentStep.day + 15;



    const steps: ScenarioStep[] = [...paymentSteps];



    // --- Chargeback Process Starts ---



    const chargebackInitiatedBalances: ActorBalances = {

        ...lastPaymentStep.balances,

    };

    steps.push({

        label: 'Chargeback Initiated',

        day: chargebackDay,

        balances: chargebackInitiatedBalances,

        explanation: `15 days after payout, the customer disputes the charge with their bank, initiating a chargeback.`,

    });



    // Customer's bank pulls money from the Gateway

    const fundsPulledBalances: ActorBalances = {

        ...chargebackInitiatedBalances,

        gatewayCash: chargebackInitiatedBalances.gatewayCash - PAYMENT_AMOUNT,

        customerCash: chargebackInitiatedBalances.customerCash + PAYMENT_AMOUNT,

    };

    steps.push({

        label: 'Funds Pulled from Gateway',

        day: chargebackDay,

        balances: fundsPulledBalances,

        explanation: `The customer's bank immediately pulls ${PAYMENT_AMOUNT} from the Gateway's account. The customer has their money back for now.`,

    });



    // Gateway claws back from Merchant, including a fee

    const totalClawback = PAYMENT_AMOUNT + CHARGEBACK_FEE;

    const merchantClawedBackBalances: ActorBalances = {

        ...fundsPulledBalances,

        gatewayCash: fundsPulledBalances.gatewayCash + totalClawback,

        merchantCash: fundsPulledBalances.merchantCash - totalClawback,

        gatewayFees: fundsPulledBalances.gatewayFees + CHARGEBACK_FEE,

    };

    steps.push({

        label: 'Clawback from Merchant',

        day: chargebackDay + 1,

        balances: merchantClawedBackBalances,

        explanation: `The Gateway claws back the ${PAYMENT_AMOUNT} from the merchant, plus a punitive ${CHARGEBACK_FEE} fee. The merchant has now lost ${totalClawback}.`,

    });



    return steps;

}

const simulatePartialRefund = (levers: Levers): ScenarioStep[] => {
    const paymentSteps = simulateNormalPayment(levers);
    const lastPaymentStep = paymentSteps[paymentSteps.length - 1];
    const refundDay = lastPaymentStep.day + 1;

    const steps: ScenarioStep[] = [...paymentSteps];

    // --- Partial Refund Process Starts ---

    steps.push({
        label: 'Partial Refund Initiated',
        day: refundDay,
        balances: lastPaymentStep.balances,
        explanation: `The merchant initiates a partial refund for ${PARTIAL_REFUND_AMOUNT}. The original gateway fee of ${GATEWAY_FEE} is not returned.`,
    });

    // Gateway claws back the partial refund amount from the merchant
    const clawbackBalances: ActorBalances = {
        ...lastPaymentStep.balances,
        // Gateway takes the money from the merchant to fund the refund.
        // Note: merchant cash can go negative if they don't have enough funds.
        merchantCash: lastPaymentStep.balances.merchantCash - PARTIAL_REFUND_AMOUNT,
    };
    steps.push({
        label: 'Clawback from Merchant',
        day: refundDay,
        balances: clawbackBalances,
        explanation: `The Gateway claws back the ${PARTIAL_REFUND_AMOUNT} from the merchant's balance to fund the refund.`,
    });

    // Gateway sends the partial refund to the customer
    const refundSentBalances: ActorBalances = {
        ...clawbackBalances,
        customerCash: clawbackBalances.customerCash + PARTIAL_REFUND_AMOUNT,
    };
    steps.push({
        label: 'Partial Refund Sent',
        day: refundDay + 1,
        balances: refundSentBalances,
        explanation: `The Gateway sends the ${PARTIAL_REFUND_AMOUNT} to the customer. The merchant has lost ${PARTIAL_REFUND_AMOUNT} and the original ${GATEWAY_FEE} fee.`,
    });

    return steps;
};


const simulateChargebackWin = (levers: Levers): ScenarioStep[] => {
    // A chargeback win starts with a full chargeback flow
    const chargebackSteps = simulateChargeback(levers);
    const lastChargebackStep = chargebackSteps[chargebackSteps.length - 1];
    // The win happens much later, e.g., 45 days after the chargeback was initiated.
    const disputeWinDay = lastChargebackStep.day + 45;

    const steps: ScenarioStep[] = [...chargebackSteps];

    steps.push({
        label: 'Dispute Evidence Submitted',
        day: lastChargebackStep.day + 5, // e.g., 5 days to submit
        balances: lastChargebackStep.balances,
        explanation: `The merchant submits compelling evidence (e.g., shipping receipt, usage logs) to the Gateway to fight the chargeback.`,
    });

    // On winning, the merchant gets the original amount back. The chargeback fee is often NOT returned.
    const winBalances: ActorBalances = {
        ...lastChargebackStep.balances,
        gatewayCash: lastChargebackStep.balances.gatewayCash - PAYMENT_AMOUNT,
        merchantCash: lastChargebackStep.balances.merchantCash + PAYMENT_AMOUNT,
    };

    steps.push({
        label: 'Merchant Wins Dispute',
        day: disputeWinDay,
        balances: winBalances,
        explanation: `After a lengthy review, the bank sides with the merchant. The Gateway returns the original ${PAYMENT_AMOUNT} to the merchant. The customer loses the dispute and the money. The ${CHARGEBACK_FEE} fee is usually not refunded.`,
    });

    return steps;
}

const simulateChargebackLoss = (levers: Levers): ScenarioStep[] => {
    // A chargeback loss is just the completed chargeback flow.
    // The final step of the chargeback flow IS the loss.
    const chargebackSteps = simulateChargeback(levers);
    const lastChargebackStep = chargebackSteps[chargebackSteps.length - 1];
    const disputeLossDay = lastChargebackStep.day + 45;

    const steps: ScenarioStep[] = [...chargebackSteps];

    steps.push({
        label: 'Dispute Evidence Submitted',
        day: lastChargebackStep.day + 5,
        balances: lastChargebackStep.balances,
        explanation: `The merchant submits evidence to fight the chargeback, but it is deemed insufficient by the bank.`,
    });

    steps.push({
        label: 'Merchant Loses Dispute',
        day: disputeLossDay,
        balances: lastChargebackStep.balances, // Balances do not change from the last step of the chargeback
        explanation: `After review, the bank sides with the customer. The chargeback stands. The merchant has lost the ${PAYMENT_AMOUNT} and the ${CHARGEBACK_FEE} fee, for a total loss of ${PAYMENT_AMOUNT + CHARGEBACK_FEE}.`,
    });

    return steps;
}





export const simulateScenario = (levers: Levers, scenarioType: ScenarioType): ScenarioStep[] => {

    console.log('Simulating scenario:', scenarioType, 'with levers:', levers);



    switch (scenarioType) {

        case 'normal_payment':

            return simulateNormalPayment(levers);

        

        case 'refund':

            return simulateRefund(levers);



        case 'auth_capture_fail':

            return simulateAuthCaptureFail(levers);

            

        case 'chargeback':

            return simulateChargeback(levers);



        case 'chargeback_win':

            return simulateChargebackWin(levers);



        case 'chargeback_loss':

            return simulateChargebackLoss(levers);
        
        case 'partial_refund':
            return simulatePartialRefund(levers);



        default:

            return [];

    }

};