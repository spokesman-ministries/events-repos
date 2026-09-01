"use client";

import { useState } from "react";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import { RegistrationForm, registrationSchema, categories } from "@/schemas/registrationSchema";
import {
    CreditCard, MessageCircle, MapPin, Globe, UserPlus,
    Trash2, AlertCircle, Landmark, CheckCircle2, ArrowRight,
    Users,
    Calendar,
    Video
} from "lucide-react";
import { registerForEvent, checkEmail } from "@/libs/api";
import { useRouter } from "next/navigation";

/**
 * Helper to display error messages. 
 */
const ErrorMsg = ({ name, errors, touched }: { name: string; errors: any; touched: any }) => {
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    if (error && isTouched && typeof error === "string") {
        return (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-[11px] font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={12} />
                <span>{error}</span>
            </div>
        );
    }
    return null;
};

export default function RegistrationFormPage() {
    const router = useRouter();

    // UI Flow States
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: Payment, 3: Success
    const [finalPayload, setFinalPayload] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<"online" | "manual" | null>(null);

    // API/Form States
    const [alert, setAlert] = useState<{ message: string; success: boolean } | null>(null);
    const [checkingEmail, setCheckingEmail] = useState(false);

    const initialValues: RegistrationForm = {
        name: "",
        email: "",
        phone: "",
        // address: "", // Make sure your schema and form fields match!
        categoryId: "",
        children: [],
    };

    const calculateTotal = (values: RegistrationForm) => {
        const mainPrice = categories.find((c) => c.id === values.categoryId)?.price || 0;
        const childrenPrice = values.children.reduce((acc, child) => {
            const cat = categories.find((c) => c.id === child.categoryId);
            return acc + (cat?.price || 0);
        }, 0);
        return mainPrice + childrenPrice;
    };

    const handleFormSubmit = async (values: RegistrationForm, { setSubmitting }: any) => {
        const payload = {
            ...values,
            total_payment: calculateTotal(values),
        };

        try {
            const data = await registerForEvent(payload);

            if (data.success) {
                setFinalPayload(payload);
                setStep(2); // Move to Payment Step
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                setAlert({ message: data.message || "Failed to submit registration.", success: false });
                setTimeout(() => setAlert(null), 8000);
            }
        } catch (err) {
            setAlert({ message: "An unexpected error occurred. Please try again.", success: false });
            setTimeout(() => setAlert(null), 8000);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSimulatedOnlinePayment = () => {
        // Here you would integrate Paystack or Flutterwave
        console.log("Redirecting to Secure Payment Gateway...");
        setTimeout(() => setStep(3), 1500);
    };

    const handleConfirmManualPayment = () => {
        // Here you might make a quick API call to flag the registration as 'pending manual verification'
        setStep(3);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Error Toast (Only for Step 1 now, Success has its own dedicated page/step) */}
            {alert && step === 1 && (
                <div className="fixed top-4 right-4 z-50 bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5">
                    <AlertCircle size={20} />
                    <p className="text-sm font-bold">{alert.message}</p>
                </div>
            )}

            {/* Header Banner */}
            <div className="relative min-h-[600px] w-full bg-white overflow-hidden flex items-center"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

                {/* ── BACKGROUND ─────────────────────────────────────────────────────────── */}
                <div className="absolute inset-0">
                    {/* Soft navy-to-white radial — anchors the palette without going dark */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(ellipse at top right, #e0f7ff 0%, #f5f8ff 45%, #ffffff 80%)' }}
                    />
                    {/* Dot-grid texture (same as hero) */}
                    <div
                        className="absolute inset-0 opacity-[0.045]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #00C8FF 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                        }}
                    />
                    {/* Cyan glow — top right */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl"
                        style={{ background: 'rgba(0,200,255,0.10)' }} />
                    {/* Yellow glow — bottom left */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"
                        style={{ background: 'rgba(255,214,0,0.10)' }} />
                    {/* Fade-out at the very bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* ── CONTENT ────────────────────────────────────────────────────────────── */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* LEFT COLUMN — details */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-4">

                            {/* Badge */}
                            <span
                                className="inline-block text-white text-xs font-bold px-4 py-1.5 uppercase tracking-[0.2em]"
                                style={{
                                    background: '#061338',
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: '0.18em',
                                }}
                            >
                                19th International Leadership Conference
                            </span>

                            {/* Main heading — Oswald, bold italic, brand navy + cyan split */}
                            <h1
                                className="text-6xl md:text-8xl font-black leading-none tracking-tighter italic uppercase"
                                style={{ fontFamily: "'Oswald', 'Arial Narrow', sans-serif", color: '#061338' }}
                            >
                                BREAK{' '}
                                <span style={{ color: '#00C8FF' }}>FORTH</span>
                            </h1>

                            {/* Sub-badge */}
                            <div
                                className="inline-block px-4 py-2"
                                style={{ background: '#061338' }}
                            >
                                <p
                                    className="text-base md:text-lg font-bold uppercase tracking-widest text-white"
                                    style={{ fontFamily: "'Oswald', sans-serif" }}
                                >
                                    Enlarge and Expand on all Sides
                                </p>
                            </div>
                        </div>

                        {/* Logistics grid */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y"
                            style={{ borderColor: 'rgba(6,19,56,0.12)' }}
                        >
                            {/* Left logistics */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-1 shrink-0" size={20} style={{ color: '#00C8FF' }} />
                                    <div>
                                        <p className="text-xs uppercase font-bold tracking-wider" style={{ color: '#3A5580' }}>Date</p>
                                        <p className="font-bold" style={{ color: '#061338' }}>Wed. 22nd - Sun. 26th July 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 shrink-0" size={20} style={{ color: '#00C8FF' }} />
                                    <div>
                                        <p className="text-xs uppercase font-bold tracking-wider" style={{ color: '#3A5580' }}>Venue</p>
                                        <p className="font-bold" style={{ color: '#061338' }}>
                                            Hope Auditorium, Ife-Ibadan Expressway, Ile-Ife, Nigeria.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right logistics */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Globe className="mt-1 shrink-0" size={20} style={{ color: '#00C8FF' }} />
                                    <div>
                                        <p className="text-xs uppercase font-bold tracking-wider" style={{ color: '#3A5580' }}>Online</p>
                                        <p className="font-bold" style={{ color: '#061338' }}>@sanctuaryofhopechurch</p>
                                    </div>
                                </div>

                                {/* Zoom credentials — yellow-tinted card */}
                                <div
                                    className="flex items-start gap-3 p-3 rounded-lg border"
                                    style={{ background: '#FFFBE5', borderColor: 'rgba(255,214,0,0.4)' }}
                                >
                                    <Video className="mt-1 shrink-0" size={20} style={{ color: '#061338' }} />
                                    <div>
                                        <p
                                            className="text-xs uppercase font-bold tracking-wider mb-1"
                                            style={{ color: '#7A6000' }}
                                        >
                                            Zoom Credentials
                                        </p>
                                        <p className="font-bold text-sm" style={{ color: '#061338' }}>ID: 220 071 5116</p>
                                        <p className="font-bold text-sm" style={{ color: '#061338' }}>Pass: 123456</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <a
                            href="#register"
                            className="inline-flex items-center gap-3 px-8 py-4 font-black text-lg transition-all duration-200 hover:-translate-y-1"
                            style={{
                                background: '#FFD600',
                                color: '#061338',
                                fontFamily: "'Oswald', sans-serif",
                                letterSpacing: '0.06em',
                                boxShadow: '0 8px 30px rgba(255,214,0,0.3)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#FFE033')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#FFD600')}
                        >
                            REGISTER NOW
                            <ArrowRight size={20} />
                        </a>
                    </div>

                    {/* RIGHT COLUMN — hosts */}
                    <div className="lg:col-span-5 relative flex flex-col items-center">

                        {/* Soft navy circle glow behind the photos */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full -z-10"
                            style={{ background: 'rgba(0,200,255,0.07)', filter: 'blur(40px)' }}
                        />

                        {/* Photo pair */}
                        <div className="flex gap-4 mb-6">
                            <div
                                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl"
                                style={{
                                    transform: 'rotate(-3deg)',
                                    border: '4px solid white',
                                    boxShadow: '0 20px 40px rgba(6,19,56,0.18)',
                                }}
                            >
                                <img
                                    src="/images/gregerhabor.jpg"
                                    alt="Rev. Prof. Gregory Erhabor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl mt-8"
                                style={{
                                    transform: 'rotate(3deg)',
                                    border: '4px solid white',
                                    boxShadow: '0 20px 40px rgba(6,19,56,0.18)',
                                }}
                            >
                                <img
                                    src="/images/ayodeleerhabor.png"
                                    alt="Rev. Mrs. Ayodele Erhabor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Host label */}
                        <div className="text-center space-y-1">
                            {/* Cyan rule */}
                            <span className="block w-8 h-1 rounded-full mx-auto mb-2" style={{ background: '#00C8FF' }} />
                            <p
                                className="text-xs uppercase tracking-widest font-bold"
                                style={{ color: '#00C8FF', fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Your Hosts
                            </p>
                            <h3
                                className="text-xl font-black"
                                style={{ color: '#061338', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}
                            >
                                Rev. Prof. Gregory Erhabor
                            </h3>
                            <h3
                                className="text-xl font-black"
                                style={{ color: '#061338', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}
                            >
                                &amp; Rev. Mrs. Ayodele Erhabor
                            </h3>
                        </div>

                        {/* Yellow accent dot — decorative */}
                        <div
                            className="absolute bottom-4 right-4 w-4 h-4 rounded-full"
                            style={{ background: '#FFD600', boxShadow: '0 0 16px rgba(255,214,0,0.5)' }}
                        />
                    </div>

                </div>
            </div>

            {/* STEP 1: REGISTRATION DATA CAPTURE */}
            {step === 1 && (
                <Formik
                    initialValues={initialValues}
                    validate={(values) => {
                        const result = registrationSchema.safeParse(values);
                        if (result.success) return {};
                        const errors: any = {};
                        result.error.issues.forEach((issue) => {
                            const path = issue.path;
                            let current = errors;
                            path.forEach((key, index) => {
                                if (index === path.length - 1) {
                                    current[key] = issue.message;
                                } else {
                                    if (!current[key]) current[key] = typeof path[index + 1] === "number" ? [] : {};
                                    current = current[key];
                                }
                            });
                        });
                        return errors;
                    }}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, errors, touched, isSubmitting, isValid, submitCount }) => (
                        <Form className="max-w-5xl mx-auto px-4 -mt-10 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* LEFT COLUMN: Form Fields */}
                            <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-[#00C8FF] flex items-center justify-center text-sm font-bold">1</div>
                                        Registrant Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-bold text-gray-600">Select Category</label>
                                            <Field as="select" name="categoryId" className="mt-1 w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none [color-scheme:light]">
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                        {cat.price != null && ` — ₦${cat.price.toLocaleString()}`}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMsg name="categoryId" errors={errors} touched={touched} />
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-gray-600">Full Name (The exact way you want it to appear on your certificate)</label>
                                            <Field
                                                name="name"
                                                className={`mt-1 w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${getIn(errors, 'name') && getIn(touched, 'name') ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                                placeholder="Enter name"
                                            />
                                            <ErrorMsg name="name" errors={errors} touched={touched} />
                                        </div>

                                        <div>
                                            <Field name="email">
                                                {({ field, form }: any) => (
                                                    <div>
                                                        <label className="text-sm font-bold text-gray-600">Email Address</label>
                                                        <input
                                                            {...field}
                                                            type="email"
                                                            placeholder="email@domain.com"
                                                            className={`mt-1 w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${getIn(form.errors, 'email') && getIn(form.touched, 'email') ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                                            onBlur={async (e) => {
                                                                form.handleBlur(e);
                                                                const email = e.target.value;
                                                                if (!email) return;
                                                                try {
                                                                    setCheckingEmail(true);
                                                                    const res = await checkEmail(email);
                                                                    if (res.success && res.data?.exists) {
                                                                        form.setFieldError("email", "This email has already been used for registration.");
                                                                    }
                                                                } finally {
                                                                    setCheckingEmail(false);
                                                                }
                                                            }}
                                                        />
                                                        {checkingEmail && <p className="text-[11px] text-gray-400 mt-1">Checking email...</p>}
                                                        <ErrorMsg name="email" errors={form.errors} touched={form.touched} />
                                                    </div>
                                                )}
                                            </Field>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="text-sm font-bold text-gray-600">Phone Number</label>
                                            <Field
                                                name="phone"
                                                type="tel"
                                                className={`mt-1 w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-colors ${getIn(errors, 'phone') && getIn(touched, 'phone') ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                                placeholder="+2348012345678"
                                            />
                                            <p className="text-[10px] text-gray-400 mt-1 italic leading-tight">
                                                Include country code for international numbers (e.g. +1 for USA).
                                            </p>
                                            <ErrorMsg name="phone" errors={errors} touched={touched} />
                                        </div>
                                    </div>

                                    <hr className="my-8 border-gray-100" />

                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#00C8FF] flex items-center justify-center text-sm font-bold">2</div>
                                            Additional Delegates
                                        </h3>
                                        <FieldArray name="children">
                                            {({ push }) => (
                                                <button
                                                    type="button"
                                                    onClick={() => push({ name: "", email: "", phone: "", categoryId: "children" })}
                                                    className="flex items-center gap-1 text-sm font-bold text-[#00C8FF] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                                                >
                                                    <UserPlus size={16} /> Add Person
                                                </button>
                                            )}
                                        </FieldArray>
                                    </div>

                                    <FieldArray name="children">
                                        {({ remove }) => (
                                            <div className="space-y-4">
                                                {values.children.map((_, index) => (
                                                    <div key={index} className="p-5 rounded-xl border-2 border-gray-100 bg-white relative group">
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                        <div className="mb-4 text-sm font-bold text-gray-600 flex items-center gap-2">
                                                            Delegate {index + 1}
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-6">
                                                            <div>
                                                                <Field
                                                                    name={`children.${index}.name`}
                                                                    placeholder="Delegate Name"
                                                                    className={`w-full p-3 rounded-lg border bg-white text-sm outline-none focus:ring-1 focus:ring-blue-500 ${getIn(errors, `children.${index}.name`) && getIn(touched, `children.${index}.name`) ? 'border-red-500' : 'border-gray-200'}`}
                                                                />
                                                                <ErrorMsg name={`children.${index}.name`} errors={errors} touched={touched} />
                                                            </div>
                                                            <div>
                                                                <Field name={`children.${index}.email`}>
                                                                    {({ field, form }: any) => (
                                                                        <div>
                                                                            <input
                                                                                {...field}
                                                                                type="email"
                                                                                placeholder="Email (Optional)"
                                                                                className={`w-full p-3 rounded-lg border bg-white text-sm outline-none focus:ring-1 focus:ring-blue-500 ${getIn(form.errors, `children.${index}.email`) && getIn(form.touched, `children.${index}.email`) ? "border-red-500" : "border-gray-200"}`}
                                                                                onBlur={async (e) => {
                                                                                    form.handleBlur(e);
                                                                                    const email = e.target.value;
                                                                                    if (!email) return;
                                                                                    try {
                                                                                        setCheckingEmail(true);
                                                                                        const res = await checkEmail(email);
                                                                                        if (res.success && res.data?.exists) {
                                                                                            form.setFieldError(`children.${index}.email`, "This email is already in use.");
                                                                                        }
                                                                                    } finally {
                                                                                        setCheckingEmail(false);
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <ErrorMsg name={`children.${index}.email`} errors={form.errors} touched={form.touched} />
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </div>
                                                            <div>
                                                                <Field
                                                                    name={`children.${index}.phone`}
                                                                    placeholder="Phone (Optional)"
                                                                    className={`w-full p-3 rounded-lg border bg-white text-sm outline-none focus:ring-1 focus:ring-blue-500 ${getIn(errors, `children.${index}.phone`) && getIn(touched, `children.${index}.phone`) ? 'border-red-500' : 'border-gray-200'}`}
                                                                />
                                                                <ErrorMsg name={`children.${index}.phone`} errors={errors} touched={touched} />
                                                            </div>
                                                            <div>
                                                                <Field as="select" name={`children.${index}.categoryId`} className="w-full p-3 rounded-lg border border-gray-200 bg-white text-sm outline-none [color-scheme:light]">
                                                                    {categories.map((cat) => (
                                                                        <option key={cat.id} value={cat.id}>{cat.name} (₦{cat.price})</option>
                                                                    ))}
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {values.children.length === 0 && (
                                                    <p className="text-center py-6 text-gray-400 text-sm italic border-2 border-dashed border-gray-100 rounded-xl">
                                                        No additional people added yet.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </FieldArray>

                                    {/* We allow clicking the button at all times. If invalid, Formik will show errors automatically. */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || checkingEmail}
                                        className="mt-10 w-full bg-[#00C8FF] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                    >
                                        {isSubmitting ? "Saving Registration..." : "Continue to Payment"}
                                        {!isSubmitting && <ArrowRight size={20} />}
                                    </button>

                                    {!isValid && submitCount > 0 && (
                                        <p className="text-red-500 text-center text-sm mt-3 font-medium">Please fix the errors above to continue.</p>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Sidebar (Summary Only) */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#00C8FF] sticky top-6">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <CreditCard size={18} /> Cart Summary
                                    </h4>
                                    <div className="space-y-3 text-sm border-b pb-4">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Main Attendee</span>
                                            <span className="font-semibold text-gray-900">
                                                ₦{(categories.find((c) => c.id === values.categoryId)?.price || 0).toLocaleString()}
                                            </span>
                                        </div>
                                        {values.children.length > 0 && (
                                            <div className="flex justify-between text-gray-600">
                                                <span>Delegates ({values.children.length})</span>
                                                <span className="font-semibold text-gray-900">
                                                    ₦{values.children.reduce((acc, c) => acc + (categories.find((cat) => cat.id === c.categoryId)?.price || 0), 0).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-lg font-bold text-gray-800">Total Payable:</span>
                                        <span className="text-2xl font-black text-[#00C8FF]">
                                            ₦{calculateTotal(values).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-4 leading-tight text-center">
                                        You will select your preferred payment method on the next screen.
                                    </p>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}

            {/* STEP 2: PAYMENT SELECTION */}
            {step === 2 && finalPayload && (
                <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-gray-800">Details Saved!</h2>
                            <p className="text-gray-500 mt-2">Your registration is pending payment.</p>
                            <div className="mt-4 inline-block bg-blue-50 border border-blue-100 px-6 py-3 rounded-xl">
                                <span className="text-sm text-gray-600 block mb-1">Total Amount Due</span>
                                <span className="text-4xl font-black text-blue-700">₦{finalPayload.total_payment.toLocaleString()}</span>
                            </div>
                        </div>

                        <h3 className="font-bold text-lg text-gray-800 mb-4">Choose Payment Method</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Option 1: Online */}
                            {/* <button 
                                onClick={() => setPaymentMethod("online")}
                                className={`p-6 rounded-xl border-2 text-left transition-all ${paymentMethod === "online" ? "border-[#00C8FF] bg-blue-50 ring-4 ring-blue-50" : "border-gray-200 hover:border-blue-300"}`}
                            >
                                <CreditCard className={`mb-3 ${paymentMethod === "online" ? "text-[#00C8FF]" : "text-gray-400"}`} size={28} />
                                <h4 className="font-bold text-gray-900 text-lg">Pay Online</h4>
                                <p className="text-sm text-gray-500 mt-1">Instant confirmation via Paystack/Card.</p>
                            </button> */}

                            {/* Option 2: Manual */}
                            <button
                                onClick={() => setPaymentMethod("manual")}
                                className={`p-6 rounded-xl border-2 text-left transition-all ${paymentMethod === "manual" ? "border-[#00C8FF] bg-blue-50 ring-4 ring-blue-50" : "border-gray-200 hover:border-blue-300"}`}
                            >
                                <Landmark className={`mb-3 ${paymentMethod === "manual" ? "text-[#00C8FF]" : "text-gray-400"}`} size={28} />
                                <h4 className="font-bold text-gray-900 text-lg">Bank Transfer</h4>
                                <p className="text-sm text-gray-500 mt-1">Manual verification via WhatsApp.</p>
                            </button>
                        </div>

                        {/* Expandable Manual Transfer Details */}
                        {paymentMethod === "manual" && (
                            <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 animate-in slide-in-from-top-4">
                                <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Transfer Details</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        <span className="text-gray-500 text-sm">Bank Name</span>
                                        <span className="font-bold text-gray-900">GTBank</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        <span className="text-gray-500 text-sm">Account Name</span>
                                        <span className="font-bold text-gray-900 text-right">Spokesman Communication Ministries</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                        <span className="text-gray-500 text-sm">Account Number</span>
                                        <span className="font-black text-blue-700 text-xl tracking-wider select-all">0037071131</span>
                                    </div>
                                </div>

                                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                                    <div className="flex gap-3">
                                        <MessageCircle className="text-yellow-600 mt-0.5" size={20} />
                                        <div>
                                            <p className="text-sm font-bold text-yellow-800">Important Step</p>
                                            <p className="text-sm text-yellow-700 mt-1 leading-snug">
                                                After transferring, please send your payment receipt to
                                                <a href="https://wa.me/2348022999900" target="_blank" rel="noreferrer" className="font-bold underline ml-1 hover:text-yellow-900">
                                                    08022999900
                                                </a> on WhatsApp to get your ticket confirmed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment CTA */}
                        {paymentMethod && (
                            <div className="mt-8">
                                {paymentMethod === "online" ? (
                                    <button
                                        onClick={handleSimulatedOnlinePayment}
                                        className="w-full bg-[#00C8FF] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg transition-all"
                                    >
                                        Pay ₦{finalPayload.total_payment.toLocaleString()} Now
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleConfirmManualPayment}
                                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black shadow-lg transition-all"
                                    >
                                        I Have Transferred ₦{finalPayload.total_payment.toLocaleString()}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
                <div className="max-w-2xl mx-auto px-4 -mt-10 relative z-20 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200 text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-3">You're All Set!</h2>

                        {paymentMethod === "online" ? (
                            <p className="text-gray-600 mb-8">
                                Payment received successfully. Your ticket and registration details have been sent to <strong>{finalPayload?.email}</strong>.
                            </p>
                        ) : (
                            <>
                                <p className="text-gray-600 mb-8">
                                    Registration saved. We will review your manual payment and send your ticket to <strong>{finalPayload?.email}</strong> once confirmed via WhatsApp.
                                </p>
                                <div className="mt-4 flex items-start gap-3 p-3">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <MessageCircle size={16} />
                                    </div>
                                    <div className="text-[11px] leading-snug">
                                        <p className="font-bold text-gray-900">WhatsApp Proof</p>
                                        <p className="text-gray-500 mb-1">Send your transfer screenshot to:</p>
                                        <a href="https://wa.me/2348022999900" className="font-bold text-[#00C8FF] hover:underline">08022999900</a>
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            onClick={() => router.push("/")}
                            className="bg-slate-50 text-gray-800 py-3 px-8 rounded-xl font-bold hover:bg-gray-200 transition-all"
                        >
                            Return to Homepage
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}