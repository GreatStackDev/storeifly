import React from "react";

export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface Props {
    address: ShippingAddress;
    onAddressChange: (address: ShippingAddress) => void;
}

const INPUT_CLS = "w-full px-3 py-2 text-xs border border-neutral-200 rounded-sm focus:outline-none focus:border-neutral-900 bg-white";
const LABEL_CLS = "block text-[11px] font-medium text-neutral-600 mb-1";

const Field = ({
    label,
    field,
    address,
    onAddressChange,
    placeholder,
    colSpan,
}: {
    label: string;
    field: keyof ShippingAddress;
    address: ShippingAddress;
    onAddressChange: (a: ShippingAddress) => void;
    placeholder: string;
    colSpan?: string;
}) => (
    <div className={colSpan}>
        <label className={LABEL_CLS}>{label}</label>
        <input
            type="text"
            required
            value={address[field]}
            onChange={(e) => onAddressChange({ ...address, [field]: e.target.value })}
            placeholder={placeholder}
            className={INPUT_CLS}
        />
    </div>
);

export const CheckoutShippingForm: React.FC<Props> = ({ address, onAddressChange }) => (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 xl:p-6">
        <h2 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">2. Shipping Address</h2>
        <div className="space-y-3.5">
            <Field
                label="Street Address *"
                field="street"
                address={address}
                onAddressChange={onAddressChange}
                placeholder="123 Market St, Suite 400"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Field label="City *" field="city" address={address} onAddressChange={onAddressChange} placeholder="San Francisco" />
                <Field label="State / Prov *" field="state" address={address} onAddressChange={onAddressChange} placeholder="CA" />
                <Field
                    label="ZIP / Postal *"
                    field="zip"
                    address={address}
                    onAddressChange={onAddressChange}
                    placeholder="94103"
                    colSpan="col-span-2 sm:col-span-1"
                />
            </div>
        </div>
    </div>
);
