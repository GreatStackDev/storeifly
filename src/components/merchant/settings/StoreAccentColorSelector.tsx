import React, { useState } from "react";
import { Check } from "lucide-react";
import { ACCENT_PRESETS, DEFAULT_ACCENT_COLOR, getContrastColor } from "../../../utils/storeAccent";

interface Props {
    value: string;
    onChange: (color: string) => void;
}

export const StoreAccentColorSelector: React.FC<Props> = ({ value, onChange }) => {
    const currentColor = (value || DEFAULT_ACCENT_COLOR).trim();
    const [customInput, setCustomInput] = useState(currentColor);

    const handleCustomChange = (newHex: string) => {
        setCustomInput(newHex);
        if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
            onChange(newHex);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h2 className="text-sm font-medium text-neutral-900">Store Accent Color</h2>
                </div>

                {/* Current Color Indicator badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 self-start sm:self-auto">
                    <span className="size-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: currentColor }} />
                    <span className="text-xs font-mono font-medium text-neutral-700 uppercase">{currentColor}</span>
                </div>
            </div>

            {/* Presets Grid */}
            <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {ACCENT_PRESETS.map((preset) => {
                        const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase();
                        return (
                            <button
                                key={preset.hex}
                                type="button"
                                onClick={() => {
                                    setCustomInput(preset.hex);
                                    onChange(preset.hex);
                                }}
                                className={`group p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                                    isSelected
                                        ? "border-neutral-400 bg-neutral-50/80"
                                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"
                                }`}
                            >
                                <span
                                    className="size-7 rounded-full flex items-center justify-center shrink-0 shadow-xs transition group-hover:scale-105"
                                    style={{ backgroundColor: preset.hex }}
                                >
                                    {isSelected && <Check className="w-4 h-4" style={{ color: getContrastColor(preset.hex) }} />}
                                </span>
                                <div className="min-w-0">
                                    <span className="block text-xs font-medium text-neutral-900 truncate">{preset.name}</span>
                                    <span className="block text-[10px] text-neutral-500 font-mono">{preset.hex}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Custom Hex Color Picker */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <label className="text-xs font-medium text-neutral-800 block">Custom Hex Color</label>
                    <span className="text-[11px] text-neutral-500">Pick from the color wheel or type your brand's exact hex code</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative flex items-center rounded-full border border-neutral-300 overflow-hidden">
                        <input
                            type="color"
                            value={currentColor.startsWith("#") ? currentColor : DEFAULT_ACCENT_COLOR}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            className="size-8 cursor-pointer scale-150 bg-white"
                            title="Choose custom color"
                        />
                    </div>
                    <input
                        type="text"
                        value={customInput}
                        maxLength={7}
                        placeholder="#059669"
                        onChange={(e) => handleCustomChange(e.target.value)}
                        className="w-28 px-3 py-2 border border-neutral-200 rounded-xl text-xs font-mono uppercase text-neutral-900 focus:outline-hidden focus:border-neutral-900 transition"
                    />
                </div>
            </div>
        </div>
    );
};
