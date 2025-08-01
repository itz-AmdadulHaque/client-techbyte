"use client"

import AuthCheck from '@/components/custom/AuthCheck'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Card, CardContent } from '@/components/ui/card'
import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const OTPSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
})

const VerifyOTP = () => {
  const [timer, setTimer] = useState(120)
  const [canResend, setCanResend] = useState(false)
  const router = useRouter()
  const axiosPrivate = useAxiosPrivate();

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  })

  // TIMER
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true)
      return
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  // 🔁 Resend OTP mutation
  const resendMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosPrivate.put("/auth/resend-otp")
      return res.data
    },
    onSuccess: () => {
      toast.success("OTP has been resent.")
      setTimer(120)
      setCanResend(false)
    },
    onError: () => {
      toast.error("Failed to resend OTP.")
    }
  })


  const verifyMutation = useMutation({
    mutationFn: async (data: z.infer<typeof OTPSchema>) => {
      const res = await axiosPrivate.post("/auth/verify-otp", data)
      return res.data
    },
    onSuccess: () => {
      toast.success("OTP verified!")
      router.push("/")
    },
    onError: () => {
      toast.error("Invalid OTP. Please try again.")
    }
  })

  function onSubmit(data: z.infer<typeof OTPSchema>) {
    verifyMutation.mutate(data)
  }

  return (
    <AuthCheck className="">
      <div className='container mx-auto flex flex-col items-center justify-center h-screen px-8'>
        <Card className="w-full max-w-2xl">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mx-auto py-10">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      
                      <FormLabel>One-Time Password</FormLabel>

                      <FormControl>
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormDescription className="flex justify-between items-center gap-2">
                        <span>Please enter the OTP sent to your phone.</span>
                        <Button
                          type="button"
                          variant="link"
                          className="px-1 text-sm"
                          onClick={() => resendMutation.mutate()}
                          disabled={!canResend || resendMutation.isPending}
                        >
                          {canResend
                            ? (resendMutation.isPending ? "Resending..." : "Resend OTP")
                            : `Resend in ${formatTime(timer)}`}
                        </Button>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={verifyMutation.isPending}>
                    {verifyMutation.isPending ? "Verifying..." : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AuthCheck>
  )
}

export default VerifyOTP
