'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Loader2,
  Heart,
  CheckCircle,
  Sparkles,
  Mail,
  Check,
  ArrowLeft,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import Confetti from 'react-confetti';
import { createOrder, verifyPayment, sendOtp, Otpverify } from '@/lib/public';

const schema = z.object({
  name: z.string().min(2, 'Name must be ≥ 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be ≥ 10 digits').regex(/^\d+$/, 'Only digits'),
  amount: z.coerce.number().min(1, 'Amount ≥ ₹1'),
});

type FormData = z.infer<typeof schema>;

declare global {
  interface Window {
    Razorpay: any;
    razorpayLoaded?: boolean;
  }
}

/* ---------- Floating Label Input (Exact Shadcn Style) ---------- */
function FloatingLabelInput({
  id,
  label,
  type = 'text',
  register,
  error,
  disabled,
  ...props
}: {
  id: string;
  label: string;
  type?: string;
  register: any;
  error?: string;
  disabled?: boolean;
  [key: string]: any;
}) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={type}
        disabled={disabled}
        className={cn(
          'peer h-14 px-4 pt-5 pb-2 text-base placeholder-transparent border focus:border-emerald-500 focus:ring-0',
          error && 'border-red-500 focus:border-red-500',
          disabled && 'bg-gray-50 cursor-not-allowed'
        )}
        placeholder=" "
        {...register(id)}
        {...props}
      />
      <Label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-4 top-4 text-sm text-gray-500 transition-all duration-200',
          // When empty
          'peer-placeholder-shown:top-5 peer-placeholder-shown:text-base',
          // When focused or has value
          'peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600',
          'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-emerald-600',
          error && 'text-red-500 peer-focus:text-red-500'
        )}
      >
        {label}
      </Label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ---------- OTP Input (6 Boxes) ---------- */
function OTPInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          value={value[i] ?? ''}
          disabled={disabled}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            if (!val) return;
            const newOtp = value.split('');
            newOtp[i] = val;
            onChange(newOtp.join('').slice(0, 6));
            const next = e.target.nextElementSibling as HTMLInputElement | null;
            next?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !value[i]) {
              const prev = e.currentTarget.previousElementSibling as HTMLInputElement | null;
              prev?.focus();
            }
          }}
          className={cn(
            'w-12 h-12 text-center text-xl font-semibold rounded-xl border-2 transition-all',
            'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200',
            disabled ? 'bg-gray-100 border-gray-300' : 'border-gray-300 bg-white'
          )}
        />
      ))}
    </div>
  );
}

