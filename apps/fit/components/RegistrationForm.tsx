"use client";

import { useState } from "react";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import {
  RegistrationForm as RegistrationFormType,
  registrationSchema,
} from "@/schemas/registrationSchema";
import {
  MapPin,
  Calendar,
  Clock,
  UserPlus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";
import { registerForFit } from "@/libs/api";

const ErrorMsg = ({ name, errors, touched }: { name: string; errors: any; touched: any }) => {
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  if (error && isTouched && typeof error === "string") {
    return (
      <div className="flex items-center gap-1 mt-1 text-red-600 text-[11px] font-semibold">
        <AlertCircle size={12} />
        <span>{error}</span>
      </div>
    );
  }
  return null;
};

export default function RegistrationForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [alert, setAlert] = useState<{ message: string; success: boolean } | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const initialValues: RegistrationFormType = {
    name: "",
    email: "",
    phone: "",
    bringingGuests: false,
    guests: [],
  };

  const handleFormSubmit = async (values: RegistrationFormType, { setSubmitting }: any) => {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      guests: values.bringingGuests ? values.guests : [],
      guest_count: values.bringingGuests ? values.guests.length : 0,
    };

    try {
      const data = await registerForFit(payload);

      if (data.success) {
        setSubmittedName(values.name);
        setSubmittedEmail(values.email);
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setAlert({ message: data.message || "Failed to submit registration.", success: false });
        setTimeout(() => setAlert(null), 8000);
      }
    } catch {
      setAlert({ message: "An unexpected error occurred. Please try again.", success: false });
      setTimeout(() => setAlert(null), 8000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="register" className="scroll-mt-6">
      {alert && step === 1 && (
        <div className="fixed top-4 right-4 z-50 bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{alert.message}</p>
        </div>
      )}

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
          {({ values, errors, touched, isSubmitting, isValid, submitCount, setFieldValue }) => (
            <Form className="max-w-2xl mx-auto px-4">
              <div
                className="rounded-3xl shadow-2xl p-6 md:p-10 border-2"
                style={{ background: "#ffffff", borderColor: "var(--fit-cream-dark)" }}
              >
                <div className="mb-8 text-center">
                  <span
                    className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest"
                    style={{ background: "var(--fit-cream)", color: "var(--fit-red)" }}
                  >
                    <Sparkles size={14} /> Secure Your Seat
                  </span>
                  <h2
                    className="mt-3 text-3xl md:text-4xl font-black uppercase"
                    style={{ fontFamily: "var(--font-poppins)", color: "var(--fit-maroon)" }}
                  >
                    Register for FIT 2026
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm">
                    Fill in your details below to reserve your seat at the FIT-5 Annual
                    Leadership Conference.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <Field
                      name="name"
                      className={`mt-1 w-full p-3.5 rounded-xl border-2 focus:ring-2 outline-none transition-colors ${
                        getIn(errors, "name") && getIn(touched, "name")
                          ? "border-red-400 bg-red-50 focus:ring-red-200"
                          : "border-gray-200 focus:ring-orange-200"
                      }`}
                      placeholder="Enter your full name"
                    />
                    <ErrorMsg name="name" errors={errors} touched={touched} />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <Field
                      name="email"
                      type="email"
                      className={`mt-1 w-full p-3.5 rounded-xl border-2 focus:ring-2 outline-none transition-colors ${
                        getIn(errors, "email") && getIn(touched, "email")
                          ? "border-red-400 bg-red-50 focus:ring-red-200"
                          : "border-gray-200 focus:ring-orange-200"
                      }`}
                      placeholder="email@domain.com"
                    />
                    <ErrorMsg name="email" errors={errors} touched={touched} />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <Field
                      name="phone"
                      type="tel"
                      className={`mt-1 w-full p-3.5 rounded-xl border-2 focus:ring-2 outline-none transition-colors ${
                        getIn(errors, "phone") && getIn(touched, "phone")
                          ? "border-red-400 bg-red-50 focus:ring-red-200"
                          : "border-gray-200 focus:ring-orange-200"
                      }`}
                      placeholder="+2348012345678"
                    />
                    <p className="text-[11px] text-gray-400 mt-1 italic">
                      Include country code for international numbers (e.g. +1 for USA).
                    </p>
                    <ErrorMsg name="phone" errors={errors} touched={touched} />
                  </div>

                  <hr className="border-gray-100" />

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <Field
                        type="checkbox"
                        name="bringingGuests"
                        className="w-5 h-5 rounded accent-[var(--fit-red)]"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("bringingGuests", e.target.checked);
                          if (e.target.checked && values.guests.length === 0) {
                            setFieldValue("guests", [{ name: "" }]);
                          }
                          if (!e.target.checked) {
                            setFieldValue("guests", []);
                          }
                        }}
                      />
                      <span className="text-sm font-bold text-gray-700">
                        I&apos;m coming with someone else
                      </span>
                    </label>
                    <p className="text-[11px] text-gray-400 mt-1 ml-8">
                      Let us know who&apos;s coming with you so we can make adequate reservations
                      for them, sir/ma.
                    </p>
                  </div>

                  {values.bringingGuests && (
                    <FieldArray name="guests">
                      {({ push, remove }) => (
                        <div className="space-y-3">
                          {values.guests.map((_, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="flex-1">
                                <Field
                                  name={`guests.${index}.name`}
                                  placeholder={`Guest ${index + 1} full name`}
                                  className={`w-full p-3 rounded-lg border-2 bg-white text-sm outline-none focus:ring-2 focus:ring-orange-200 ${
                                    getIn(errors, `guests.${index}.name`) &&
                                    getIn(touched, `guests.${index}.name`)
                                      ? "border-red-400"
                                      : "border-gray-200"
                                  }`}
                                />
                                <ErrorMsg
                                  name={`guests.${index}.name`}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-2.5 text-gray-400 hover:text-red-500 transition"
                                aria-label="Remove guest"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ name: "" })}
                            className="flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-lg transition"
                            style={{ color: "var(--fit-red)", background: "var(--fit-cream)" }}
                          >
                            <UserPlus size={16} /> Add Another Guest
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full text-white py-4 rounded-xl font-black text-lg shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, var(--fit-red), var(--fit-orange))",
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Complete Registration"}
                    {!isSubmitting && <ArrowRight size={20} />}
                  </button>

                  {!isValid && submitCount > 0 && (
                    <p className="text-red-500 text-center text-sm font-medium">
                      Please fix the errors above to continue.
                    </p>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {step === 2 && (
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 text-center" style={{ borderColor: "var(--fit-cream-dark)" }}>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--fit-cream)", color: "var(--fit-red)" }}
            >
              <CheckCircle2 size={40} />
            </div>
            <h2
              className="text-3xl font-black mb-3"
              style={{ fontFamily: "var(--font-poppins)", color: "var(--fit-maroon)" }}
            >
              You&apos;re Registered!
            </h2>
            <p className="text-gray-600 mb-2">
              Thank you, <strong>{submittedName}</strong>. Your seat for FIT 2026 has been
              reserved.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              A confirmation will be sent to <strong>{submittedEmail}</strong>. See you at
              Lakehamm Residence!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--fit-cream)" }}>
                <Calendar className="mt-0.5 shrink-0" size={18} style={{ color: "var(--fit-red)" }} />
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500">Dates</p>
                  <p className="font-bold text-sm" style={{ color: "var(--fit-maroon)" }}>
                    Sat 26 &ndash; Sun 27 Sept, 2026
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--fit-cream)" }}>
                <MapPin className="mt-0.5 shrink-0" size={18} style={{ color: "var(--fit-red)" }} />
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500">Venue</p>
                  <p className="font-bold text-sm" style={{ color: "var(--fit-maroon)" }}>
                    Lakehamm Residence, GRA, Ikeja
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 text-left">
              <Phone className="mt-0.5 shrink-0 text-gray-400" size={18} />
              <div className="text-xs text-gray-500 leading-snug">
                <p className="font-bold text-gray-700 mb-0.5">Have a question?</p>
                <p>Ademola &mdash; 08053321190 &nbsp;|&nbsp; Justina &mdash; 07032121216</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
