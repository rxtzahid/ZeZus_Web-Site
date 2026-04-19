import React, { useState } from 'react';
import { FaWallet, FaHeadset, FaCheckCircle} from 'react-icons/fa';

const Pay = () => {
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [amount, setAmount] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: '💰', color: 'bg-red-500' },
    { id: 'nagad', name: 'Nagad', icon: '💸', color: 'bg-orange-500' },
    { id: 'rocket', name: 'Rocket', icon: '🚀', color: 'bg-purple-500' },
    { id: 'card', name: 'Credit Card', icon: '💳', color: 'bg-blue-500' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', color: 'bg-green-500' }
  ];

  const handlePayment = () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if ((selectedMethod === 'bkash' || selectedMethod === 'nagad' || selectedMethod === 'rocket') && !mobileNumber) {
      alert('Please enter mobile number');
      return;
    }
    if (selectedMethod === 'card' && (!cardNumber || !expiry || !cvv)) {
      alert('Please enter card details');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      alert(`✅ Payment successful!\n\nAmount: ৳${amount}\nMethod: ${paymentMethods.find(m => m.id === selectedMethod).name}\nTransaction ID: ZEZ${Math.floor(Math.random() * 1000000)}\n\nThank you for using Zezus Pay!`);
      setIsProcessing(false);
      setAmount('');
      setMobileNumber('');
      setCardNumber('');
      setExpiry('');
      setCvv('');
    }, 2000);
  };

  const recentTransactions = [
    { id: 1, type: 'Send', to: 'Rahim', amount: 500, date: 'Today', status: 'Completed' },
    { id: 2, type: 'Receive', from: 'Karim', amount: 1200, date: 'Yesterday', status: 'Completed' },
    { id: 3, type: 'Bill Pay', to: 'Electricity', amount: 850, date: '2 days ago', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8"><h1 className="text-3xl font-bold text-gray-800">Zezus Pay</h1><p className="text-gray-500 mt-2">Fast, secure & easy digital payments</p></div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6"><h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FaWallet className="inline mr-2 text-purple-600" />Make a Payment</h2>
              <div className="grid grid-cols-5 gap-2 mb-6">{paymentMethods.map(method => (<button key={method.id} onClick={() => setSelectedMethod(method.id)} className={`p-3 rounded-xl text-center transition-all ${selectedMethod === method.id ? `${method.color} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><div className="text-2xl mb-1">{method.icon}</div><div className="text-xs font-semibold">{method.name}</div></button>))}</div>
              <div className="space-y-4"><div><label className="block text-gray-700 font-medium mb-2">Amount (৳)</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" /></div>
              {(selectedMethod === 'bkash' || selectedMethod === 'nagad' || selectedMethod === 'rocket') && (<div><label className="block text-gray-700 font-medium mb-2">Mobile Number</label><input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="01XXXXXXXXX" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" /></div>)}
              {selectedMethod === 'card' && (<div className="space-y-3"><input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" /><div className="grid grid-cols-2 gap-3"><input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" /><input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" /></div></div>)}
              <button onClick={handlePayment} disabled={isProcessing} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isProcessing ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'}`}>{isProcessing ? <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Processing...</span> : 'Pay Now'}</button></div></div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white"><h3 className="text-lg font-semibold mb-4">Zezus Pay Benefits</h3><ul className="space-y-2 text-sm"><li className="flex items-center"><FaCheckCircle className="mr-2" />Instant transfers</li><li className="flex items-center"><FaCheckCircle className="mr-2" />No hidden fees</li><li className="flex items-center"><FaCheckCircle className="mr-2" />24/7 availability</li><li className="flex items-center"><FaCheckCircle className="mr-2" />Bank-grade security</li></ul></div>
            <div className="bg-white rounded-2xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-3 flex items-center"><FaWallet className="text-purple-600 mr-2" />Recent Transactions</h3>{recentTransactions.map(trans => (<div key={trans.id} className="flex justify-between items-center py-3 border-b last:border-0"><div><p className="font-medium text-gray-800">{trans.type} {trans.to || trans.from}</p><p className="text-xs text-gray-500">{trans.date}</p></div><div className="text-right"><p className="font-bold text-gray-800">৳{trans.amount}</p><p className="text-xs text-green-600">{trans.status}</p></div></div>))}</div>
            <div className="bg-purple-50 rounded-2xl p-6 text-center"><FaHeadset className="text-3xl text-purple-600 mx-auto mb-3" /><h3 className="font-semibold text-gray-800">Need Help?</h3><p className="text-sm text-gray-600 mt-1">Call: 09678-100800</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;