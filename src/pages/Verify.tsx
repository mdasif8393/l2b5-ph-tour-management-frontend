import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const navigate = useNavigate();

  const location = useLocation();

  const [email] = useState(location.state);

  const [confirmed, setConfirmed] = useState(false);

  const [sendOtp] = useSendOtpMutation();

  const [verifyOtp] = useVerifyOtpMutation();

  const [timer, setTimer] = useState(10);

  //! Needed. Turn of for development
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }
    const timerId = setInterval(() => {
      if (email && confirmed) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [email, confirmed]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // send otp to email
  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP....");

    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent. Check your email", { id: toastId });
        setConfirmed(true);
        setTimer(10);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // verify otp get from email
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP....");

    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP verified", { id: toastId });
      }
      setConfirmed(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              Please enter 6-digits code we sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Otp</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0}
                          // normal class
                          className={cn("p-0 m-0", {
                            // conditional class
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Resent OTP
                        </Button>
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button form="otp-form" type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-sm w-[300px]">
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>We will send otp at {email}</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-2">
            <Button
              form="otp-form"
              type="submit"
              className="w-full"
              onClick={handleSendOtp}
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
