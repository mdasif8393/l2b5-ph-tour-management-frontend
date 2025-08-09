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
import { useSendOtpMutation } from "@/redux/features/auth/auth.api";
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

  //! Needed. Turn of for development
  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email, navigate]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleConfirm = async () => {
    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent");
      }
      setConfirmed(true);
    } catch (err) {
      console.log(err);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

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
            <CardTitle>Send OTP to your Email</CardTitle>
            <CardDescription>We will send otp at {email}</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-2">
            <Button
              form="otp-form"
              type="submit"
              className="w-full"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
