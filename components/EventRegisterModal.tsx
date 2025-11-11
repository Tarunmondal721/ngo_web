// components/EventRegisterModal.tsx
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Calendar,
    Clock,
    MapPin,
    CheckCircle,
    Send,
    RotateCw,
} from "lucide-react";
import Countdown from "react-countdown";
import { sendOtp, verifyOtp } from "@/lib/public"; // ← BOTH

const step1Schema = z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone").min(10, "Phone too short"),
    address: z.string().min(10, "Address too short"),
    event_id: z.number(),
});

const step2Schema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

interface EventRegisterModalProps {
    event: {
        title: string;
        date: string;
        time: string;
        location: string;
        price: string;
        id: number;
        attendees?: number;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EventRegisterModal({
    event,
    open,
    onOpenChange,
}: EventRegisterModalProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [countdownKey, setCountdownKey] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const [email, setEmail] = useState("");

    const step1Form = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: { event_id: event.id },
    });

    const step2Form = useForm<Step2Data>({
        resolver: zodResolver(step2Schema),
    });

    // SEND OTP ON BUTTON CLICK (NOT AUTO)
    const handleSendOtp = async () => {
        const result = await step1Form.trigger(); // Validate form
        if (!result) return;

        const data = step1Form.getValues();
        setEmail(data.email);
        setIsResending(true);

        try {
            await sendOtp(data.email, event.title);
            setStep(2);
            setCountdownKey(Date.now());
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setIsResending(false);
        }
    };

    // RESEND OTP
    const handleResend = async () => {
        setIsResending(true);
        try {
            await sendOtp(email, event.title);
            setCountdownKey(Date.now());
            alert("OTP resent!");
        } catch (error: any) {
            alert(error.response?.data?.message || "Resend failed");
        } finally {
            setIsResending(false);
        }
    };

    // VERIFY OTP
    const verifyAndSubmit = async (otpData: Step2Data) => {
        try {
            const step1Data = step1Form.getValues();

            await verifyOtp({
                name: step1Data.name,
                email: step1Data.email,
                phone: step1Data.phone,
                address: step1Data.address,
                event_id: step1Data.event_id,
                otp: otpData.otp,
            });

            setIsSubmitted(true);
            setTimeout(() => {
                onOpenChange(false);
                step1Form.reset();
                step2Form.reset();
                setStep(1);
                setIsSubmitted(false);
            }, 2000);
        } catch (error: any) {
            // FIX: Extract Laravel validation errors
            const errMsg = error.response?.data?.message;
            const errObj = error.response?.data?.errors;

            let fullError = "Something went wrong";

            if (errObj && typeof errObj === 'object') {
                // Convert { email: ["taken"] } → "email: taken"
                fullError = Object.entries(errObj)
                    .map(([field, messages]) => {
                        const msg = Array.isArray(messages) ? messages[0] : messages;
                        return `${field}: ${msg}`;
                    })
                    .join("\n");
            } else if (errMsg) {
                fullError = errMsg;
            }

            alert(fullError);
        }
    };

    const CountdownRenderer = ({ seconds }: { seconds: number }) => (
        <span className="text-sm text-muted-foreground">
            Resend in {seconds}s
        </span>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-xl border border-white/20 max-h-[90vh] flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 pr-2">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                            {step === 1 ? "Register for Event" : "Verify Email"}
                        </DialogTitle>
                    </DialogHeader>

                    {/* Event Summary */}
                    {step === 1 && (
                        <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm mb-6">
                            <h4 className="font-semibold text-foreground">{event.title}</h4>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(event.date).toLocaleDateString("en-IN", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />
                                {event.location}
                            </div>
                            <div className="font-semibold text-primary">{event.price}</div>
                        </div>
                    )}

                    {/* Step 1: Form */}
                    {step === 1 && !isSubmitted && (
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" {...step1Form.register("name")} />
                                {step1Form.formState.errors.name && (
                                    <p className="text-sm text-destructive mt-1">
                                        {step1Form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email (OTP will be sent here)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    {...step1Form.register("email")}
                                />
                                {step1Form.formState.errors.email && (
                                    <p className="text-sm text-destructive mt-1">
                                        {step1Form.formState.errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    placeholder="+91 XXXXX-XXXXX"
                                    {...step1Form.register("phone")}
                                />
                                {step1Form.formState.errors.phone && (
                                    <p className="text-sm text-destructive mt-1">
                                        {step1Form.formState.errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    placeholder="Flat, Street, City, PIN"
                                    rows={3}
                                    className="resize-none"
                                    {...step1Form.register("address")}
                                />
                                {step1Form.formState.errors.address && (
                                    <p className="text-sm text-destructive mt-1">
                                        {step1Form.formState.errors.address.message}
                                    </p>
                                )}
                            </div>

                            <input type="hidden" {...step1Form.register("event_id", { valueAsNumber: true })} />
                        </form>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && !isSubmitted && (
                        <form
                            onSubmit={step2Form.handleSubmit(verifyAndSubmit)}
                            className="space-y-4"
                        >
                            <div className="text-center mb-4">
                                <p className="text-sm text-muted-foreground">
                                    OTP sent to <strong>{email}</strong>
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="otp">Enter 6-digit OTP</Label>
                                <Input
                                    id="otp"
                                    placeholder="XXXXXX"
                                    maxLength={6}
                                    className="text-center text-2xl tracking-widest"
                                    {...step2Form.register("otp")}
                                />
                                {step2Form.formState.errors.otp && (
                                    <p className="text-sm text-destructive mt-1 text-center">
                                        {step2Form.formState.errors.otp.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <Countdown
                                    key={countdownKey}
                                    date={Date.now() + 120000}
                                    renderer={CountdownRenderer}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2"
                                    disabled={isResending}
                                    onClick={handleResend}
                                >
                                    <RotateCw className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`} />
                                    Resend
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Success */}
                    {isSubmitted && (
                        <div className="text-center py-8">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <p className="text-lg font-semibold">Registration Successful!</p>
                            <p className="text-muted-foreground">
                                Confirmation sent to {email}
                            </p>
                        </div>
                    )}
                </div>

                {/* Fixed Button */}
                {!isSubmitted && (
                    <div className="p-6 pt-4 border-t border-white/10 bg-background/80 backdrop-blur">
                        <Button
                            type="button"
                            className="w-full"
                            disabled={isResending}
                            onClick={
                                step === 1
                                    ? handleSendOtp
                                    : step2Form.handleSubmit(verifyAndSubmit)
                            }
                        >
                            {step === 1 ? (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    {isResending ? "Sending..." : "Send OTP to Email"}
                                </>
                            ) : (
                                "Verify & Register"
                            )}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}