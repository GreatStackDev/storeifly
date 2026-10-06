import React, { useState, useEffect } from "react";
import { Palette, Scissors, Check, Loader2, X, RefreshCw, Sparkle, User, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface ProductAiImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    selectedImageIndex?: number;
    productName?: string;
    onAddImage: (newUrl: string) => void;
    onReplaceImage: (index: number, newUrl: string) => void;
    onAddColorVariantOption?: (colorName: string) => void;
}

export const ProductAiImageModal: React.FC<ProductAiImageModalProps> = ({
    isOpen,
    onClose,
    images,
    selectedImageIndex = 0,
    productName = "",
    onAddImage,
    onReplaceImage,
    onAddColorVariantOption,
}) => {
    const [activeTab, setActiveTab] = useState<"recolor" | "bg-removal" | "on-model">("recolor");
    const [currentImageIndex, setCurrentImageIndex] = useState(selectedImageIndex);
    const [prompt, setPrompt] = useState("");
    const [color, setColor] = useState("#2563eb");
    const [colorLabel, setColorLabel] = useState("Blue");
    const [addToVariants, setAddToVariants] = useState(true);

    const [modelUrl, setModelUrl] = useState("https://res.cloudinary.com/demo/image/upload/v1784148584/docs/female-model-01.jpg");
    const [isUploadingModel, setIsUploadingModel] = useState(false);
    const [garmentType, setGarmentType] = useState("jacket");
    const [pose, setPose] = useState("confident standing position");
    const [background, setBackground] = useState("clean, plain white background");

    const [isProcessing, setIsProcessing] = useState(false);
    const [transformedUrl, setTransformedUrl] = useState<string | null>(null);

    useEffect(() => {
        if (images.length > 0) {
            setCurrentImageIndex(Math.min(Math.max(0, selectedImageIndex), images.length - 1));
        }
    }, [selectedImageIndex, images.length, isOpen]);

    useEffect(() => {
        if (productName && !prompt) {
            setPrompt(productName.toLowerCase());
            const lower = productName.toLowerCase();
            if (lower.includes("jacket")) setGarmentType("jacket");
            else if (lower.includes("shirt") || lower.includes("t-shirt") || lower.includes("tee")) setGarmentType("shirt");
            else if (lower.includes("dress")) setGarmentType("dress");
            else if (lower.includes("hoodie")) setGarmentType("hoodie");
            else if (lower.includes("top")) setGarmentType("top");
        }
    }, [productName]);

    if (!isOpen) return null;

    const sourceImage = images[currentImageIndex] || images[0];

    const handleUploadModelFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingModel(true);
        setTimeout(() => {
            const fakeUrl = URL.createObjectURL(file);
            setModelUrl(fakeUrl);
            toast.success("Model image uploaded successfully!");
            setIsUploadingModel(false);
            e.target.value = "";
        }, 500);
    };

    const handleTransform = () => {
        if (!sourceImage) return toast.error("No image selected");
        if (activeTab === "recolor" && !prompt.trim()) {
            return toast.error("Please enter what object to recolor");
        }

        setIsProcessing(true);
        setTransformedUrl(null);

        setTimeout(() => {
            setTransformedUrl(sourceImage);
            toast.success(
                activeTab === "recolor"
                    ? "Recolored successfully!"
                    : activeTab === "on-model"
                      ? "On-model photo generated successfully!"
                      : "Background removed!",
            );
            setIsProcessing(false);
        }, 600);
    };

    const handleSave = (replace: boolean) => {
        if (!transformedUrl) return;
        if (replace) {
            onReplaceImage(currentImageIndex, transformedUrl);
        } else {
            onAddImage(transformedUrl);
        }

        if (activeTab === "recolor" && addToVariants && colorLabel.trim() && onAddColorVariantOption) {
            onAddColorVariantOption(colorLabel.trim());
        }

        toast.success(replace ? "Image replaced" : "Image added");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-60 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto border border-neutral-200/80 shadow-xl my-auto">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-emerald-600">
                            <Sparkle className="size-5 animate-spin" />
                        </div>
                        <h3 className="font-medium text-base text-neutral-900">AI Image Studio</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Image selector if multiple */}
                {images.length > 1 && (
                    <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    setCurrentImageIndex(idx);
                                    setTransformedUrl(null);
                                }}
                                className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                                    currentImageIndex === idx
                                        ? "border-emerald-600 ring-2 ring-emerald-500/20"
                                        : "border-neutral-200 opacity-60"
                                }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex border-b border-neutral-100 gap-4 mt-4">
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab("recolor");
                            setTransformedUrl(null);
                        }}
                        className={`pb-2 text-xs font-medium inline-flex items-center gap-1.5 border-b-2 transition cursor-pointer ${
                            activeTab === "recolor"
                                ? "border-emerald-600 text-emerald-700"
                                : "border-transparent text-neutral-400 hover:text-neutral-700"
                        }`}
                    >
                        <Palette className="w-3.5 h-3.5" /> Recolor
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab("bg-removal");
                            setTransformedUrl(null);
                        }}
                        className={`pb-2 text-xs font-medium inline-flex items-center gap-1.5 border-b-2 transition cursor-pointer ${
                            activeTab === "bg-removal"
                                ? "border-emerald-600 text-emerald-700"
                                : "border-transparent text-neutral-400 hover:text-neutral-700"
                        }`}
                    >
                        <Scissors className="w-3.5 h-3.5" /> Remove Background
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab("on-model");
                            setTransformedUrl(null);
                        }}
                        className={`pb-2 text-xs font-medium inline-flex items-center gap-1.5 border-b-2 transition cursor-pointer ${
                            activeTab === "on-model"
                                ? "border-emerald-600 text-emerald-700"
                                : "border-transparent text-neutral-400 hover:text-neutral-700"
                        }`}
                    >
                        <User className="w-3.5 h-3.5" /> On-Model Photo
                    </button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    {/* Controls */}
                    <div className="space-y-3">
                        {activeTab === "recolor" && (
                            <>
                                <div>
                                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">Object to Recolor</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. shirt, jacket, shoes"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">Custom Color</label>
                                    <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50 border border-neutral-200">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                                        />
                                        <input
                                            type="text"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="flex-1 text-xs font-mono bg-transparent focus:outline-none uppercase text-neutral-800"
                                            placeholder="#HEX"
                                        />
                                    </div>
                                </div>

                                {onAddColorVariantOption && (
                                    <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
                                            <input
                                                type="checkbox"
                                                checked={addToVariants}
                                                onChange={(e) => setAddToVariants(e.target.checked)}
                                                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                                            />
                                            <span>Add to Variant Options</span>
                                        </label>
                                        {addToVariants && (
                                            <input
                                                type="text"
                                                value={colorLabel}
                                                onChange={(e) => setColorLabel(e.target.value)}
                                                placeholder="Variant name (e.g. Royal Blue)"
                                                className="w-full px-2.5 py-1 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none"
                                            />
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "on-model" && (
                            <>
                                <div>
                                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">Model Image [1]</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="https://... (or upload model file)"
                                            value={modelUrl}
                                            onChange={(e) => setModelUrl(e.target.value)}
                                            className="flex-1 px-3 py-1.5 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                                        />
                                        <label className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium rounded-xl cursor-pointer inline-flex items-center gap-1.5 shrink-0 transition border border-neutral-200">
                                            {isUploadingModel ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <Upload className="w-3.5 h-3.5" />
                                            )}
                                            <span>{isUploadingModel ? "Uploading..." : "Upload"}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                disabled={isUploadingModel}
                                                onChange={handleUploadModelFile}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">Garment Type [2]</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. jacket, t-shirt, dress, hoodie"
                                        value={garmentType}
                                        onChange={(e) => setGarmentType(e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">Pose</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. confident standing position"
                                        value={pose}
                                        onChange={(e) => setPose(e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">Background</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. clean, plain white background"
                                        value={background}
                                        onChange={(e) => setBackground(e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="button"
                            disabled={isProcessing || !sourceImage}
                            onClick={handleTransform}
                            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-xs shadow-emerald-700/20"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <span>
                                    {activeTab === "recolor"
                                        ? "Generate"
                                        : activeTab === "on-model"
                                          ? "Generate On-Model"
                                          : "Remove Background"}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Previews */}
                    <div className="space-y-3 flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-2 flex-1 min-h-40">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Original</span>
                                <div className="flex-1 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 flex items-center justify-center min-h-35">
                                    {sourceImage && <img src={sourceImage} alt="" className="w-full h-full object-cover rounded-lg" />}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Result</span>
                                <div className="flex-1 rounded-xl overflow-hidden border border-neutral-200 flex items-center justify-center relative min-h-35">
                                    {isProcessing ? (
                                        <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                                    ) : transformedUrl ? (
                                        <img src={transformedUrl} alt="" className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <span className="text-sm text-neutral-500">Preview</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {transformedUrl && (
                            <div className="flex gap-2 pt-2 border-t border-neutral-100">
                                <button
                                    type="button"
                                    onClick={() => handleSave(false)}
                                    className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                                >
                                    <Check className="w-3 h-3" /> Add Image
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSave(true)}
                                    className="py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
                                >
                                    <RefreshCw className="w-3 h-3" /> Replace
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
