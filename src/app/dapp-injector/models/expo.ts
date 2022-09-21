export interface IMEMBER_QUERY {
  deposit: string;
  flow: string;
  timestamp:string;
  creditsRequested: Array<ICREDIT_REQUESTED>
  creditsDelegated: Array<ICREDIT_DELEGATED>;
}

export interface ICREDIT_DELEGATED {
  id: string;
  amount: string;
  rate: string;
  status: string;
  finishPhaseTimestamp:string,
  delegatorsAmount:string,
  requester: { member:string}

}

export interface ICREDIT_REQUESTED  {
  finishPhaseTimestamp: string;
  amount: string;
  status: string;
  rate: string;
  delegatorsNr: string;
};
 export type ROLE = 'member' | 'requester' |'delegater'