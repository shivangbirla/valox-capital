import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WEB3FORMS_ACCESS_KEY, COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  investorType: z.enum(["Individual", "HNI", "Institution"], {
    errorMap: () => ({ message: "Please choose an investor type." }),
  }),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v, {
    message: "Please agree to be contacted so we can reply.",
  }),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

const fieldError = "mt-1.5 text-xs text-destructive";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New enquiry — Valox Capital website",
          from_name: "Valox Capital website",
          name: values.name,
          email: values.email,
          phone: values.phone,
          investor_type: values.investorType,
          message: values.message || "(no message)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 px-6 py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="mt-4 font-display text-xl font-semibold">Thank you — message received.</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We&apos;ll be in touch shortly at the contact details you provided. For anything urgent,
          message us on WhatsApp at {COMPANY.phoneDisplay}.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className="mt-1.5"
            {...register("name")}
          />
          {errors.name && <p className={fieldError}>{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="mt-1.5"
            {...register("email")}
          />
          {errors.email && <p className={fieldError}>{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 ..."
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            className="mt-1.5"
            {...register("phone")}
          />
          {errors.phone && <p className={fieldError}>{errors.phone.message}</p>}
        </div>

        <div>
          <Label htmlFor="investorType">Investor type</Label>
          <Controller
            control={control}
            name="investorType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="investorType"
                  className="mt-1.5"
                  aria-invalid={!!errors.investorType}
                >
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="HNI">HNI</SelectItem>
                  <SelectItem value="Institution">Institution</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.investorType && <p className={fieldError}>{errors.investorType.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          placeholder="Tell us a little about what you're looking for."
          className="mt-1.5"
          {...register("message")}
        />
      </div>

      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
                aria-invalid={!!errors.consent}
                className="mt-0.5"
              />
              <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
                I agree to be contacted by Valox Capital.
              </Label>
            </div>
            {errors.consent && <p className={fieldError}>{errors.consent.message}</p>}
          </div>
        )}
      />

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong sending your message. Please try again, or email {COMPANY.email}.
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className={cn("w-full sm:w-auto", status === "submitting" && "pointer-events-none")}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