/* ------------------- Main Page ------------------- */
export default function DonationPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 100 },
  });

  const selectedAmount = watch('amount');
  const email = watch('email');
  const presetAmounts = [100, 500, 1000, 2500];

  /* ---- Load Razorpay ---- */
  useEffect(() => {
    if (window.razorpayLoaded) return;
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    s.onload = () => (window.razorpayLoaded = true);
    document.body.appendChild(s);
  }, []);

  /* ---- Resend Timer ---- */
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  /* ---- Send OTP ---- */
  const sendOtpHandler = async () => {
    const valid = await trigger('email');
    if (!valid) return;

    setLoading(true);
    try {
      await sendOtp(email);
      setOtpSent(true);
      setResendTimer(60);
      toast({ title: 'OTP Sent!', description: `Check ${email}` });
    } catch {
      toast({ title: 'Failed', description: 'Could not send OTP', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  /* ---- Verify OTP ---- */
  const verifyOtpHandler = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    try {
      await Otpverify(email, otp);
      setOtpVerified(true);
      toast({ title: 'Verified!', description: 'Email confirmed' });
    } catch {
      toast({ title: 'Invalid OTP', description: 'Try again', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  /* ---- Submit → Razorpay ---- */
  const onSubmit = async (data: FormData) => {
    if (!otpVerified) {
      toast({ title: 'Verify Email', description: 'Complete OTP first', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const order = await createOrder(data);

      const options = {
        key: order.key,
        amount: order.amount,
        currency: 'INR',
        name: 'Suhrit Organization',
        description: 'One-time Donation',
        order_id: order.order_id,
        handler: async (response: any) => {
          try {
            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (result.success) {
              setSuccess(true);
              setShowConfetti(true);
              toast({ title: 'Thank You!', description: 'Donation successful!' });
            }
          } catch {
            toast({ title: 'Failed', description: 'Verification failed', variant: 'destructive' });
          }
        },
        prefill: { name: data.name, email: data.email, contact: data.phone },
        theme: { color: '#10b981' },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  /* ---- Confetti ---- */
  useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 animate-gradient-x">
        <Navigation />
        <main className="container max-w-3xl mx-auto px-4 py-12">

          {/* Hero */}
          <section className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-4">
              Make a Difference Today
            </h1>
            <p className="text-lg md:text-xl text-emerald-700">
              Every rupee fuels education, health, and hope.
            </p>
          </section>

          {/* Success */}
          {success ? (
            <Card className="relative overflow-hidden bg-white/90 backdrop-blur-md shadow-2xl animate-fade-up">
              {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
              <div className="p-12 text-center">
                <CheckCircle className="w-20 h-20 mx-auto mb-6 text-emerald-600 animate-bounce" />
                <h2 className="text-3xl font-bold text-emerald-800">Thank You!</h2>
                <p className="mt-2 text-emerald-600">Your donation has been received.</p>
              </div>
            </Card>
          ) : (
            <Card className="relative overflow-hidden bg-white/80 backdrop-blur-lg shadow-2xl border-0 animate-fade-up">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 pointer-events-none" />
              <CardHeader className="pb-8">
                <CardTitle className="flex items-center gap-2 text-2xl text-emerald-700">
                  <Heart className="w-7 h-7 text-red-500 animate-pulse" />
                  Donate Now
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

                  {/* Preset Amounts */}
                  <div>
                    <Label className="text-base font-medium">Quick Amounts (₹)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setValue('amount', amt, { shouldValidate: true })}
                          className={cn(
                            'relative py-3 rounded-xl border-2 font-semibold transition-all',
                            selectedAmount === amt
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg scale-105'
                              : 'bg-white border-gray-300 hover:border-emerald-400 hover:shadow-md'
                          )}
                        >
                          ₹{amt}
                          {selectedAmount === amt && (
                            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* All Floating Inputs */}
                  <FloatingLabelInput id="amount" label="Custom Amount (₹)" type="number" register={register} error={errors.amount?.message} />
                  <FloatingLabelInput id="name" label="Full Name" register={register} error={errors.name?.message} />
                  
                  <div className="space-y-4">
                    <FloatingLabelInput
                      id="email"
                      label="Email Address"
                      type="email"
                      register={register}
                      error={errors.email?.message}
                      disabled={otpVerified}
                    />

                    {/* OTP Card */}
                    {otpSent && !otpVerified && (
                      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-md animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                            <Mail className="w-5 h-5" /> Enter OTP
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => { setOtpSent(false); setOtp(''); }}
                          >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Change
                          </Button>
                        </div>
                        <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                        <div className="flex justify-between mt-5">
                          <Button onClick={verifyOtpHandler} disabled={loading || otp.length !== 6}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                          </Button>
                          <button
                            type="button"
                            onClick={sendOtpHandler}
                            disabled={loading || resendTimer > 0}
                            className={cn('text-sm underline', resendTimer > 0 ? 'text-gray-500' : 'text-emerald-600')}
                          >
                            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                          </button>
                        </div>
                      </Card>
                    )}

                    {!otpSent && !otpVerified && (
                      <Button
                        type="button"
                        onClick={sendOtpHandler}
                        disabled={loading || !email || !!errors.email}
                        variant="outline"
                        className="w-full"
                      >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                        Send OTP
                      </Button>
                    )}

                    {otpVerified && (
                      <p className="flex items-center gap-2 text-emerald-600 text-sm">
                        <Check className="w-4 h-4" /> Email verified
                      </p>
                    )}
                  </div>

                  <FloatingLabelInput id="phone" label="Phone Number" register={register} error={errors.phone?.message} />

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading || !otpVerified}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      'Donate Now'
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  Secured by <span className="font-bold text-emerald-600">Razorpay</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-600">
            {[
              { icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: '100% Transparent' },
              { icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: 'Tax Exempt (80G)' },
              { icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: 'Secure Payments' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-2 text-emerald-600">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>

      <style jsx>{`
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 15s ease infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in, .animate-fade-up { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </>
  );
}