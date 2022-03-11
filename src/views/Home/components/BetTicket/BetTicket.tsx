import React from 'react';

function BetTicket({ horseName, payout, betAmount}) {

  return (
    <div className="bg-white w-40 dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
      <h3 className="text-slate-900 dark:text-white mb-5 text-base font-medium tracking-tight">Bet Ticket</h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2">{horseName}</p>
      <p className="text-slate-500 dark:text-slate-400 mt-2">To Win</p>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        <span>Bet Placed: </span>
        <span className="text-slate-900 dark:text-white mb-5 text-base font-medium">{betAmount}</span> ꜩ
      </p>
      <p className="text-slate-500 dark:text-slate-400 mt-2">
        <span>Will Win: </span>
        <span className="text-slate-900 dark:text-white mb-5 text-base font-medium">{payout}</span> ꜩ
      </p>
    </div>
  );
}

export default BetTicket;