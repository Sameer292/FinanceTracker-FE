import { zodResolver } from '@hookform/resolvers/zod'
import apiClient from 'app/lib/api'
import { isAxiosError } from 'axios'
import { Link, router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native'
import { toast } from 'sonner-native'
import z from 'zod'

export default function signup() {
  const registerSchema = z.object({
    name: z.string().min(1, { error: "Name is required" }),
    email: z.email({ error: "Email is required" }),
    password: z.string().min(1, { error: "Password is required" }),
    confirmPassword: z.string().min(1, { error: "Password is required" })
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })
  type registerSchemaType = z.infer<typeof registerSchema>
  const methods = useForm<registerSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema)
  })
  const onSubmit = async (data: registerSchemaType) => {
    const { confirmPassword, ...properData } = data
    try {
      const res = await apiClient.post('/register', properData)
      if (res.status === 200) {
        toast.success('Signup successful', {
          duration: 2000,
          description: res.data.message,
          richColors: true,
        })
        router.push('/login')
      }
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Signup failed', {
          duration: 2000,
          description: err.response?.data.detail,
          richColors: true,
        })
      } else {
        toast.error('Signup failed', {
          duration: 2000,
          description: 'Something went wrong',
          richColors: true,
        })
      }
    }

  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View className='flex-1 bg-[#F6F8F6] px-4 justify-center items-center'>
        <View className='gap-12 -mt-32 h-max w-full justify-center items-center'>
          {/* Header */}
          <View className='gap-2 w-full items-center justify-center' >
            <Text className='text-4xl font-bold' >Create your account</Text>
            <Text className='text-xl font-semibold text-[#4B5563] '>Track your finances with ease.</Text>
          </View>
          {/* Body */}
          <View className='gap-4 w-full items-center justify-center'>
            <View className='gap-2  w-full ' >
              <Text className='text-lg font-semibold' >Full name</Text>
              <Controller
                control={methods.control}
                name='name'
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className='bg-white h-14 border border-[#D1D5DB] text-lg font-medium rounded-lg px-4 py-2'
                    placeholder='e.g., Alex Doe'
                    onChangeText={(text) => methods.setValue('name', text)}
                  />
                )}
              />
              {
                methods.formState.errors.name && (
                  <Text className='text-red-500' >{methods.formState.errors.name.message}</Text>
                )
              }
            </View>
            <View className='gap-2 w-full' >
              <Text className='text-lg font-semibold'>Email</Text>
              <Controller
                control={methods.control}
                name='email'
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className='bg-white h-14 border border-[#D1D5DB] text-lg font-medium rounded-lg px-4 py-2'
                    placeholder='you@example.com'
                    onChangeText={(text) => methods.setValue('email', text)}
                  />
                )}
              />
              {
                methods.formState.errors.email && (
                  <Text className='text-red-500' >{methods.formState.errors.email.message}</Text>
                )
              }
            </View>
            <View className='gap-2 w-full' >
              <Text className='text-lg font-semibold'>Password</Text>
              <Controller
                control={methods.control}
                name='password'
                render={({ field }) => (
                  <TextInput
                    className='bg-white h-14 border border-[#D1D5DB] text-lg font-medium rounded-lg px-4 py-2'
                    secureTextEntry
                    placeholder='Create a strong password'
                    onChangeText={(text) => field.onChange(text)}
                  />
                )}
              />
              {
                methods.formState.errors.password && (
                  <Text className='text-red-500' >{methods.formState.errors.password.message}</Text>
                )
              }
            </View>
            <View className='gap-2 w-full' >
              <Text className='text-lg font-semibold'>Confirm password</Text>
              <Controller
                control={methods.control}
                name='confirmPassword'
                render={({ field }) => (
                  <TextInput
                    className='bg-white h-14 border border-[#D1D5DB] text-lg font-medium rounded-lg px-4 py-2'
                    secureTextEntry
                    placeholder='Re-enter your password'
                    onChangeText={(text) => field.onChange(text)}
                  />
                )}
              />
              {
                methods.formState.errors.confirmPassword && (
                  <Text className='text-red-500' >{methods.formState.errors.confirmPassword.message}</Text>
                )
              }
            </View>
            <Pressable onPress={methods.handleSubmit(onSubmit)} className='bg-[#13EC5B] h-14 w-full justify-center items-center rounded-xl mt-4'>
              <Text className='text-xl font-semibold' >
                Sign up
              </Text>
            </Pressable>
            <View className='flex flex-row gap-2 items-center justify-center' >
              <Text className='text-[#4B5563]' >Already have an account?</Text>
              <Link href={'/login'} >
                <Text className='underline text-[#0da33f] font-bold' >
                  Login
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

