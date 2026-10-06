import React from "react";

interface Props {
    customerName: string;
    onCustomerNameChange: (v: string) => void;
    customerEmail: string;
    onCustomerEmailChange: (v: string) => void;
    customerPhone: string;
    onCustomerPhoneChange: (v: string) => void;
}

const INPUT_CLS = "w-full px-3 py-2 text-xs border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 bg-white";
const LABEL_CLS = "block text-[11px] font-medium text-neutral-600 mb-1";

export const CheckoutContactForm: React.FC<Props> = ({
    customerName,
    onCustomerNameChange,
    customerEmail,
    onCustomerEmailChange,
    customerPhone,
    onCustomerPhoneChange,
}) => (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 xl:p-6">
        <h2 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">1. Contact Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
                <label className={LABEL_CLS}>Full Name *</label>
                <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => onCustomerNameChange(e.target.value)}
                    placeholder="Jane Doe"
                    className={INPUT_CLS}
                />
            </div>
            <div>
                <label className={LABEL_CLS}>Email Address *</label>
                <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => onCustomerEmailChange(e.target.value)}
                    placeholder="jane@example.com"
                    className={INPUT_CLS}
                />
            </div>
            <div className="sm:col-span-2">
                <label className={LABEL_CLS}>Phone Number (Optional)</label>
                <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => onCustomerPhoneChange(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={INPUT_CLS}
                />
            </div>
        </div>
    </div>
);
